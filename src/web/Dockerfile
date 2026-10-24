# Next.js production image (standalone output).
# Photos and documents (galerie/, dokument/) are not in the image: docker-compose.yml mounts MEDIA_DIR at /app/media,
# and the tour videos at public/data/videos.

FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json prisma.config.ts ./
COPY prisma ./prisma
# npm ci runs "prisma generate" (postinstall), which needs the schema
RUN npm ci

# Also used by the "migrate" service in docker-compose.yml: it has the Prisma CLI and the migrations
FROM node:24-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npx prisma generate && npm run build

FROM node:24-alpine AS run
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0 MEDIA_DIR=/app/media
# the standalone server serves public/ and .next/static itself when they sit next to server.js
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
USER node
EXPOSE 3000
CMD ["node", "server.js"]
