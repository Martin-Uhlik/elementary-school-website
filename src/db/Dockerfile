# PostgreSQL for the site. The tables and the first content come from the web app:
# Prisma migrations + seed (src/web/prisma), run by the "migrate" service in docker-compose.yml.
FROM postgres:18-alpine

# Czech collation, so ORDER BY puts "Č" after "C" and "Ch" after "H"
ENV POSTGRES_INITDB_ARGS="--encoding=UTF8 --locale-provider=icu --icu-locale=cs-CZ"
