import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/storage";
import prisma from "@/lib/db/prisma";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Файл не предоставлен" }, { status: 400 });
    }

    // Size limit 50MB
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: "Размер файла превышает допустимые 50MB" }, { status: 400 });
    }

    const saved = await storage.saveFile(file);

    const media = await prisma.media.create({
      data: {
        filename: saved.filename,
        path: saved.url,
        mimetype: saved.mimetype,
        size: saved.size,
      },
    });

    return NextResponse.json({
      success: true,
      url: saved.url,
      media,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Ошибка при загрузке файла" }, { status: 500 });
  }
}
