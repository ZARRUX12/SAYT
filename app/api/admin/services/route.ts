import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { getAdminSession } from "@/lib/auth/session";

export async function GET(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });

  const services = await prisma.service.findMany({
    include: { category: true },
    orderBy: { order: "asc" },
  });

  return NextResponse.json(services);
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });

  const data = await req.json();
  const service = await prisma.service.create({
    data: {
      title: data.title,
      slug: data.slug || data.title.toLowerCase().replace(/\s+/g, "-"),
      categoryId: data.categoryId,
      shortDesc: data.shortDesc,
      fullDesc: data.fullDesc,
      priceMode: data.priceMode || "CUSTOM",
      priceLabel: data.priceLabel,
      priceValue: data.priceValue ? Number(data.priceValue) : null,
      currency: data.currency || "UZS",
      features: typeof data.features === "string" ? data.features : JSON.stringify(data.features || []),
      workflow: typeof data.workflow === "string" ? data.workflow : JSON.stringify(data.workflow || []),
      advantages: typeof data.advantages === "string" ? data.advantages : JSON.stringify(data.advantages || []),
      faq: typeof data.faq === "string" ? data.faq : JSON.stringify(data.faq || []),
      tags: data.tags,
      status: data.status || "PUBLISHED",
      order: Number(data.order) || 0,
      model3D: data.model3D,
      orbitRadius: Number(data.orbitRadius) || 3.5,
      animationSpeed: Number(data.animationSpeed) || 1.0,
      rotationSpeed: Number(data.rotationSpeed) || 1.0,
      glowColor: data.glowColor || "#FFC200",
      coverImage: data.coverImage,
    },
  });

  return NextResponse.json(service);
}

export async function PUT(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });

  const data = await req.json();
  const updated = await prisma.service.update({
    where: { id: data.id },
    data: {
      title: data.title,
      slug: data.slug,
      categoryId: data.categoryId,
      shortDesc: data.shortDesc,
      fullDesc: data.fullDesc,
      priceMode: data.priceMode,
      priceLabel: data.priceLabel,
      priceValue: data.priceValue ? Number(data.priceValue) : null,
      currency: data.currency,
      features: typeof data.features === "string" ? data.features : JSON.stringify(data.features || []),
      workflow: typeof data.workflow === "string" ? data.workflow : JSON.stringify(data.workflow || []),
      advantages: typeof data.advantages === "string" ? data.advantages : JSON.stringify(data.advantages || []),
      faq: typeof data.faq === "string" ? data.faq : JSON.stringify(data.faq || []),
      tags: data.tags,
      status: data.status,
      order: Number(data.order),
      model3D: data.model3D,
      orbitRadius: Number(data.orbitRadius) || 3.5,
      animationSpeed: Number(data.animationSpeed) || 1.0,
      rotationSpeed: Number(data.rotationSpeed) || 1.0,
      glowColor: data.glowColor || "#FFC200",
      coverImage: data.coverImage,
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

  await prisma.service.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
