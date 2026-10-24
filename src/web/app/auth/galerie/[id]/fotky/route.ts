import { savePhoto } from "@/lib/admin/photos";
import { logActivity } from "@/lib/auth/log";
import { can } from "@/lib/auth/sections";
import { getCurrentUser } from "@/lib/auth/session";
import { galleryFolder } from "@/lib/content/format";
import { toGallery } from "@/lib/content/galleries";
import { prisma } from "@/lib/db";

// Upload of one photo (form field "photo"); the admin page sends the chosen photos one by one
export const POST = async (request: Request, { params }: RouteContext<"/auth/galerie/[id]/fotky">) => {
  const user = await getCurrentUser();
  if (!user || user.mustChangePassword) return Response.json({ error: "Nejste přihlášeni." }, { status: 401 });
  if (!can(user.permissions, "galerie")) return Response.json({ error: "Do galerií nemáte přístup." }, { status: 403 });
  const row = await prisma.gallery.findUnique({ where: { id: (await params).id } });
  if (!row || row.url) return Response.json({ error: "Galerie neexistuje." }, { status: 404 });

  const photo = (await request.formData()).get("photo");
  if (!(photo instanceof File)) return Response.json({ error: "Chybí fotka." }, { status: 400 });
  try {
    const file = await savePhoto(galleryFolder(toGallery(row)), photo);
    await logActivity(user, "galerie", `Nahrána fotka ${file} do galerie „${row.title}“`);
    return Response.json({ file });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Fotku se nepodařilo uložit." },
      { status: 400 },
    );
  }
};
