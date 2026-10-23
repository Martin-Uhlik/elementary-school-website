# PostgreSQL with the site's schema and content.
# The scripts in init/ run only on the first start, when the data volume is empty.
FROM postgres:18-alpine

# Czech collation, so ORDER BY puts "Č" after "C" and "Ch" after "H"
ENV POSTGRES_INITDB_ARGS="--encoding=UTF8 --locale-provider=icu --icu-locale=cs-CZ"

COPY init/ /docker-entrypoint-initdb.d/
