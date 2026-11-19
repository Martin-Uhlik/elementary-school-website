# The "migrate" container: applies new migrations, then fills an empty database (seed), and exits.
# Built from src/ (the npm workspace), see docker-compose.yml. No Next.js inside, only drizzle-orm and pg.
FROM node:26-alpine
WORKDIR /app
COPY package.json package-lock.json ./
COPY db/package.json db/
COPY web/package.json web/
RUN npm ci --workspace db --omit=dev
COPY db db
WORKDIR /app/db
CMD ["sh", "-c", "npm run migrate && npm run seed"]
