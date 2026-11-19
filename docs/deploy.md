# Deploying zsmp.cz on AlmaLinux

A step-by-step guide for putting the Next.js site live on the school's AlmaLinux VM, and a checklist of what to test afterwards. The background (how the admin IP check works) is in the root [README](../README.md); this file is the order of work.

```
internet → FortiGate (public IP, ports 80 + 443, no source NAT)
         → AlmaLinux VM 10.0.193.10 → caddy (HTTPS, Let's Encrypt) → web container → db container (Postgres 18)
                                                                       ↳ media/ on the VM disk (galerie, dokument, pozadi, videos)
school PCs + VPN → internal DNS: zsmp.cz = 10.0.193.10 (straight to the VM, so the admin sees their real address)
```

No IIS: Caddy in Docker is the web server and handles HTTPS by itself. The old site keeps running on the Windows server until step 8, so steps 1 to 7 can be done during the day without visitors noticing.

**Values used in this guide** (replace them everywhere if yours differ):

| What                 | Value in this guide             |
| -------------------- | ------------------------------- |
| The VM's address     | `10.0.193.10` (example)         |
| School network       | `10.0.193.0/24`                 |
| VPN address pool     | `10.212.134.0/24` (assumed /24) |
| Old site (IIS)       | Windows server `10.0.193.254`   |
| Synology for backups | `<synology ip>`                 |
| VM user              | `<user>` (the one you create)   |

---

## 1. Commit, tag and push (on the Mac)

1. Check what is not committed: `git status`. The untracked `src/web/public/informatika/programovani*/*.sb3` files with accents in their names are macOS duplicates of files that are already committed; do **not** add them.
2. Run the checks in `src/web`:
   ```bash
   cd src/web
   npm ci
   npm run lint && npm run format:check && npm run build
   ```
3. Commit the changed files, tag the release and push:
   ```bash
   git add .env.example README.md docker-compose.yml deploy docs src/web
   git commit -m "feat: deploy on AlmaLinux with Caddy"
   git tag -a v2.0.0 -m "Next.js site"
   git push origin main --tags
   ```
   The tag is what you roll back to later (section 10). Use the next number for every later deploy (`v2.0.1`, ...).

`.env` and `media/` are gitignored, and that is correct: the server gets its own `.env`, and the mock galleries in your local `media/galerie/` (`20251205`, `20261107`) must not go to the server.

## 2. The AlmaLinux VM (once)

**The VM:** AlmaLinux 9 or 10 (whichever Docker's [RHEL install page](https://docs.docker.com/engine/install/rhel/) lists), **2 vCPUs, 4 GB RAM, 64 GB disk** (the system ~5 GB, Docker images and build cache 3 to 5 GB, media 7 GB today and growing, dumps). On VMware: guest OS "AlmaLinux (64-bit)" (or "Red Hat Enterprise Linux 9" on older ESXi), adapter **VMXNET3**, on the **same network as the Windows server**, and set to start automatically with the host.

**Installation choices:** _Minimal Install_; network: static `10.0.193.10/24`, gateway and DNS the same as the Windows server (`ipconfig /all` on it shows them); a normal user with _Make this user administrator_ ticked; root account locked. The installer creates a swap partition and turns SELinux on (_Enforcing_); keep both. On VMware, `open-vm-tools` is installed automatically.

Before you pick the address, check it's free: from the Windows server, `ping 10.0.193.10` must get **no** answer.

**Then in the VM** (`ssh <user>@10.0.193.10`):

1. Check: `curl -I https://app.strava.cz` answers (internet, needed for the canteen menu), `getenforce` says `Enforcing`, `swapon --show` lists a swap.
2. Updates, time zone and tools:
   ```bash
   sudo dnf -y upgrade
   sudo timedatectl set-timezone Europe/Prague
   sudo dnf -y install git rsync nfs-utils cronie dnf-automatic
   sudo systemctl enable --now crond
   # install updates every night by themselves
   sudo sed -i 's/^apply_updates = no/apply_updates = yes/' /etc/dnf/automatic.conf
   sudo systemctl enable --now dnf-automatic.timer
   ```
3. **Firewall** (firewalld is on by default): the site on 80 and 443 for everyone, SSH only from the school network and the VPN.
   ```bash
   sudo firewall-cmd --permanent --add-service=http --add-service=https --add-port=443/udp
   sudo firewall-cmd --permanent --remove-service=cockpit
   sudo firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="10.0.193.0/24" service name="ssh" accept'
   sudo firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="10.212.134.0/24" service name="ssh" accept'
   sudo firewall-cmd --permanent --remove-service=ssh
   sudo firewall-cmd --reload
   sudo firewall-cmd --list-all
   ```
   Open a **second** SSH session before closing the first, to be sure you are not locked out. The site (3000) and the database (5432) are published only on 127.0.0.1 in `docker-compose.yml`, so nothing outside the VM can reach them, whatever the firewall says. That matters: the admin's IP check trusts the address Caddy passes on, so nobody may reach the site without Caddy.

## 3. Docker and the code in the VM (once)

1. Install Docker Engine from Docker's own repository (not Podman, which AlmaLinux offers by default):
   ```bash
   sudo dnf -y install dnf-plugins-core
   sudo dnf config-manager --add-repo https://download.docker.com/linux/rhel/docker-ce.repo
   sudo dnf -y install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
   sudo systemctl enable --now docker
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
vi .env        # or: sudo dnf -y install nano
```

| Variable                       | Production value                                           | Notes                                                                                                                                                                                                                       |
| ------------------------------ | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POSTGRES_DB`, `POSTGRES_USER` | `zsmp`                                                     | keep                                                                                                                                                                                                                        |
| `POSTGRES_PASSWORD`            | long random, e.g. `openssl rand -base64 32 \| tr -d '/+='` | **must** be set before the first `up`; changing it later does not change it in the existing database                                                                                                                        |
| `SITE_ADDRESS`                 | `"zsmp.cz, www.zsmp.cz"`                                   | the domains Caddy gets the certificate for; www redirects to zsmp.cz                                                                                                                                                        |
| `WEB_PORT`                     | `3000`                                                     | the site on 127.0.0.1 only, for `curl` and SSH tunnels                                                                                                                                                                      |
| `MEDIA_DIR`                    | `./media` (= `/srv/zsmp/media`)                            | or an absolute path on a bigger disk                                                                                                                                                                                        |
| `DB_PORT`                      | `5432`                                                     | bound to 127.0.0.1 in the VM only                                                                                                                                                                                           |
| `COOKIE_SECURE`                | `true`                                                     | admin sign-in only over HTTPS                                                                                                                                                                                               |
| `ADMIN_ALLOWED_IPS`            | `10.0.193.0/24,10.212.134.0/24`                            | school network + VPN pool (a VPN PC got 10.212.134.200, the FortiGate SSL-VPN default pool). `10.0.0.0/8` also works and covers both, but lets every 10.x network (e.g. a pupils' Wi-Fi) see the login page. Empty = nobody |
| `AUTH_INACTIVITY_MINUTES`      | `30`                                                       | sign-out after inactivity                                                                                                                                                                                                   |
| `AUTH_SESSION_MAX_MINUTES`     | `480`                                                      | longest sign-in                                                                                                                                                                                                             |
| `AUTH_LOCKOUT_ATTEMPTS`        | `5`                                                        | wrong passwords before lock                                                                                                                                                                                                 |
| `AUTH_LOCKOUT_MINUTES`         | `10`                                                       | lock length                                                                                                                                                                                                                 |
| `LOG_RETENTION_DAYS`           | `180`                                                      | sign-in/change logs with IPs are deleted after this (GDPR)                                                                                                                                                                  |

Changing any of these later needs only `docker compose up -d` (no rebuild).

## 5. Media (photos, documents, videos)

They are not in git or in the image. Copy them from the **old site's folder on the Windows server** to `/srv/zsmp/media` in the VM, with WinSCP (SFTP to 10.0.193.10) or from PowerShell on the Windows server (`scp -r "<old site folder>\galerie" <user>@10.0.193.10:/srv/zsmp/media/`):

| Old site folder                            | Into the VM                    | Served at             |
| ------------------------------------------ | ------------------------------ | --------------------- |
| `galerie\<folder>\`                        | `media/galerie/<folder>/`      | `/galerie/<folder>`   |
| `dokument\`                                | `media/dokument/`              | `/dokument/...`       |
| `data\videos\` (`zsmp.mp4`, `zsmp.cs.vtt`) | `media/videos/`                | `/data/videos/...`    |
| —                                          | `media/pozadi/` (create empty) | uploads from _Pozadí_ |

```bash
mkdir -p media/galerie media/dokument media/pozadi media/videos
# ... copy ...
sudo chown -R 1000:1000 media     # the container runs as uid 1000 and the admin uploads here
```

SELinux needs nothing extra: the `:Z` on the media mounts in `docker-compose.yml` labels the folder for the container when it starts.

The old `galerie.html` files and `thn*` previews inside the gallery folders can stay: the app skips them as photos (`thn*` are used only for the archive card previews). Folder names must match the gallery ids in the database (they do, the seed came from the live site).

## 6. Build, migrate, seed, start (without Caddy yet)

Start everything **except** Caddy: until the FortiGate forwards to the VM (step 8), Let's Encrypt can't reach it, and Caddy would keep retrying for longer and longer.

```bash
docker compose up -d --build web
```

What happens:

1. `db` starts (Postgres 18, Czech collation) and waits until healthy.
2. `migrate` runs `npx prisma migrate deploy` (all migrations in `src/web/prisma/migrations/`), then `npx prisma db seed`, which loads `seed/content.sql` **only into an empty database** and creates the user **admin / zsmp** only when there are no users. Then it exits.
3. `web` starts when `migrate` finished successfully.

Check:

```bash
docker compose ps -a                   # db + web "Up", migrate "Exited (0)"
docker compose logs migrate            # "All migrations have been successfully applied", "Seeded the site content."
docker compose logs -f web             # no errors
curl -I http://127.0.0.1:3000/         # 200
```

If `migrate` failed, `web` does not start: read `docker compose logs migrate`, fix, and run the command again.

**Look at it before going live:** from your PC, open an SSH tunnel, `ssh -L 8080:127.0.0.1:3000 <user>@10.0.193.10`, and browse http://localhost:8080. The public pages, galleries, documents and the canteen menu should all work. The admin answers 404 here (no address to check); it gets tested after step 8.

## 7. FortiGate and internal DNS (prepare)

1. **Find the current port forward.** FortiGate → _Policy & Objects_ → _Virtual IPs_: the VIP(s) that map the public address, ports 80 and 443, to the Windows server `10.0.193.254`, and in _Firewall Policy_ the policy that uses them. Screenshot both: this is your rollback.
2. **Check that policy has NAT off.** With NAT on, every visitor would reach the VM with the FortiGate's address: the sign-in logs would be useless, and if that address is in `ADMIN_ALLOWED_IPS`, the whole internet would see the admin login. VIP policies normally have NAT off.
3. **Port 80 must be forwarded too**, not only 443: Caddy uses it for Let's Encrypt and to redirect http to https.
4. **Internal DNS:** school PCs and the VPN should reach the VM directly, not through the public address. In DNS Manager on the domain controller, if there is a `zsmp.cz` zone, you will point its `zsmp.cz` (`(same as parent folder)`) and `www` A records to `10.0.193.10` in step 8.4. If there is no `zsmp.cz` zone, don't create one: it would hide the domain's other records (e.g. mail) from the school. Put a hosts entry `10.0.193.10 zsmp.cz www.zsmp.cz` on the admins' PCs instead.
5. **Public DNS:** nothing changes. Only if the domain has a CAA record must it allow `letsencrypt.org`; check with `nslookup -type=CAA zsmp.cz` (no record = fine).

## 8. Switching over

Do it outside school hours; the site is down for a minute or two.

1. **FortiGate:** in the VIP(s) from step 7, change the mapped address from `10.0.193.254` to **`10.0.193.10`**. Save.
2. **Start Caddy** in the VM and watch it get the certificate:
   ```bash
   docker compose up -d
   docker compose logs -f caddy      # wait for "certificate obtained successfully" for zsmp.cz and www.zsmp.cz
   ```
   If it says the challenge failed, ports 80/443 from the internet don't reach the VM yet: check the VIP and policy, then `docker compose restart caddy`.
3. Open https://zsmp.cz on a phone on mobile data (outside the school network).
4. **Internal DNS:** now point `zsmp.cz` and `www.zsmp.cz` to `10.0.193.10` (step 7.4). PCs pick it up within minutes (`ipconfig /flushdns` speeds it up).
5. **First admin sign-in, right away:** from the school network or the VPN open `https://zsmp.cz/admin`, sign in as **admin / zsmp** and set a new password. Check in _Logy_ that your sign-in shows your real address (10.0.193.x or 10.212.134.x). Create personal accounts for the staff under _Uživatelé_ instead of sharing `admin`.
6. Leave the old site on IIS as it is for two weeks: it is the rollback (section 10). After that, remove the zsmp.cz site from IIS.
7. HSTS (browsers then refuse plain http for a year): only after everything works on https for a few weeks, add `header Strict-Transport-Security "max-age=31536000"` inside the site block of `deploy/caddy/Caddyfile`, commit and deploy.

## 9. Backups

The database (Docker volume `db-data`) and `media/` live on the VM disk. The certificates (`caddy-data`) do too, but Caddy simply gets new ones if they are lost.

1. **Synology share (once).** On the Synology (DSM):
   - _Control Panel_ → _Shared Folder_ → _Create_ `zsmp-backup` (on a Btrfs volume, so it can keep snapshots).
   - _Control Panel_ → _File Services_ → _NFS_ → tick **Enable NFS service** (NFSv4.1 as maximum).
   - Edit the `zsmp-backup` folder → _NFS Permissions_ → _Create_: hostname **10.0.193.10** (only the VM), privilege **Read/Write**, squash **Map all users to admin**, security `sys`. Note the _Mount path_ shown at the bottom (e.g. `/volume1/zsmp-backup`).
   - Install **Snapshot Replication** → _Snapshots_ → `zsmp-backup` → _Settings_ → schedule **daily at 04:00**, keep **30**. The copy below mirrors the VM (deleted photos disappear from it too), so these snapshots are what lets you get back a file deleted or broken weeks ago, even if something on the VM gets encrypted.
2. **Mount it in the VM (once):**
   ```bash
   sudo mkdir -p /mnt/nas
   echo '<synology ip>:/volume1/zsmp-backup /mnt/nas nfs4 defaults,_netdev,nofail 0 0' | sudo tee -a /etc/fstab
   sudo systemctl daemon-reload && sudo mount -a && df -h /mnt/nas
   ```
3. **Nightly dump and copy.** Create `/srv/zsmp/backup.sh`:
   ```bash
   #!/bin/sh
   set -e
   cd /srv/zsmp
   mkdir -p backups
   docker compose exec -T db pg_dump -U zsmp -Fc zsmp > backups/zsmp-$(date +%F).dump
   find backups -name 'zsmp-*.dump' -mtime +30 -delete
   # copy to the Synology only when it is really mounted (otherwise it would fill the VM disk)
   if mountpoint -q /mnt/nas; then
     rsync -a backups/ /mnt/nas/dumps/
     rsync -a --delete media/ /mnt/nas/media/
     cp .env /mnt/nas/env-backup
     date > /mnt/nas/LAST_BACKUP
   else
     echo "Synology not mounted, nothing copied" >&2
     exit 1
   fi
   ```
   `chmod +x backup.sh`, then `sudo crontab -e`: `30 2 * * * /srv/zsmp/backup.sh >> /var/log/zsmp-backup.log 2>&1`. The dumps on the Synology are kept for good (the VM keeps 30 days); delete old ones there now and then. `.env` is copied because it holds the database password, so keep the share closed to everyone but admins.
4. **Whole VM:** a hypervisor snapshot **before every deploy** (on VMware: the VM → _Actions_ → _Snapshots_ → _Take snapshot_; delete it a few days later, snapshots grow). A snapshot is not a backup: the nightly copy on the Synology is what survives a broken disk.
5. **Test a restore once** into a scratch database:
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
docker compose up -d --build      # migrate runs new migrations, then web restarts; caddy keeps running
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

Or revert to the snapshot taken before the deploy (loses everything entered since, including uploads).

**Back to the old site** (first two weeks only): on the FortiGate, set the VIP's mapped address back to `10.0.193.254`, and the internal DNS records (or hosts entries) back to what they were. IIS was never touched, so it works at once.

**Locked out of the admin** (wrong `ADMIN_ALLOWED_IPS`): in the VM set `ADMIN_ALLOWED_IPS=*` in `.env`, `docker compose up -d`, sign in, find your address in _Logy_, put the right ranges back, `docker compose up -d`.

---

## Test checklist after the deploy

Run it from outside (a phone on mobile data), from the school network and over the VPN. Desktop browser plus a phone, light and dark theme where it matters.

### Server and containers

- [ ] `docker compose ps -a`: `caddy`, `db` and `web` Up, `migrate` Exited (0)
- [ ] `docker compose logs migrate` ends without errors; `docker compose exec db psql -U zsmp -c "select count(*) from _prisma_migrations"` = the number of folders in `src/web/prisma/migrations/`
- [ ] After `sudo reboot` of the VM the site comes back by itself, and the Synology is mounted again (`df -h /mnt/nas`)
- [ ] `getenforce` still says `Enforcing`, and uploads in the admin work (an SELinux problem would show up here)

### HTTPS and the firewall

- [ ] `http://zsmp.cz/kontakty` → 308 to `https://zsmp.cz/kontakty`
- [ ] `https://www.zsmp.cz/kontakty` → 301 to `https://zsmp.cz/kontakty`
- [ ] Certificate valid in the browser (issued by Let's Encrypt) for `zsmp.cz` and `www.zsmp.cz`
- [ ] Redirect `Location` headers point to `https://zsmp.cz/...`, never `127.0.0.1` or `web:3000` (`curl -I https://zsmp.cz/index.html`)
- [ ] From another PC on the school network, ports `3000` and `5432` on 10.0.193.10 do **not** answer; SSH to the VM works from school and the VPN only
- [ ] The old Windows server no longer gets requests for zsmp.cz (its IIS log stays quiet)

### Pages

- [ ] Every menu item opens: Hlavní strana, Úřední deska, Kontakty, Organizace (Průběh školního roku, Rada školy, SRPDŠ, Škola, Družina, Mateřská škola, Historie), Dokumenty, Galerie (`/foto-video`), Jídelna, Rodiče (Oznámení, formuláře; Odkazy), Pronájem haly, Školní poradenské služby, Informatika
- [ ] Home: carousel, logo and name bar, _Aktuální informace_ from the database
- [ ] Kontakty: search works, phone numbers correct
- [ ] Archives `/archiv/zakladni-skola`, `/archiv/materska-skola`, `/archiv/druzina`: cards with previews, newest first; Družina and MŠ tiles on `/foto-video` show their cover photos
- [ ] A few old and a few new galleries open, photos load, lightbox works; galleries uploaded in the admin use small previews from `thumbnails/`
- [ ] Gallery with a video link opens the video
- [ ] Several documents under `/dokument/...` download (PDF, DOCX, names with Czech letters and spaces)
- [ ] Tour video on the home page plays, captions (`zsmp.cs.vtt`) show
- [ ] Informatika: Myšák exercises open, `.sb3` and PDF downloads under `programovani1-3` work (names with diacritics)
- [ ] Theme switch (light/dark) remembers the choice; cookie notice shows once
- [ ] Phone: menu collapses, nothing wider than the screen

### Strava menu (`/jidelna`)

- [ ] The canteen menu from strava.cz shows this week (and next, if published), with allergens
- [ ] If it shows the fallback link instead, check from the VM: `curl -I https://app.strava.cz` (the VM's DNS and internet), then `docker compose logs web`
- [ ] The link to app.strava.cz (canteen 2176) opens

### Backgrounds (`/pozadi`)

- [ ] `curl -I https://zsmp.cz/pozadi` → 307 to today's picture, `Cache-Control: public, max-age=300`
- [ ] The picture shows behind the top of every page, in both themes
- [ ] In `/auth/pozadi` upload a test picture with today's date range → visible on the site within ~5 minutes → delete it again; the file lands in `media/pozadi/`

### 404 page

- [ ] `https://zsmp.cz/neexistuje` → status 404, the site's own 404 page with header and footer
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
- [ ] `https://zsmp.cz/sitemap.xml`: all menu pages, the three archives, Myšák pages and the galleries, all with `https://zsmp.cz` (no `www`, no IP addresses)
- [ ] Page source of a few pages: correct `<title>`, description, `og:image`, canonical, School JSON-LD
- [ ] Submit the sitemap in Google Search Console (the 301s take care of the old `.html` URLs)

### Admin IP block (from outside, e.g. a phone on mobile data)

- [ ] `https://zsmp.cz/admin` → 404, identical to `/neexistuje`
- [ ] `https://zsmp.cz/auth` and `/auth/galerie` → 404
- [ ] Spoofing does nothing: `curl -s -o /dev/null -w "%{http_code}" -H "X-Forwarded-For: 10.0.193.20" https://zsmp.cz/admin` → 404
- [ ] A POST with a `Next-Action` header to `/` → empty 404

### Admin login (school network and VPN)

- [ ] From the school network: `/admin` shows the sign-in page
- [ ] Over the VPN: `/admin` shows the sign-in page. If it gives 404, the VPN sends zsmp.cz over the internet: the VPN must use the school DNS (or a hosts entry `10.0.193.10 zsmp.cz`)
- [ ] First sign-in as admin / zsmp forces a new password; after that the old one is refused
- [ ] _Logy_: the sign-in shows the real client IP (10.0.193.x from school, 10.212.134.x over the VPN). Not the FortiGate's address (→ NAT is on in the VIP policy, or the PC still resolves zsmp.cz to the public IP) and not `172.x` (→ Docker's userland proxy: add `{ "userland-proxy": false }` to `/etc/docker/daemon.json`, then `sudo systemctl restart docker`)
- [ ] The cookie `zsmp_session` is `Secure` and `HttpOnly` (browser dev tools)
- [ ] Wrong password `AUTH_LOCKOUT_ATTEMPTS` times → account locked; admin can unlock under _Uživatelé_
- [ ] Inactivity timer in the header counts down from `AUTH_INACTIVITY_MINUTES`
- [ ] Each section saves: add a test news item (shows on home), edit a person, upload a document (downloads from the site), create a gallery and drag in a few phone photos (rotated correctly, thumbnails made, appear in the archive), add a calendar event; then delete the test data
- [ ] A ~20 MB document upload works (the site allows 50 MB)
- [ ] Uploaded files appear in `media/` on the VM owned by uid 1000

### Backups

- [ ] `./backup.sh` makes a non-empty dump; the cron job ran the next morning (`/var/log/zsmp-backup.log`)
- [ ] `/mnt/nas/LAST_BACKUP` has last night's date, `/mnt/nas/dumps` and `/mnt/nas/media` are filled, and a Synology snapshot of `zsmp-backup` exists
- [ ] One test restore into `restore_test` worked

### A few weeks later

- [ ] Google Search Console shows no new 404s from old URLs
- [ ] The VM disk has room (`df -h`), old dumps are pruned, `dnf-automatic` ran (`journalctl -u dnf-automatic`)
- [ ] The certificate renewed by itself (Caddy renews about 30 days before it expires; `docker compose logs caddy | grep -i renew`)
- [ ] Remove the old zsmp.cz site from IIS, then turn on HSTS (section 8.7)
