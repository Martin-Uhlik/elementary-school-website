# Deploying zsmp.cz on AlmaLinux

A step-by-step guide for putting the Next.js site live on the school's AlmaLinux VM, and a checklist of what to test afterwards. The background (how the admin IP check works) is in the root [README](../README.md); this file is the order of work.

```
push to main → GitHub Actions builds the web + migrate images → Docker Hub
             → the VM pulls them by itself every 10 minutes (zsmp-update.timer) and restarts what changed

internet → FortiGate (public IP, ports 80 + 443, no source NAT)
         → AlmaLinux VM 10.0.193.10 → caddy (HTTPS, Let's Encrypt) → web container → db container (Postgres 18)
                                                                       ↳ media/ on the VM disk (galerie, dokument, pozadi, videos)
school PCs + VPN → internal DNS: zsmp.cz = 10.0.193.10 (straight to the VM, so the admin sees their real address)
```

No IIS: Caddy in Docker is the web server and handles HTTPS by itself. The old site keeps running on the Windows server until step 9, so steps 1 to 8 can be done during the day without visitors noticing.

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

## 1. Docker Hub and GitHub Actions (once)

> **Not set up yet.** The workflow is in the repo, but it is skipped (grey in the _Actions_ tab, not a failure) until the GitHub variable `DOCKERHUB_USERNAME` exists. Steps 1 to 3 below turn it on, nothing in the code has to change. Until then, build on the server with `docker compose up -d --build`.

Every push to `main` that changes `src/` makes GitHub Actions (`.github/workflows/docker.yml`) build two images and push them to Docker Hub: `<namespace>/zsmp-web` (the site) and `<namespace>/zsmp-migrate` (the migrations), each tagged `latest` and `sha-<first 7 characters of the commit>`. The server never builds anything; it only downloads them (section 11).

1. **Docker Hub account** (free) on hub.docker.com, e.g. with the school's admin e-mail. Its username is the **namespace** (`DOCKERHUB_NAMESPACE` in `.env`, `DOCKERHUB_USERNAME` in GitHub). The two repositories get created by the first push, **public**: the GitHub repo is public too, and the images hold nothing secret (`.env` and `media/` are not in them). The free plan allows only one private repository.
2. **Two access tokens** on Docker Hub → avatar → _Account settings_ → _Personal access tokens_ → _Generate new token_:
   - `github-actions`, access **Read & Write**: for GitHub, to push.
   - `zsmp-vm`, access **Read-only**: for the VM (section 4), so its pulls count as signed in. Without it, the downloads every 10 minutes share the anonymous Docker Hub limit with every PC behind the school's public address.

   Each token is shown only once; copy it straight to where it goes.

3. **GitHub** → the repo → _Settings_ → _Secrets and variables_ → _Actions_:
   - tab _Variables_ → _New repository variable_: `DOCKERHUB_USERNAME` = the Docker Hub username;
   - tab _Secrets_ → _New repository secret_: `DOCKERHUB_TOKEN` = the `github-actions` token.
4. Push (section 2) and watch the repo's _Actions_ tab: the _Docker images_ run takes about 5 minutes the first time, later 1 to 3. The run's summary lists the tags. On Docker Hub, both repositories now have `latest` and `sha-...`.

The workflow can also be started by hand: _Actions_ → _Docker images_ → _Run workflow_ (e.g. after changing the token).

## 2. Commit and push (on the Mac)

1. Check what is not committed: `git status`. The untracked `src/web/public/informatika/programovani*/*.sb3` files with accents in their names are macOS duplicates of files that are already committed; do **not** add them.
2. Run the checks in `src` (the npm workspace with `web` and `db`):
   ```bash
   cd src
   npm ci
   npm run lint && npm run format:check -w web && npm run build
   ```
3. Commit the changed files and push:
   ```bash
   git add .env.example .gitignore .github README.md docker-compose.yml deploy docs src
   git commit -m "feat: deploy on AlmaLinux with Caddy"
   git push origin main
   ```
   GitHub Actions now builds the images (section 1.4). Everything pushed to `main` goes live by itself once the server is set up (section 11), so `main` must always be deployable: try bigger changes on another branch or with the dev setup first.

`.env` and `media/` are gitignored, and that is correct: the server gets its own `.env`, and the mock galleries in your local `media/galerie/` (`20251205`, `20261107`) must not go to the server.

## 3. The AlmaLinux VM (once)

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

## 4. Docker and the code in the VM (once)

1. Install Docker Engine from Docker's own repository (not Podman, which AlmaLinux offers by default):
   ```bash
   sudo dnf -y install dnf-plugins-core
   sudo dnf config-manager --add-repo https://download.docker.com/linux/rhel/docker-ce.repo
   sudo dnf -y install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
   sudo systemctl enable --now docker
   sudo usermod -aG docker $USER   # log out and back in
   docker compose version
   ```
2. Get the code. The VM needs only `docker-compose.yml`, `deploy/` and `.env` (the images come from Docker Hub), but a clone of the repo is the easiest way to keep them current: the automatic update runs `git pull` (section 11). The repo is public, so plain HTTPS needs no key; stay on `main`.
   ```bash
   sudo mkdir -p /srv/zsmp && sudo chown $USER: /srv/zsmp
   git clone https://github.com/Martin-Uhlik/elementary-school-website.git /srv/zsmp
   cd /srv/zsmp
   ```
   If the repo becomes private one day: add a read-only **deploy key** (`ssh-keygen -t ed25519`, paste the `.pub` into GitHub → repo → _Settings_ → _Deploy keys_) and `git remote set-url origin git@github.com:Martin-Uhlik/elementary-school-website.git`.
3. Sign in to Docker Hub with the **read-only** `zsmp-vm` token from section 1.2 (username = the Docker Hub username, password = the token). It is saved in `~/.docker/config.json` of this user, which is also the user the automatic update runs as:
   ```bash
   docker login -u <docker hub username>
   ```

All commands below run in `/srv/zsmp` in the VM.

## 5. `.env` in the VM

```bash
cp .env.example .env
chmod 600 .env
vi .env        # or: sudo dnf -y install nano
```

| Variable                       | Production value                                           | Notes                                                                                                                                                                                                                       |
| ------------------------------ | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POSTGRES_DB`, `POSTGRES_USER` | `zsmp`                                                     | keep                                                                                                                                                                                                                        |
| `POSTGRES_PASSWORD`            | long random, e.g. `openssl rand -base64 32 \| tr -d '/+='` | **must** be set before the first `up`; changing it later does not change it in the existing database                                                                                                                        |
| `DOCKERHUB_NAMESPACE`          | the Docker Hub username (section 1.1)                      | where the `zsmp-web` and `zsmp-migrate` images come from                                                                                                                                                                    |
| `IMAGE_TAG`                    | `latest`                                                   | `latest` = the newest build of `main`; `sha-<commit>` = stay on one build (rollback, section 11)                                                                                                                            |
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

## 6. Media (photos, documents, videos)

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

## 7. Download, migrate, seed, start (without Caddy yet)

Start everything **except** Caddy: until the FortiGate forwards to the VM (step 9), Let's Encrypt can't reach it, and Caddy would keep retrying for longer and longer.

```bash
docker compose up -d web
```

What happens:

1. Docker downloads `postgres:18-alpine` and the `zsmp-web` and `zsmp-migrate` images from Docker Hub (`DOCKERHUB_NAMESPACE`, tag `IMAGE_TAG`). If it says _pull access denied_, the namespace in `.env` is wrong or the GitHub Actions run (section 1.4) has not finished yet.
2. `db` starts (Postgres 18, Czech collation) and waits until healthy.
3. `migrate` (a small image with only `src/db`) runs `migrate.ts` (the migrations in `src/db/migrations/` the database does not have yet), then `seed.ts`, which loads `seed/content.sql` **only into an empty database** and creates the user **admin / zsmp** only when there are no users. Then it exits.
4. `web` starts when `migrate` finished successfully.

Check:

```bash
docker compose ps -a                   # db + web "Up", migrate "Exited (0)"
docker compose logs migrate            # "All migrations have been successfully applied", "Seeded the site content."
docker compose logs -f web             # no errors
curl -I http://127.0.0.1:3000/         # 200
```

If `migrate` failed, `web` does not start: read `docker compose logs migrate`, fix, and run the command again.

`docker compose up -d --build web` would build the images here from `src/` instead (a few minutes, needs the 4 GB RAM); keep that for when Docker Hub or GitHub is down.

**Look at it before going live:** from your PC, open an SSH tunnel, `ssh -L 8080:127.0.0.1:3000 <user>@10.0.193.10`, and browse http://localhost:8080. The public pages, galleries, documents and the canteen menu should all work. The admin answers 404 here (no address to check); it gets tested after step 9.

## 8. FortiGate and internal DNS (prepare)

1. **Find the current port forward.** FortiGate → _Policy & Objects_ → _Virtual IPs_: the VIP(s) that map the public address, ports 80 and 443, to the Windows server `10.0.193.254`, and in _Firewall Policy_ the policy that uses them. Screenshot both: this is your rollback.
2. **Check that policy has NAT off.** With NAT on, every visitor would reach the VM with the FortiGate's address: the sign-in logs would be useless, and if that address is in `ADMIN_ALLOWED_IPS`, the whole internet would see the admin login. VIP policies normally have NAT off.
3. **Port 80 must be forwarded too**, not only 443: Caddy uses it for Let's Encrypt and to redirect http to https.
4. **Internal DNS:** school PCs and the VPN should reach the VM directly, not through the public address. In DNS Manager on the domain controller, if there is a `zsmp.cz` zone, you will point its `zsmp.cz` (`(same as parent folder)`) and `www` A records to `10.0.193.10` in step 9.4. If there is no `zsmp.cz` zone, don't create one: it would hide the domain's other records (e.g. mail) from the school. Put a hosts entry `10.0.193.10 zsmp.cz www.zsmp.cz` on the admins' PCs instead.
5. **Public DNS:** nothing changes. Only if the domain has a CAA record must it allow `letsencrypt.org`; check with `nslookup -type=CAA zsmp.cz` (no record = fine).

## 9. Switching over

Do it outside school hours; the site is down for a minute or two.

1. **FortiGate:** in the VIP(s) from step 8, change the mapped address from `10.0.193.254` to **`10.0.193.10`**. Save.
2. **Start Caddy** in the VM and watch it get the certificate:
   ```bash
   docker compose up -d
   docker compose logs -f caddy      # wait for "certificate obtained successfully" for zsmp.cz and www.zsmp.cz
   ```
   If it says the challenge failed, ports 80/443 from the internet don't reach the VM yet: check the VIP and policy, then `docker compose restart caddy`.
3. Open https://zsmp.cz on a phone on mobile data (outside the school network).
4. **Internal DNS:** now point `zsmp.cz` and `www.zsmp.cz` to `10.0.193.10` (step 8.4). PCs pick it up within minutes (`ipconfig /flushdns` speeds it up).
5. **First admin sign-in, right away:** from the school network or the VPN open `https://zsmp.cz/admin`, sign in as **admin / zsmp** and set a new password. Check in _Logy_ that your sign-in shows your real address (10.0.193.x or 10.212.134.x). Create personal accounts for the staff under _Uživatelé_ instead of sharing `admin`.
6. Leave the old site on IIS as it is for two weeks: it is the rollback (section 11). After that, remove the zsmp.cz site from IIS.
7. HSTS (browsers then refuse plain http for a year): only after everything works on https for a few weeks, add `header Strict-Transport-Security "max-age=31536000"` inside the site block of `deploy/caddy/Caddyfile`, commit and deploy.

## 10. Backups

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
4. **Whole VM:** a hypervisor snapshot **before a change with a database migration** (on VMware: the VM → _Actions_ → _Snapshots_ → _Take snapshot_; delete it a few days later, snapshots grow). A snapshot is not a backup: the nightly copy on the Synology is what survives a broken disk.
5. **Test a restore once** into a scratch database:
   ```bash
   docker compose exec -T db createdb -U zsmp restore_test
   docker compose exec -T db pg_restore -U zsmp -d restore_test < backups/zsmp-YYYY-MM-DD.dump
   docker compose exec -T db dropdb -U zsmp restore_test
   ```

## 11. Automatic updates and rollback

After the switch-over (section 9), the VM deploys `main` by itself: a systemd timer runs `deploy/update/zsmp-update.sh` every 10 minutes. It

1. runs `git pull` (so changes to `docker-compose.yml`, the Caddyfile and the script itself arrive too),
2. downloads the `zsmp-web` and `zsmp-migrate` images if Docker Hub has newer ones (`docker compose pull web migrate`),
3. and only if that brought something it has not deployed yet: dumps the database to `backups/zsmp-<date>-before-update.dump`, runs `docker compose up -d` (`migrate` applies the new migrations first, then `web` is replaced; a minute of downtime at most), restarts Caddy if its config changed, and deletes old images.

When nothing is new it does nothing and writes nothing. If something fails (e.g. a migration), the old `web` keeps running and the next run tries again. So a change goes live **about 5 to 15 minutes after the push**: the GitHub Actions build plus the wait for the timer.

**Install it (once, after section 9):**

```bash
cd /srv/zsmp
sudo cp deploy/update/zsmp-update.service deploy/update/zsmp-update.timer /etc/systemd/system/
sudo sed -i "s/^User=.*/User=$USER/" /etc/systemd/system/zsmp-update.service
sudo systemctl daemon-reload
sudo systemctl start zsmp-update.service      # one run now, to see that it works (ends after a few seconds)
journalctl -u zsmp-update -n 30                # the first run always deploys once: "Updating to ...", then the container list
sudo systemctl enable --now zsmp-update.timer
systemctl list-timers zsmp-update.timer        # NEXT = in under 10 minutes
```

It runs as your VM user (in the `docker` group, owns `/srv/zsmp`, signed in to Docker Hub in section 4.3). The unit files are copies: if they change in the repo, copy them again and `sudo systemctl daemon-reload`.

**Watching it:**

```bash
journalctl -u zsmp-update --since today        # what it deployed (nothing = nothing was new)
systemctl status zsmp-update.service           # "failed" = the last run failed, the journal says why
sh deploy/update/zsmp-update.sh                # run it by hand right now instead of waiting
```

**A normal change:** commit and push to `main` on the Mac, then wait. The _Actions_ tab on GitHub shows the build; a red run means nothing new reaches the server (fix and push again). For a change with a database migration, take a VM snapshot first (section 10.4); the update makes its own dump anyway.

**Pause the updates** (e.g. while trying something on the server): `sudo systemctl stop zsmp-update.timer`; back on: `sudo systemctl start zsmp-update.timer`. `stop` lasts until the next reboot, `disable --now` for good.

**Rollback, the normal way:** undo the change on the Mac and push, the server follows like with any change:

```bash
git revert <bad commit> && git push
```

**Rollback, right now** (code only; the bad build had no migration, or its migration is harmless for the old code): every build stays on Docker Hub as `sha-<commit>` (the _Tags_ tab of each repository, or the summary of each GitHub Actions run). Pin the last good one:

```bash
cd /srv/zsmp
sudo systemctl stop zsmp-update.timer          # so nothing changes under you meanwhile
# in .env: IMAGE_TAG=sha-<good commit>
docker compose up -d
```

When the fix is pushed and built: `IMAGE_TAG=latest` in `.env`, `sudo systemctl start zsmp-update.timer`.

**Rollback with the database** (the new migration broke something): stop the timer and pin the good build as above, then restore the dump the update made just before:

```bash
docker compose stop web
docker compose exec -T db dropdb -U zsmp --force zsmp
docker compose exec -T db createdb -U zsmp zsmp
docker compose exec -T db pg_restore -U zsmp -d zsmp < backups/zsmp-<date>-before-update.dump
docker compose up -d
```

Or revert to the snapshot taken before the deploy (loses everything entered since, including uploads).

**Docker Hub or GitHub down:** the site keeps running from the images it has. To deploy anyway, build on the VM: `git pull && docker compose up -d --build` (stop the timer first, or its next pull replaces the local build with the Docker Hub one).

**Postgres and Caddy** are not updated by the timer (pinned to `postgres:18-alpine` and `caddy:2.10-alpine`). Once a month or so: `docker compose pull db caddy && docker compose up -d`. A new major version (Postgres 19, Caddy 2.11) is a change in `docker-compose.yml`, and Postgres needs a dump and restore for it.

**Back to the old site** (first two weeks only): on the FortiGate, set the VIP's mapped address back to `10.0.193.254`, and the internal DNS records (or hosts entries) back to what they were. IIS was never touched, so it works at once.

**Locked out of the admin** (wrong `ADMIN_ALLOWED_IPS`): in the VM set `ADMIN_ALLOWED_IPS=*` in `.env`, `docker compose up -d`, sign in, find your address in _Logy_, put the right ranges back, `docker compose up -d`.

---

## Test checklist after the deploy

Run it from outside (a phone on mobile data), from the school network and over the VPN. Desktop browser plus a phone, light and dark theme where it matters.

### Server and containers

- [ ] `docker compose ps -a`: `caddy`, `db` and `web` Up, `migrate` Exited (0)
- [ ] `docker compose logs migrate` ends without errors; `docker compose exec db psql -U zsmp -c "select count(*) from drizzle.__drizzle_migrations"` = the number of `.sql` files in `src/db/migrations/`
- [ ] After `sudo reboot` of the VM the site comes back by itself, and the Synology is mounted again (`df -h /mnt/nas`)
- [ ] `getenforce` still says `Enforcing`, and uploads in the admin work (an SELinux problem would show up here)

### Automatic updates

- [ ] The last _Docker images_ run on GitHub is green, and Docker Hub has `latest` and `sha-<that commit>` for both images
- [ ] `systemctl list-timers zsmp-update.timer` shows the next run, also after a reboot
- [ ] A small visible change (e.g. a typo fix) pushed to `main` is on the site within 15 minutes; `journalctl -u zsmp-update` shows "Updating to ..." and `backups/` has a `-before-update.dump`
- [ ] The runs in between write nothing to the journal and `systemctl status zsmp-update.service` is not `failed`

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
- [ ] The VM disk has room (`df -h`, `docker system df`), old dumps are pruned, `dnf-automatic` ran (`journalctl -u dnf-automatic`)
- [ ] The certificate renewed by itself (Caddy renews about 30 days before it expires; `docker compose logs caddy | grep -i renew`)
- [ ] Remove the old zsmp.cz site from IIS, then turn on HSTS (section 9.7)
