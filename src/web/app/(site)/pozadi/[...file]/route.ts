import { BACKGROUND_DIR, serveFile } from "@/lib/media";

// Background pictures uploaded in /auth/pozadi: /pozadi/<file>
export const GET = async (request: Request, { params }: RouteContext<"/pozadi/[...file]">) =>
  serveFile(request, BACKGROUND_DIR, (await params).file);
