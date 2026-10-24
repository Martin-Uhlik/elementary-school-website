// Time limits of the admin area and how long its logs are kept, in one place. Each can be changed in .env (see .env.example) without a rebuild.
const setting = (name: string, fallback: number) => {
  const value = Number(process.env[name]);
  return Number.isFinite(value) && value > 0 ? value : fallback;
};

export const authConfig = {
  // sign out after this long without a click or a key press (the timer in the header counts it down)
  inactivityMinutes: setting("AUTH_INACTIVITY_MINUTES", 30),
  // a sign-in never lasts longer than this, even when the user keeps working
  sessionMaxMinutes: setting("AUTH_SESSION_MAX_MINUTES", 8 * 60),
  // this many wrong passwords in a row lock the account ...
  lockoutAttempts: setting("AUTH_LOCKOUT_ATTEMPTS", 5),
  // ... for this long
  lockoutMinutes: setting("AUTH_LOCKOUT_MINUTES", 10),
  // sign-ins and admin changes (with IP address and browser) are deleted after this many days (GDPR: kept only as long as needed)
  logRetentionDays: setting("LOG_RETENTION_DAYS", 180),
};
