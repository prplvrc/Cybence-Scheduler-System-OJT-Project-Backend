import prisma from "../config/prisma.js";

export const createAuditLog = async ({
    userId,
    action,
    entity,
    entityId,
    details
}) => {
    return prisma.auditLog.create({
        data: {
            userId: Number(userId),
            action,
            entity,
            entityId: entityId ? Number(entityId) : null,
            details
        }
    });
};

export const getAuditLogs = async () => {
    return prisma.auditLog.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });
};