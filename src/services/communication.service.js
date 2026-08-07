import prisma from "../config/prisma.js";

export const createMessage = async (messageData) => {
    return await prisma.message.create({
        data: {
            subject: messageData.subject,
            content: messageData.content,
            senderId: Number(messageData.senderId)
        },
        include: {
            sender: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true
                }
            }
        }
    });
};

export const getAllMessages = async () => {
    return await prisma.message.findMany({
        include: {
            sender: {
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

export const getMessageById = async (id) => {
    return await prisma.message.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            sender: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true
                }
            }
        }
    });
};

export const updateMessage = async (id, messageData) => {
    return await prisma.message.update({
        where: {
            id: Number(id)
        },
        data: {
            subject: messageData.subject,
            content: messageData.content
        },
        include: {
            sender: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true
                }
            }
        }
    });
};

export const deleteMessage = async (id) => {
    return await prisma.message.delete({
        where: {
            id: Number(id)
        }
    });
};