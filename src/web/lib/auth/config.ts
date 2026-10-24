// Time limits of the admin area in one place. Each can be changed in .env (see .env.example) without a rebuild.
const minutes = (name: string, fallback: number) => {
  const value = Number(process.env[name]);
  return Number.isFinite(value) && value > 0 ? value : fallback;
};

export const authConfig = {
  // sign out after this long without a click or a key press (the timer in the header counts it down)
  inactivityMinutes: minutes("AUTH_INACTIVITY_MINUTES", 5),
  // a sign-in never lasts longer than this, even when the user keeps working
  sessionMaxMinutes: minutes("AUTH_SESSION_MAX_MINUTES", 8 * 60),
  // this many wrong passwords in a row lock the account ...
  lockoutAttempts: minutes("AUTH_LOCKOUT_ATTEMPTS", 5),
  // ... for this long
  lockoutMinutes: minutes("AUTH_LOCKOUT_MINUTES", 10),
};
