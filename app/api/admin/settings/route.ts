import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { getAdminSession } from "@/lib/auth/session";

export async function GET(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });

  const [settings, owner, location] = await Promise.all([
    prisma.siteSetting.findUnique({ where: { id: "default" } }),
    prisma.ownerProfile.findUnique({ where: { id: "default" } }),
    prisma.location.findUnique({ where: { id: "default" } }),
  ]);

  return NextResponse.json({ settings, owner, location });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });

  const { settings, owner, location } = await req.json();

  if (settings) {
    await prisma.siteSetting.upsert({
      where: { id: "default" },
      update: settings,
      create: { id: "default", ...settings },
    });
  }

  if (owner) {
    await prisma.ownerProfile.upsert({
      where: { id: "default" },
      update: owner,
      create: { id: "default", ...owner },
    });
  }

  if (location) {
    await prisma.location.upsert({
      where: { id: "default" },
      update: location,
      create: { id: "default", ...location },
    });
  }

  return NextResponse.json({ success: true });
}
