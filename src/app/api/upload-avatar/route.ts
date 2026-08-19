import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { uploadProtectedResource, getProtectedSignedUrl } from "@/lib/cloudinary.server";

export async function POST(req: NextRequest) {
  // 1. Verify authenticated session
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ ok: false, message: "No autorizado" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("image") as File;

  if (!file) {
    return NextResponse.json({ ok: false, message: "No se proporcionó ningún archivo" }, { status: 400 });
  }

  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
  const MAX_SIZE_MB = 10; // 10 MB

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ ok: false, message: "Tipo de archivo inválido. Solo JPG, PNG o WEBP." }, { status: 400 });
  }

  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    return NextResponse.json({ ok: false, message: "El archivo es demasiado grande (máximo 10 MB)" }, { status: 400 });
  }

  try {
    const userId = session.user.id;
    const rawName = session.user.name || "usuario";
    const sanitizedName = rawName
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "_")
      .replace(/_+/g, "_")
      .replace(/^_|_$/g, "")
      .slice(0, 30);

    const customPublicId = `avatar_${sanitizedName}_${userId.slice(0, 8)}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");

    // 2. Upload to Cloudinary with delivery type 'authenticated' and custom naming
    const uploadResult = await uploadProtectedResource(
      `data:${file.type};base64,${base64}`,
      {
        folder: "cqcs/user-avatars",
        publicId: customPublicId,
        resourceType: "image",
        transformation: [
          { width: 500, height: 500, crop: "limit" },
          { quality: "auto", fetch_format: "auto" },
        ],
      }
    );

    // 3. Generate a stable signed delivery URL for client display and CDN caching
    const signedDeliveryUrl = getProtectedSignedUrl(uploadResult.public_id, {
      transformation: [
        { width: 500, height: 500, crop: "limit" },
        { quality: "auto", fetch_format: "auto" },
      ],
    });

    return NextResponse.json({
      ok: true,
      url: signedDeliveryUrl,
      publicId: uploadResult.public_id
    });
  } catch (error) {
    console.error("Cloudinary protected avatar upload failed:", error);
    return NextResponse.json({ ok: false, message: "Error al subir el avatar" }, { status: 500 });
  }
}
