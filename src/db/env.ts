// DATABASE_URL comes from the environment (Docker), or on a dev machine from db/.env or web/.env,
// so the scripts use the same database as the app
for (const file of [".env", "../web/.env"]) {
  try {
    process.loadEnvFile(file);
    break;
  } catch {}
}
