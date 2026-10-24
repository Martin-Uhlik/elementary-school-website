import "server-only";
import { headers } from "next/headers";

// The browser's address and user agent for the logs. IIS (ARR) appends the real address to X-Forwarded-For,
// so the last entry is the one IIS saw; anything before it was sent by the browser and could be made up.
export const requestInfo = async () => {
  const list = await headers();
  const forwarded = list.get("x-forwarded-for")?.split(",").at(-1)?.trim();
  return {
    ip: forwarded || list.get("x-real-ip") || "",
    userAgent: (list.get("user-agent") ?? "").slice(0, 500),
  };
};
