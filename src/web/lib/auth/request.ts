import "server-only";
import { headers } from "next/headers";
import { clientIp } from "@/lib/clientIp";

// The browser's address and user agent for the logs
export const requestInfo = async () => {
  const list = await headers();
  return {
    ip: clientIp(list),
    userAgent: (list.get("user-agent") ?? "").slice(0, 500),
  };
};
