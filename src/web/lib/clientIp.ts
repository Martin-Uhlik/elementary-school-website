// The browser's real IP address. Caddy (deploy/caddy/Caddyfile) ignores any X-Forwarded-For the browser sent and
// sets it to the address it saw; only the last entry is trusted, in case a proxy appends instead of replacing.
// The web container is published only on 127.0.0.1 (docker-compose.yml), so nobody can skip Caddy to fake it.
export const clientIp = (headers: { get: (name: string) => string | null }) =>
  bareIp(headers.get("x-forwarded-for")?.split(",").at(-1)?.trim() ?? "");

// A proxy can add the port ("1.2.3.4:5678", "[2001:db8::1]:5678"), and IPv4 may come as "::ffff:1.2.3.4"
const bareIp = (value: string) => {
  const ip = value.match(/^\[(.+)\](?::\d+)?$/)?.[1] ?? value.match(/^([\d.]+):\d+$/)?.[1] ?? value;
  return ip.match(/^::ffff:([\d.]+)$/i)?.[1] ?? ip;
};
