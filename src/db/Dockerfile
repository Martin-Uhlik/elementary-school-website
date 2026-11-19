# The "migrate" container: applies new migrations, then fills an empty database (seed), and exits.
# Built from src/ (the npm workspace), see docker-compose.yml. No Next.js inside, only drizzle-orm and pg.
# Two stages: npm installs the packages in the first one, the image keeps only node, node_modules and src/db.

FROM node:26-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY db/package.json db/
COPY web/package.json web/
RUN npm ci --workspace db --omit=dev

FROM node:26-alpine AS run
# npm is not needed to run the scripts, so it goes (smaller image, fewer packages to patch)
RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./
COPY db db
USER node
WORKDIR /app/db
CMD ["sh", "-c", "node migrate.ts && node seed.ts"]
