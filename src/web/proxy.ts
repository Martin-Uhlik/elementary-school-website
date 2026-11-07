import { NextResponse, type NextRequest } from "next/server";
import { adminAllowed } from "@/lib/adminAccess";
import { clientIp } from "@/lib/clientIp";

// The admin (/admin, /auth, their server actions and the photo upload) answers only to ADMIN_ALLOWED_IPS
// (the school network and the VPN). Everyone else gets the site's ordinary 404, as for any unknown address.
// This is an extra layer: every admin page and action still checks the sign-in itself.
export const proxy = (request: NextRequest) => {
  if (adminAllowed(clientIp(request.headers))) {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }
  // a page for the browser (_404 can never be a route, folders starting with _ are private),
  // an empty 404 for forms, uploads and server actions
  if ((request.method === "GET" || request.method === "HEAD") && !request.headers.has("next-action")) {
    return NextResponse.rewrite(new URL("/_404", request.url));
  }
  return new NextResponse(null, { status: 404 });
};

export const config = {
  matcher: [
    "/admin/:path*",
    "/auth/:path*",
    // a server action can be sent to any address, so every request carrying one is checked too
    { source: "/:path*", has: [{ type: "header", key: "next-action" }] },
  ],
};
