import prisma from "../config/prisma.js";

export const getAllUsers = async () => {
    return await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true
        }
    });
};

export const getUserById = async (id) => {
    return await prisma.user.findUnique({
        where: {
            id: Number(id)
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true
        }
    });
};

export const updateUser = async (id, data) => {
    return await prisma.user.update({
        where: {
            id: Number(id)
        },
        data
    });
};

export const deleteUser = async (id) => {
    return await prisma.user.delete({
        where: {
            id: Number(id)
        }
    });
};