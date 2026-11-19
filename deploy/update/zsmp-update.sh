#!/bin/sh
# Automatic deploy on the server, run every 10 minutes by zsmp-update.timer (docs/deploy.md section 11):
#   1. git pull of main (docker-compose.yml, the Caddyfile, this script),
#   2. docker compose pull of the web and migrate images that GitHub Actions pushes to Docker Hub,
#   3. only when that brought something not deployed yet: a database dump into backups/, then "docker compose up -d",
#      which runs migrate (new migrations) first and then replaces web.
# Nothing new = it does nothing and prints nothing. A failed deploy is tried again on the next run.
# Run it by hand the same way: sh deploy/update/zsmp-update.sh
set -eu
cd "$(dirname "$0")/../.."

git pull --ff-only --quiet
# quiet unless it fails (the progress lines would fill the journal every 10 minutes)
if ! output=$(docker compose pull --quiet web migrate 2>&1); then
  echo "$output" >&2
  exit 1
fi

# what is here now: the commit and the IDs of the images docker-compose.yml uses (sorted, compose lists them in a
# random order), compared with what the last successful run deployed (.deployed, gitignored)
current=$(git rev-parse HEAD; docker compose config --images | sort | xargs docker image inspect --format '{{.Id}}' 2>/dev/null || true)
deployed=$(cat .deployed 2>/dev/null || true)
if [ "$current" = "$deployed" ]; then
  exit 0
fi

echo "Updating to $(git log -1 --format="%h %s")"

# migrations only go forward, so keep a dump from just before (backup.sh deletes dumps older than 30 days)
mkdir -p backups
dump="backups/zsmp-$(date +%F-%H%M)-before-update.dump"
docker compose exec -T db sh -c 'pg_dump -U "$POSTGRES_USER" -Fc "$POSTGRES_DB"' > "$dump"
echo "Database dumped to $dump"

docker compose up -d --remove-orphans
# Caddy reads deploy/caddy/Caddyfile only when it starts (and sees a changed file only after a restart)
deployed_commit=$(echo "$deployed" | head -n 1)
if [ -z "$deployed_commit" ] || ! git diff --quiet "$deployed_commit" HEAD -- deploy/caddy; then
  docker compose restart caddy
fi
docker image prune -f > /dev/null

echo "$current" > .deployed
docker compose ps -a
