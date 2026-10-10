import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().min(2, "Имя обязательно"),
  phone: z.string().min(7, "Номер телефона обязателен"),
  telegram: z.string().optional(),
  email: z.string().email("Некорректный email").optional().or(z.literal("")),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().optional(),
  question: z.string().optional(),
  source: z.string().default("WEBSITE"),
  page: z.string().optional(),
  language: z.string().optional(),
  details: z.any().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = leadSchema.parse(body);

    const leadMessage = validated.message || validated.question || null;
    const extraDetails = {
      ...(typeof validated.details === "object" ? validated.details : {}),
      ...(validated.page ? { page: validated.page } : {}),
      ...(validated.language ? { language: validated.language } : {}),
      ...(validated.question ? { question: validated.question } : {}),
    };

    const lead = await prisma.lead.create({
      data: {
        name: validated.name,
        phone: validated.phone,
        telegram: validated.telegram || null,
        email: validated.email || null,
        company: validated.company || null,
        service: validated.service || null,
        message: leadMessage,
        source: validated.source,
        details: Object.keys(extraDetails).length > 0 ? JSON.stringify(extraDetails) : null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Заявка успешно отправлена. Мы свяжемся с вами в ближайшее время!",
      leadId: lead.id,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    console.error("Error creating lead:", error);
    return NextResponse.json({ error: "Не удалось отправить заявку. Попробуйте еще раз." }, { status: 500 });
  }
}
