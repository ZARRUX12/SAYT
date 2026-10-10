import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { getAdminSession } from "@/lib/auth/session";

export async function GET(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });

  const briefs = await prisma.brief.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(briefs);
}

export async function PATCH(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });

  const { id, status } = await req.json();

  const updated = await prisma.brief.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "ID обязателен" }, { status: 400 });

  await prisma.brief.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
