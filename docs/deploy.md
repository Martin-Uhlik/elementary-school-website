# Deploying zsmp.cz on IIS

A step-by-step guide for putting the Next.js site live on the school server, and a checklist of what to test afterwards. The background (why a VM, how the admin IP check works) is in the root [README](../README.md); this file is the order of work.

```
internet → IIS on Windows Server 2019 (HTTPS :443, URL Rewrite + ARR)
         → Hyper-V Ubuntu VM 192.168.100.10:3000 → web container → db container (Postgres 18)
                                                   ↳ media/ on the VM disk (galerie, dokument, pozadi, videos)
```

The old static site keeps running until step 8, so steps 1 to 7 can be done during the day without visitors noticing.

---

## 1. Commit and push (on the Mac)

1. Check what is not committed:
   ```bash
   git status
   ```
   The untracked `src/web/public/informatika/programovani*/*.sb3` files with accents in their names are macOS duplicates (same names in decomposed Unicode) of files that are already committed. Do **not** add them; delete them or leave them alone.
2. Run the checks in `src/web`:
   ```bash
   cd src/web
   npm ci
   npm run lint && npm run format:check && npm run build
   ```
3. Merge `feat_transform_into_next` into `main`, tag the release and push both:
   ```bash
   git checkout main
   git merge --no-ff feat_transform_into_next
   git tag -a v2.0.0 -m "Next.js site"
   git push origin main --tags
   ```
   The tag is what you roll back to later (section 10). Use the next number for every later deploy (`v2.0.1`, ...).

`.env` and `media/` are gitignored, and that is correct: the server gets its own `.env`, and the mock galleries in your local `media/galerie/` (`20251205`, `20261107`) must not go to the server.

## 2. Hyper-V VM (once)

On the Windows server, in PowerShell as administrator. Skip what already exists.

1. Add the Hyper-V role (`Install-WindowsFeature -Name Hyper-V -IncludeManagementTools -Restart`).
2. Private switch with NAT, so only the server can reach the VM but the VM can reach the internet (Docker images, strava.cz):
   ```powershell
   New-VMSwitch -Name zsmp -SwitchType Internal
   New-NetIPAddress -IPAddress 192.168.100.1 -PrefixLength 24 -InterfaceAlias "vEthernet (zsmp)"
   New-NetNat -Name zsmp -InternalIPInterfaceAddressPrefix 192.168.100.0/24
   ```
3. New Generation 2 VM on the `zsmp` switch: 2 CPUs, 4 GB RAM, a disk with room for all photos plus growth (check the size of the old `galerie/` folder and double it). Install **Ubuntu Server 24.04 LTS** with OpenSSH.
4. Network in the VM (`/etc/netplan/*.yaml`): static `192.168.100.10/24`, gateway `192.168.100.1`, DNS e.g. `1.1.1.1`. Then `sudo netplan apply`.
5. In Hyper-V Manager → VM settings → _Automatic Start Action_ = **Always start**, _Automatic Stop Action_ = **Shut down**.
6. Check from the server: `ping 192.168.100.10` and `ssh <user>@192.168.100.10`. In the VM: `curl -I https://app.strava.cz` must answer (the canteen menu needs it).
7. Updates and time zone in the VM:
   ```bash
   sudo apt update && sudo apt full-upgrade -y
   sudo timedatectl set-timezone Europe/Prague
   sudo apt install -y unattended-upgrades
   ```

## 3. Docker and the code in the VM (once)

1. Install Docker Engine and the compose plugin from the official repo: https://docs.docker.com/engine/install/ubuntu/ (not the `docker.io` snap). Then:
   ```bash
   sudo usermod -aG docker $USER   # log out and back in
   docker compose version
   ```
2. Get the code. The remote is a GitHub repo, so either add a read-only **deploy key** (`ssh-keygen -t ed25519`, paste the `.pub` into GitHub → repo → Settings → Deploy keys) or use HTTPS with a fine-grained read-only token.
   ```bash
   sudo mkdir -p /srv/zsmp && sudo chown $USER: /srv/zsmp
   git clone git@github.com:Martin-Uhlik/elementary-school-website.git /srv/zsmp
   cd /srv/zsmp
   git checkout v2.0.0
   ```

All commands below run in `/srv/zsmp` in the VM.

## 4. `.env` in the VM

```bash
cp .env.example .env
chmod 600 .env
nano .env
```

| Variable | Production value | Notes |
| --- | --- | --- |
| `POSTGRES_DB`, `POSTGRES_USER` | `zsmp` | keep |
| `POSTGRES_PASSWORD` | long random, e.g. `openssl rand -base64 32 \| tr -d '/+='` | **must** be set before the first `up`; changing it later does not change it in the existing database |
| `WEB_BIND` | `192.168.100.10` | the VM's address on the switch, so IIS can reach it; nothing else can |
| `WEB_PORT` | `3000` | must match `deploy/iis/web.config` |
| `MEDIA_DIR` | `./media` (= `/srv/zsmp/media`) | or an absolute path on a bigger disk |
| `DB_PORT` | `5432` | bound to 127.0.0.1 in the VM only |
| `COOKIE_SECURE` | `true` | admin sign-in only over HTTPS |
| `ADMIN_ALLOWED_IPS` | school LAN range + VPN pool, e.g. `192.168.1.0/24,10.8.0.0/24` | **the example values are guesses**: find the real ranges first (see below). Empty = admin closed for everybody |
| `AUTH_INACTIVITY_MINUTES` | `30` | sign-out after inactivity |
| `AUTH_SESSION_MAX_MINUTES` | `480` | longest sign-in |
| `AUTH_LOCKOUT_ATTEMPTS` | `5` | wrong passwords before lock |
| `AUTH_LOCKOUT_MINUTES` | `10` | lock length |
| `LOG_RETENTION_DAYS` | `180` | sign-in/change logs with IPs are deleted after this (GDPR) |

**Finding the right `ADMIN_ALLOWED_IPS`:** the app sees the address IIS saw (`REMOTE_ADDR`). After IIS is set up (section 7), open the site once from a school PC and once over the VPN, then look at the newest IIS log in `C:\inetpub\logs\LogFiles\W3SVC<site id>\`; the `c-ip` column is the address to allow. If the school PCs reach the server through NAT or a public IP, that public IP is what you'll see, not `192.168.x.x`. Until you know, you can start with an empty value (admin closed) and fill it in.

Changing any of these later needs only `docker compose up -d` (no rebuild).

## 5. Media (photos, documents, videos)

They are not in git or in the image. Copy them from the **old site's IIS folder** to `/srv/zsmp/media` in the VM (WinSCP over SSH to 192.168.100.10, or `scp -r` from PowerShell):

| Old site folder | Into the VM | Served at |
| --- | --- | --- |
| `galerie\<folder>\` | `media/galerie/<folder>/` | `/galerie/<folder>` |
| `dokument\` | `media/dokument/` | `/dokument/...` |
| `data\videos\` (`zsmp.mp4`, `zsmp.cs.vtt`) | `media/videos/` | `/data/videos/...` |
| — | `media/pozadi/` (create empty) | uploads from _Pozadí_ |

```bash
mkdir -p media/galerie media/dokument media/pozadi media/videos
# ... copy ...
sudo chown -R 1000:1000 media     # the container runs as uid 1000 and the admin uploads here
```

The old `galerie.html` files and `thn*` previews inside the gallery folders can stay; the app ignores `galerie.html` and uses `thn*` as previews. Folder names must match the gallery ids in the database (they do, the seed came from the live site).

## 6. Build, migrate, seed, start

```bash
docker compose up -d --build
```

What happens:

1. `db` starts (Postgres 18, Czech collation) and waits until healthy.
2. `migrate` runs `npx prisma migrate deploy` (all migrations in `src/web/prisma/migrations/`, from `0_init` to `20261107161000_materska_skola_cover`), then `npx prisma db seed`, which loads `seed/content.sql` **only into an empty database** and creates the user **admin / zsmp** only when there are no users. Then it exits.
3. `web` starts when `migrate` finished successfully.

Check:

```bash
docker compose ps -a                 # db + web "Up", migrate "Exited (0)"
docker compose logs migrate          # "All migrations have been successfully applied", "Seeded the site content."
docker compose logs -f web           # no errors
curl -I http://192.168.100.10:3000/  # 200
```

If `migrate` failed, `web` does not start: read `docker compose logs migrate`, fix, and run `docker compose up -d` again.

Containers have `restart: unless-stopped`, so they come back after a VM reboot. Try it once: `sudo reboot`, then `docker compose ps`.

## 7. IIS (on the Windows server)

1. Install the modules (Web Platform Installer is gone, use the direct downloads):
   - URL Rewrite 2.1: https://www.iis.net/downloads/microsoft/url-rewrite
   - Application Request Routing 3.0: https://www.iis.net/downloads/microsoft/application-request-routing
2. **Enable the proxy:** IIS Manager → server node → _Application Request Routing Cache_ → _Server Proxy Settings_ → tick **Enable proxy**. In the same dialog: **Preserve host header** ticked, **Reverse rewrite host in response headers** unticked, time-out `120` s (photo uploads). Or in an admin prompt:
   ```bat
   %windir%\system32\inetsrv\appcmd.exe set config -section:system.webServer/proxy /enabled:"True" /preserveHostHeader:"True" /reverseRewriteHostInResponseHeaders:"False" /timeout:"00:02:00" /commit:apphost
   ```
3. **Allowed server variables:** server node (or the site) → _URL Rewrite_ → _View Server Variables..._ → _Add_ these three:
   - `HTTP_X_FORWARDED_FOR`
   - `HTTP_X_FORWARDED_PROTO`
   - `HTTP_X_FORWARDED_HOST`

   Without them every request fails with **500.50** (URL Rewrite cannot set the variable).
4. **Site folder:** create `C:\inetpub\zsmp-next\` and put only `deploy\iis\web.config` in it. Do not delete the old site folder: it is your rollback (section 10). Make sure the folder has no other `web.config` with conflicting rules (e.g. an old `default document` or `httpRedirect`).
5. **Do not switch the live site yet.** First test with a second, temporary binding, or edit the hosts file on a school PC. Simplest: in the existing zsmp.cz site nothing changes yet; create a new site `zsmp-next` on the folder above with an HTTP binding on port `8080` and test `http://<server>:8080` from the server itself. (The HTTPS rule in `web.config` will redirect to `https://<server>/`, so for this test temporarily disable the `HTTPS` rule in IIS Manager → site → URL Rewrite.)

## 8. HTTPS and switching over

1. **Certificate:** keep the one the old site uses (IIS Manager → server → _Server Certificates_). If it comes from win-acme (Let's Encrypt), its renewal task points at the old site: after the switch, run `wacs.exe` and re-target the renewal to the new site (or keep the binding on the old site name, see the next step).
2. **Switch:** the least moving parts is to change the **physical path** of the existing zsmp.cz site to `C:\inetpub\zsmp-next\` (site → _Basic Settings..._). Bindings (http :80, https :443 with SNI for `zsmp.cz` and `www.zsmp.cz`) and the certificate stay as they are. Remove the temporary `zsmp-next` site from step 7.5 and re-enable the HTTPS rule if you disabled it.
3. The `HTTPS` rule in `web.config` redirects every http request to https. HSTS is not set yet; add it in IIS (site → _HTTP Response Headers_ → `Strict-Transport-Security: max-age=31536000`) only after everything works on https for a few days.
4. Optional: if `www.zsmp.cz` should redirect to `zsmp.cz` (sitemap and canonical URLs use `https://zsmp.cz`), add a rule before the `Next.js` rule:
   ```xml
   <rule name="www" stopProcessing="true">
     <match url="(.*)" />
     <conditions><add input="{HTTP_HOST}" pattern="^www\.zsmp\.cz$" /></conditions>
     <action type="Redirect" url="https://zsmp.cz/{R:1}" redirectType="Permanent" />
   </rule>
   ```
5. **First admin sign-in, right away:** from an allowed address open `https://zsmp.cz/admin`, sign in as **admin / zsmp** and set a new password. Create personal accounts for the staff under _Uživatelé_ instead of sharing `admin`.

## 9. Backups

The database (Docker volume `db-data`) and `media/` live on the VM disk.

1. **Nightly database dump** in the VM. Create `/srv/zsmp/backup.sh`:
   ```bash
   #!/bin/sh
   set -e
   cd /srv/zsmp
   mkdir -p backups
   docker compose exec -T db pg_dump -U zsmp -Fc zsmp > backups/zsmp-$(date +%F).dump
   find backups -name 'zsmp-*.dump' -mtime +30 -delete
   ```
   `chmod +x backup.sh`, then `crontab -e`: `30 2 * * * /srv/zsmp/backup.sh`.
2. **Off the VM:** copy `backups/` and `media/` to the Windows server or the school NAS every night (e.g. a Windows scheduled task running `scp -r` or WinSCP scripting), so a broken VM disk does not take the backup with it.
3. **Whole VM:** Windows Server Backup of the Hyper-V VM, or a checkpoint before every deploy (`Checkpoint-VM -Name <vm> -SnapshotName "before v2.0.1"`; delete old checkpoints, they grow).
4. **Test a restore once** into a scratch database:
   ```bash
   docker compose exec -T db createdb -U zsmp restore_test
   docker compose exec -T db pg_restore -U zsmp -d restore_test < backups/zsmp-YYYY-MM-DD.dump
   docker compose exec -T db dropdb -U zsmp restore_test
   ```

## 10. Later deploys and rollback

**A normal update:**
```bash
cd /srv/zsmp
./backup.sh                       # dump first, migrations only go forward
git fetch --tags && git checkout v2.0.1
docker compose up -d --build      # migrate runs new migrations, then web restarts
docker compose ps -a && docker compose logs --tail=50 migrate web
docker image prune -f             # old images
```

**Rollback, code only** (the new version had no migration, or its migration is harmless for the old code):
```bash
git checkout v2.0.0 && docker compose up -d --build
```

**Rollback with the database** (the new migration broke something):
```bash
docker compose stop web
docker compose exec -T db dropdb -U zsmp --force zsmp
docker compose exec -T db createdb -U zsmp zsmp
docker compose exec -T db pg_restore -U zsmp -d zsmp < backups/zsmp-<before the deploy>.dump
git checkout v2.0.0 && docker compose up -d --build
```
Or restore the Hyper-V checkpoint taken before the deploy (loses everything entered since, including uploads).

**Back to the old static site** (first deploy only): in IIS set the zsmp.cz site's physical path back to the old folder. Nothing else changed, so it works at once.

**Locked out of the admin** (wrong `ADMIN_ALLOWED_IPS`): in the VM set `ADMIN_ALLOWED_IPS=*` in `.env`, `docker compose up -d`, sign in, find your address in _Logy_, put the right ranges back, `docker compose up -d`.

---

## Test checklist after the deploy

Run it from outside (a phone on mobile data), from the school network and over the VPN. Desktop browser plus a phone, light and dark theme where it matters.

### Server and containers
- [ ] `docker compose ps -a`: `db` and `web` Up, `migrate` Exited (0)
- [ ] `docker compose logs migrate` ends without errors; `docker compose exec db psql -U zsmp -c "select count(*) from _prisma_migrations"` = 11
- [ ] After `sudo reboot` of the VM (and once of the Windows server) the site comes back by itself

### HTTPS and IIS
- [ ] `http://zsmp.cz/kontakty` → 301 to `https://zsmp.cz/kontakty`
- [ ] Certificate valid in the browser for `zsmp.cz` (and `www.zsmp.cz` if bound)
- [ ] Redirect `Location` headers point to `https://zsmp.cz/...`, never `192.168.100.10:3000` (`curl -I https://zsmp.cz/index.html`)
- [ ] No IIS error pages anywhere (500.50 means a missing allowed server variable, 502.3 means the VM/container is down)

### Pages
- [ ] Every menu item opens: Hlavní strana, Úřední deska, Kontakty, Organizace (Průběh školního roku, Rada školy, SRPDŠ, Škola, Družina, Mateřská škola, Historie), Dokumenty, Galerie (`/foto-video`), Jídelna, Rodiče (Oznámení, formuláře; Odkazy), Pronájem haly, Školní poradenské služby, Informatika
- [ ] Home: carousel, logo and name bar, _Aktuální informace_ from the database
- [ ] Kontakty: search works, phone numbers correct
- [ ] Archives `/archiv/zakladni-skola`, `/archiv/materska-skola`, `/archiv/druzina`: cards with previews, newest first; Družina and MŠ tiles on `/foto-video` show their cover photos
- [ ] A few old and a few new galleries open, photos load, lightbox works, previews are small (thumbnails, not full photos)
- [ ] Gallery with a video link opens the video
- [ ] Several documents under `/dokument/...` download (PDF, DOCX, names with Czech letters and spaces)
- [ ] Tour video on the home page plays, captions (`zsmp.cs.vtt`) show
- [ ] Informatika: Myšák exercises open, `.sb3` and PDF downloads under `programovani1-3` work (names with diacritics)
- [ ] Theme switch (light/dark) remembers the choice; cookie notice shows once
- [ ] Phone: menu collapses, nothing wider than the screen

### Strava menu (`/jidelna`)
- [ ] The canteen menu from strava.cz shows this week (and next, if published), with allergens
- [ ] If it shows the fallback link instead, check from the VM: `curl -I https://app.strava.cz` (NAT/DNS of the VM), then `docker compose logs web`
- [ ] The link to app.strava.cz (canteen 2176) opens

### Backgrounds (`/pozadi`)
- [ ] `curl -I https://zsmp.cz/pozadi` → 307 to today's picture (on 7 Nov the default one; winter from 1 Dec), `Cache-Control: public, max-age=300`
- [ ] The picture shows behind the top of every page, in both themes
- [ ] In `/auth/pozadi` upload a test picture with today's date range → visible on the site within ~5 minutes → delete it again; the file lands in `media/pozadi/`

### 404 page
- [ ] `https://zsmp.cz/neexistuje` → status 404, the site's own 404 page with header and footer (not IIS's)
- [ ] `https://zsmp.cz/galerie/neexistuje` → the same 404

### Old .html redirects (301)
- [ ] `/index.html` → `/`
- [ ] `/kontakty.html` → `/kontakty`, `/jidelna.html` → `/jidelna`, `/archiv/druzina.html` → `/archiv/druzina`
- [ ] `/galerie/<an old folder>/galerie.html` → `/galerie/<folder>`
- [ ] `/informatika/mysak/cviceni/1.html` → `/informatika/mysak/skladanka`
- [ ] `/informatika/mysak/index.html` and `/informatika/mysak/cviceni/5.html` → `/informatika`
- [ ] Links from Google results to the old site land on the right page

### Sitemap and robots
- [ ] `https://zsmp.cz/robots.txt`: `Allow: /`, `Sitemap: https://zsmp.cz/sitemap.xml`, and **no** mention of `/admin` or `/auth`
- [ ] `https://zsmp.cz/sitemap.xml`: all menu pages, the three archives, Myšák pages and the galleries, all with `https://zsmp.cz` (no `192.168…`, no `www` if www redirects)
- [ ] Page source of a few pages: correct `<title>`, description, `og:image`, canonical, School JSON-LD
- [ ] Submit the sitemap in Google Search Console (and remove old `.html` URLs there over time; the 301s do the rest)

### Admin IP block (from outside, e.g. a phone on mobile data)
- [ ] `https://zsmp.cz/admin` → 404, identical to `/neexistuje`
- [ ] `https://zsmp.cz/auth` and `/auth/galerie` → 404
- [ ] Spoofing does nothing: `curl -s -o /dev/null -w "%{http_code}" -H "X-Forwarded-For: 192.168.1.10" https://zsmp.cz/admin` → 404
- [ ] A POST with a `Next-Action` header to `/` → empty 404

### Admin login (school network and VPN)
- [ ] From the school network: `/admin` shows the sign-in page
- [ ] Over the VPN: `/admin` shows the sign-in page. If it gives 404, the VPN is split-tunnel and `zsmp.cz` goes over the internet: make `zsmp.cz` resolve to the server's LAN address inside the VPN (internal DNS or hosts) or add the VPN client's exit address
- [ ] First sign-in as admin / zsmp forces a new password; after that the old one is refused
- [ ] _Logy_: the sign-in shows the real client IP (from the school range / VPN pool), not `192.168.100.1` or the server's own address
- [ ] The cookie `zsmp_session` is `Secure` and `HttpOnly` (browser dev tools)
- [ ] Wrong password `AUTH_LOCKOUT_ATTEMPTS` times → account locked; admin can unlock under _Uživatelé_
- [ ] Inactivity timer in the header counts down from `AUTH_INACTIVITY_MINUTES`
- [ ] Each section saves: add a test news item (shows on home), edit a person, upload a document (downloads from the site), create a gallery and drag in a few phone photos (rotated correctly, thumbnails made, appear in the archive), add a calendar event; then delete the test data
- [ ] A ~20 MB document upload works (IIS allows 100 MB, Next 50 MB)
- [ ] Uploaded files appear in `media/` on the VM owned by uid 1000

### Backups
- [ ] `./backup.sh` makes a non-empty dump; the cron job ran the next morning
- [ ] The copy off the VM arrived (dump + media)
- [ ] One test restore into `restore_test` worked

### A week later
- [ ] Google Search Console shows no new 404s from old URLs
- [ ] The VM disk has room (`df -h`), old dumps are pruned
- [ ] Then turn on HSTS (section 8.3)
