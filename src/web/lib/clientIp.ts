// The browser's real IP address. IIS (deploy/iis/web.config) replaces any X-Forwarded-For the browser sent with
// the address it saw, and ARR may add that address once more at the end, so only the last entry is trusted.
// The web container is reachable only from IIS (Hyper-V internal switch), so nobody can skip IIS to fake it.
export const clientIp = (headers: { get: (name: string) => string | null }) =>
  bareIp(headers.get("x-forwarded-for")?.split(",").at(-1)?.trim() ?? "");

// ARR can add the port ("1.2.3.4:5678", "[2001:db8::1]:5678"), and IPv4 may come as "::ffff:1.2.3.4"
const bareIp = (value: string) => {
  const ip = value.match(/^\[(.+)\](?::\d+)?$/)?.[1] ?? value.match(/^([\d.]+):\d+$/)?.[1] ?? value;
  return ip.match(/^::ffff:([\d.]+)$/i)?.[1] ?? ip;
};
