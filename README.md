# Elementary school website
A new website for an elementary school aimed at modernizing an outdated version that was over 10 years old. The new site was designed with a focus on a simple and clear layout, making it easy to use for parents, teachers, and students. A key feature was responsiveness, ensuring a seamless experience on mobile devices. Additionally, the website includes an automatic gallery generation function from uploaded images, making it easier for the school to share photos from events and activities.

# Images
![main_desktop](https://github.com/user-attachments/assets/a4d52f4b-4a27-4fc0-9930-c84223c37fb5)

![main_mobile](https://github.com/user-attachments/assets/42462fb6-c73b-463f-b60b-950088a2953d)

# Developer manual
[Here](https://github.com/Martin-Uhlik/elementary-school-website/blob/main/manual/dev_manual.pdf)

# Run with Docker

The site runs as three containers: `web` (Next.js with the admin, `src/web`), `db` (PostgreSQL 18, `src/db`) and `migrate`, which runs once on every start: it applies new database migrations and fills an empty database.

```bash
cp .env.example .env    # then set a real POSTGRES_PASSWORD
docker compose up -d --build
```

The site is then on http://localhost:3000.

## Admin

`/admin` is the sign-in page (not linked from the site, hidden from search engines). The first user is **admin / zsmp**; after signing in it has to set its own password. The admin (`/auth`) edits news, people and contacts, documents on every page, galleries and photos, and users.

- **Access:** each user gets the sections they may edit (Aktuality, Lidé, Dokumenty, Galerie); *Správce* (admin) can do everything, including Uživatelé and Logy. Real names of users are visible only to admins. Every user changes their own sign-in name and password under *Můj účet* (`/auth/ucet`).
- **Logs:** sign-ins, sign-outs, wrong passwords and account changes (with IP address and browser) and every change made in the admin are stored in the database. Admins see them under *Logy* (`/auth/logy`), filtered by user and date; each user sees their own recent sign-ins on the start page.
- **Time limits** (`src/web/lib/auth/config.ts`, overridable in `.env`): sign-out after 30 minutes without activity (the timer in the header; the server ends the session too, even with the tab closed), a sign-in lasts at most 8 hours, and 5 wrong passwords lock the account for 10 minutes (an admin can unlock it under Uživatelé).

The sign-in cookie only travels over HTTPS (IIS). To try the admin over plain http, e.g. http://192.168.100.10:3000, set `COOKIE_SECURE=false` in `.env` for that time.

## Photos, documents and videos

They are not in git or in the image. They live in a folder on the server (`MEDIA_DIR` in `.env`, default `./media`), which is mounted into the web container, so they survive rebuilds:

```
media/
  galerie/<folder>/...   → /galerie/<folder>        (photos, thumbnails/ = previews)
  dokument/...           → /dokument/...
  videos/zsmp.mp4, zsmp.cs.vtt → /data/videos/...
```

The admin uploads into `galerie/` and `dokument/`, so the folder must be writable for the container's user (uid 1000): `sudo chown -R 1000:1000 media`. New files are served right away.

## Database

- The data lives in the Docker volume `db-data`, which survives restarts and rebuilds. Back it up with `docker compose exec db pg_dump -U zsmp zsmp > backup.sql`.
- Prisma owns the tables: `src/web/prisma/schema.prisma` and the migrations in `src/web/prisma/migrations/`. The `migrate` service applies them on every `docker compose up`.
- The first content (as it was in `src/web/data/*.ts`) is `src/web/prisma/seed/content.sql`; it is loaded only into an empty database. From then on the content is edited in the admin.
- If you started the database before Prisma took over (its tables came from `src/db/init/`), either start from scratch with `docker compose down -v` (this deletes all data in it) or keep it with `docker compose run --rm migrate npx prisma migrate resolve --applied 0_init` and then `docker compose up -d`.
- The database listens only on 127.0.0.1:5432 inside the VM. To open it in DBeaver or pgAdmin, use their SSH tunnel option to the VM.

## IIS

IIS stays the public web server and forwards requests to the `web` container, so no nginx is needed. `deploy/iis/web.config` is the site's config: it needs the IIS modules [URL Rewrite](https://www.iis.net/downloads/microsoft/url-rewrite) and [Application Request Routing](https://www.iis.net/downloads/microsoft/application-request-routing) (in ARR's _Server Proxy Settings_, tick _Enable proxy_; in URL Rewrite's _View Server Variables_, add `HTTP_X_FORWARDED_PROTO` and `HTTP_X_FORWARDED_HOST`). HTTPS certificates stay in IIS.

## Server setup (Windows Server 2019)

Windows Server 2019 cannot run Linux containers, so Docker runs in a small Ubuntu VM in Hyper-V and IIS forwards to it:

```
internet → IIS (HTTPS, port 443) → VM 192.168.100.10:3000 → web container → db container
```

1. Add the Hyper-V role. In PowerShell (as admin), create a private switch that only the server can reach, with internet access through NAT:
   ```powershell
   New-VMSwitch -Name zsmp -SwitchType Internal
   New-NetIPAddress -IPAddress 192.168.100.1 -PrefixLength 24 -InterfaceAlias "vEthernet (zsmp)"
   New-NetNat -Name zsmp -InternalIPInterfaceAddressPrefix 192.168.100.0/24
   ```
2. Create a Generation 2 VM on the `zsmp` switch (2 CPUs, 4 GB RAM, a disk with room for the photos) and install Ubuntu Server 24.04 LTS with OpenSSH. Give it the static address 192.168.100.10/24, gateway 192.168.100.1, DNS e.g. 1.1.1.1. In the VM settings, set _Automatic Start Action_ to always start.
3. In the VM, install Docker Engine (https://docs.docker.com/engine/install/ubuntu/), clone this repo, create `.env` with `WEB_BIND=192.168.100.10`, and run `docker compose up -d --build`. The containers start again by themselves after a reboot.
4. Put the existing photos, documents and videos into `media/` in the VM (e.g. with WinSCP over SSH) and run `sudo chown -R 1000:1000 media`.
5. In IIS, point the site at a folder holding `deploy/iis/web.config` and set up the modules as described in the IIS section above.

Back up the VM (Hyper-V checkpoint or Windows Server Backup) and the database dump regularly; the photos and the database live on the VM's disk.
