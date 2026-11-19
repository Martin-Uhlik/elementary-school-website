# Next.js production image (standalone output). Built from src/ (the npm workspace), because the tables
# come from the db package next to it, see docker-compose.yml.
# Photos and documents (galerie/, dokument/) are not in the image: docker-compose.yml mounts MEDIA_DIR at /app/media,
# and the tour videos at public/data/videos.
# Three stages: packages, build, run. Only the last one is the image: Next's standalone server (just the packages it
# really uses), the static files and node, without npm, the source code or the build tools.

FROM node:26-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY db/package.json db/
COPY web/package.json web/
RUN npm ci --workspace web

FROM node:26-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./
COPY db db
COPY web web
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build --workspace web
# sharp (image resizing) comes with builds for both Linux C libraries; Alpine uses musl, so drop the glibc ones (~18 MB)
RUN rm -rf web/.next/standalone/node_modules/@img/sharp-linux-* web/.next/standalone/node_modules/@img/sharp-libvips-linux-*

FROM node:26-alpine AS run
# the server runs with plain node, npm is not needed (smaller image, fewer packages to patch)
RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0 MEDIA_DIR=/app/media
# the standalone output mirrors src/ (server in web/); it serves public/ and .next/static when they sit next to server.js
COPY --from=build --chown=node:node /app/web/.next/standalone ./
COPY --from=build --chown=node:node /app/web/.next/static ./web/.next/static
COPY --from=build --chown=node:node /app/web/public ./web/public
USER node
WORKDIR /app/web
EXPOSE 3000
CMD ["node", "server.js"]
