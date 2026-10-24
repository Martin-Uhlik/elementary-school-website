import { DOCUMENT_DIR, serveFile } from "@/lib/media";

// Documents from the media folder: /dokument/<file>
export const GET = async (request: Request, { params }: RouteContext<"/dokument/[...file]">) =>
  serveFile(request, DOCUMENT_DIR, (await params).file);
