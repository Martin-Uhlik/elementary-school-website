# Elementary school website
A new website for an elementary school aimed at modernizing an outdated version that was over 10 years old. The new site was designed with a focus on a simple and clear layout, making it easy to use for parents, teachers, and students. A key feature was responsiveness, ensuring a seamless experience on mobile devices. Additionally, the website includes an automatic gallery generation function from uploaded images, making it easier for the school to share photos from events and activities.

# Images
![main_desktop](https://github.com/user-attachments/assets/a4d52f4b-4a27-4fc0-9930-c84223c37fb5)

![main_mobile](https://github.com/user-attachments/assets/42462fb6-c73b-463f-b60b-950088a2953d)

# Developer manual
[Here](https://github.com/Martin-Uhlik/elementary-school-website/blob/main/manual/dev_manual.pdf)

# Run with Docker

The site runs as two containers: `web` (Next.js, `src/web`) and `db` (PostgreSQL 18, `src/db`).

```bash
cp .env.example .env    # then set a real POSTGRES_PASSWORD
docker compose up -d --build
```

The site is then on http://localhost:3000.

## Photos, documents and videos

They are not in git or in the image. They live in a folder on the server (`MEDIA_DIR` in `.env`, default `./media`), which is mounted into the web container, so they survive rebuilds:

```
media/
  galerie/<id>/...       → /galerie/<id>
  dokument/...           → /dokument/...
  videos/zsmp.mp4, zsmp.cs.vtt → /data/videos/...
```

Gallery pages read the folders on every request. New files are served after `docker compose restart web` (Next.js lists `public/` when it starts).

## Database

- The data lives in the Docker volume `db-data`, which survives restarts and rebuilds. Back it up with `docker compose exec db pg_dump -U zsmp zsmp > backup.sql`.
- `src/db/init/01-schema.sql` creates the tables, `src/db/init/02-seed.sql` fills them. Both run only on the first start, when the `db-data` volume is empty.
- The seed is generated from `src/web/data/*.ts`: after changing that data run `npm run seed` in `src/db` (Node 22.18+, nothing to install).
- To start the database from scratch: `docker compose down -v && docker compose up -d --build` (this deletes all data in it).
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
4. Put the photos, documents and videos into `media/` in the VM (e.g. with WinSCP over SSH), then `docker compose restart web`.
5. In IIS, point the site at a folder holding `deploy/iis/web.config` and set up the modules as described in the IIS section above.

Back up the VM (Hyper-V checkpoint or Windows Server Backup) and the database dump regularly; the photos and the database live on the VM's disk.
