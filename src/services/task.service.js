import prisma from "../config/prisma.js";

export const createTask = async (taskData, createdBy) => {
    const assignedToId = taskData.assignedTo ? Number(taskData.assignedTo) : null;

    return await prisma.task.create({
        data: {
            title: taskData.title,
            description: taskData.description || null,
            status: taskData.status || "Pending",
            priority: taskData.priority || "Medium",
            dueDate: taskData.dueDate ? new Date(taskData.dueDate) : null,
            createdBy: Number(createdBy),
            assignedTo: Number.isNaN(assignedToId) ? null : assignedToId
        },
        include: {
            creator: { select: { id: true, name: true, email: true } },
            assignee: { select: { id: true, name: true, email: true } }
        }
    });
};

export const getAllTasks = async () => {
    return await prisma.task.findMany({
        distinct: ["id"], // Ensures duplicate rows aren't returned
        include: {
            creator: { select: { id: true, name: true, email: true } },
            assignee: { select: { id: true, name: true, email: true } }
        },
        orderBy: { createdAt: "desc" }
    });
};

export const getTaskById = async (id) => {
    return await prisma.task.findUnique({
        where: { id: Number(id) },
        include: {
            creator: { select: { id: true, name: true, email: true } },
            assignee: { select: { id: true, name: true, email: true } }
        }
    });
};

export const updateTask = async (id, taskData) => {
    const updateData = {};

    if (taskData.title !== undefined) updateData.title = taskData.title;
    if (taskData.description !== undefined) updateData.description = taskData.description;
    if (taskData.status !== undefined) updateData.status = taskData.status;
    if (taskData.priority !== undefined) updateData.priority = taskData.priority;

    if (taskData.assignedTo !== undefined) {
        updateData.assignedTo = taskData.assignedTo ? Number(taskData.assignedTo) : null;
    }

    if (taskData.dueDate !== undefined) {
        updateData.dueDate = taskData.dueDate ? new Date(taskData.dueDate) : null;
    }

    return await prisma.task.update({
        where: { id: Number(id) },
        data: updateData,
        include: {
            creator: { select: { id: true, name: true, email: true } },
            assignee: { select: { id: true, name: true, email: true } }
        }
    });
};

export const deleteTask = async (id) => {
    return await prisma.task.delete({
        where: { id: Number(id) }
    });
};