import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { getAdminSession } from "@/lib/auth/session";

export async function GET(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });

  const categories = await prisma.serviceCategory.findMany({
    orderBy: { order: "asc" },
  });

  return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });

  const data = await req.json();
  const category = await prisma.serviceCategory.create({
    data: {
      number: data.number || "00",
      name: data.name,
      slug: data.slug || data.name.toLowerCase().replace(/\s+/g, "-"),
      description: data.description,
      icon3D: data.icon3D || "website",
      order: Number(data.order) || 0,
      isVisible: data.isVisible !== false,
    },
  });

  return NextResponse.json(category);
}

export async function PUT(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });

  const data = await req.json();
  const updated = await prisma.serviceCategory.update({
    where: { id: data.id },
    data: {
      number: data.number,
      name: data.name,
      slug: data.slug,
      description: data.description,
      icon3D: data.icon3D,
      order: Number(data.order),
      isVisible: data.isVisible,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID обязателен" }, { status: 400 });

  await prisma.serviceCategory.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
