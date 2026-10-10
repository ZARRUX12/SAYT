import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { z } from "zod";

const briefSchema = z.object({
  name: z.string().min(2, "Укажите контактное лицо"),
  phone: z.string().min(7, "Укажите номер телефона"),
  company: z.string().optional(),
  telegram: z.string().optional(),
  email: z.string().optional(),
  website: z.string().optional(),
  businessType: z.string().optional(),
  targetGoal: z.string().optional(),
  chosenServices: z.array(z.string()).optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  description: z.string().min(5, "Пожалуйста, опишите задачу"),
  fileUrl: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = briefSchema.parse(body);

    const brief = await prisma.brief.create({
      data: {
        name: validated.name,
        company: validated.company || null,
        phone: validated.phone,
        telegram: validated.telegram || null,
        email: validated.email || null,
        website: validated.website || null,
        businessType: validated.businessType || null,
        targetGoal: validated.targetGoal || null,
        chosenServices: validated.chosenServices ? JSON.stringify(validated.chosenServices) : null,
        budget: validated.budget || null,
        timeline: validated.timeline || null,
        description: validated.description,
        fileUrl: validated.fileUrl || null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Техническое задание успешно отправлено. Мы внимательно изучим его и подготовим точное КП!",
      briefId: brief.id,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    console.error("Error creating brief:", error);
    return NextResponse.json({ error: "Не удалось отправить бриф. Попробуйте еще раз." }, { status: 500 });
  }
}
