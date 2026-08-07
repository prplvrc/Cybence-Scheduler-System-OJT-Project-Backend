import prisma from "../config/prisma.js";

export const createTask = async (taskData) => {
    return await prisma.task.create({
        data: {
            title: taskData.title,
            description: taskData.description,
            status: taskData.status,
            priority: taskData.priority,
            dueDate: taskData.dueDate
                ? new Date(taskData.dueDate)
                : null,
            assignedTo: Number(taskData.assignedTo)
        },
        include:{
            creator:{
                select:{
                    id:true,
                    name:true,
                    email:true
                }
            },

            assignee:{
                select:{
                    id:true,
                    name:true,
                    email:true
                }
            }
        }
    });
};

export const getAllTasks = async () => {
    return await prisma.task.findMany({
        include:{
            creator:{
                select:{
                    id:true,
                    name:true,
                    email:true
                }
            },

            assignee:{
                select:{
                    id:true,
                    name:true,
                    email:true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });
};

export const getTaskById = async (id) => {
    return await prisma.task.findUnique({
        where: {
            id: Number(id)
        },
        include:{
            creator:{
                select:{
                    id:true,
                    name:true,
                    email:true
                }
            },

            assignee:{
                select:{
                    id:true,
                    name:true,
                    email:true
                }
            }
        }
    });
};

export const updateTask = async (id, taskData) => {
    return await prisma.task.update({
        where: {
            id: Number(id)
        },
        data: {
            ...taskData,
            assignedTo: taskData.assignedTo
                ? Number(taskData.assignedTo)
                : undefined,
            dueDate: taskData.dueDate
                ? new Date(taskData.dueDate)
                : undefined
        },
        include:{
            creator:{
                select:{
                    id:true,
                    name:true,
                    email:true
                }
            },

            assignee:{
                select:{
                    id:true,
                    name:true,
                    email:true
                }
            }
        }
    });
};

export const deleteTask = async (id) => {
    return await prisma.task.delete({
        where: {
            id: Number(id)
        }
    });
};