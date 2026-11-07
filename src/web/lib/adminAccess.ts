import { BlockList, isIP } from "node:net";

// ADMIN_ALLOWED_IPS: who can see /admin and /auth, as addresses and CIDR ranges separated by commas
// ("192.168.1.0/24, 10.8.0.0/24"), or * for everyone. Unset in production means nobody;
// on a dev machine (npm run dev) it means everyone.
const setting = (process.env.ADMIN_ALLOWED_IPS ?? "").trim();
const everyone = setting === "*" || (setting === "" && process.env.NODE_ENV !== "production");

const ranges = new BlockList();
for (const entry of setting.split(",").map((part) => part.trim())) {
  if (entry === "" || entry === "*") continue;
  const [address, prefix] = entry.split("/");
  const type = isIP(address) === 6 ? "ipv6" : "ipv4";
  const bits = prefix === undefined ? (type === "ipv6" ? 128 : 32) : Number(prefix);
  try {
    ranges.addSubnet(address, bits, type);
  } catch {
    console.error(`ADMIN_ALLOWED_IPS: "${entry}" is not an IP address or a CIDR range, skipped`);
  }
}

export const adminAllowed = (ip: string) => {
  if (everyone) return true;
  const version = isIP(ip);
  return version !== 0 && ranges.check(ip, version === 6 ? "ipv6" : "ipv4");
};
