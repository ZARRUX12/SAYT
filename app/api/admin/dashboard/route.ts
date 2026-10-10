import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { getAdminSession } from "@/lib/auth/session";

export async function GET(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });

  const [
    totalServices,
    totalPortfolio,
    totalLeads,
    totalBriefs,
    recentLeads,
    recentBriefs,
    categoriesCount,
  ] = await Promise.all([
    prisma.service.count(),
    prisma.portfolioProject.count(),
    prisma.lead.count(),
    prisma.brief.count(),
    prisma.lead.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
    prisma.brief.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
    prisma.serviceCategory.count(),
  ]);

  return NextResponse.json({
    totalServices,
    totalPortfolio,
    totalLeads,
    totalBriefs,
    recentLeads,
    recentBriefs,
    categoriesCount,
  });
}
