import prisma from "@/lib/db/prisma";

export async function logAudit(
  action: "CREATE" | "UPDATE" | "DELETE" | "LOGIN" | "LOGOUT",
  entity: string,
  entityId?: string,
  details?: string,
  userId?: string,
  userName: string = "ADMIN"
) {
  try {
    await prisma.auditLog.create({
      data: {
        action,
        entity,
        entityId,
        details,
        userId,
        userName,
      },
    });
  } catch (error) {
    console.error("Failed to log audit action:", error);
  }
}
