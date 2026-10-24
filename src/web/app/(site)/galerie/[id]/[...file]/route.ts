import { GALLERY_DIR, serveFile } from "@/lib/media";

// Photos and previews of a gallery from the media folder: /galerie/<folder>/<file>, /galerie/<folder>/thumbnails/<file>
export const GET = async (request: Request, { params }: RouteContext<"/galerie/[id]/[...file]">) => {
  const { id, file } = await params;
  return serveFile(request, GALLERY_DIR, [id, ...file]);
};
