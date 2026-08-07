import prisma from "../config/prisma.js";

export const getDashboardStats = async () => {

    const totalUsers = await prisma.user.count();

    const totalTasks = await prisma.task.count();

    const pendingTasks = await prisma.task.count({
        where: {
            status: "Pending"
        }
    });

    const completedTasks = await prisma.task.count({
        where: {
            status: "Completed"
        }
    });

    const totalRequests = await prisma.request.count();

    const pendingRequests = await prisma.request.count({
        where: {
            status: "Pending"
        }
    });

    const approvedRequests = await prisma.request.count({
        where: {
            status: "Approved"
        }
    });

    const rejectedRequests = await prisma.request.count({
        where: {
            status: "Rejected"
        }
    });

    const totalMessages = await prisma.message.count();

    const totalEvents = await prisma.calendarEvent.count();

    return {
        totalUsers,
        totalTasks,
        pendingTasks,
        completedTasks,
        totalRequests,
        pendingRequests,
        approvedRequests,
        rejectedRequests,
        totalMessages,
        totalEvents
    };
};


export const getRecentTasks = async () => {
    return await prisma.task.findMany({
        take: 5,
        orderBy: {
            createdAt: "desc"
        },
        include: {
            user: true
        }
    });
};


export const getUpcomingEvents = async () => {
    return await prisma.calendarEvent.findMany({
        where: {
            startDate: {
                gte: new Date()
            }
        },
        take: 5,
        orderBy: {
            startDate: "asc"
        },
        include: {
            user: true
        }
    });
};


export const getRecentRequests = async () => {
    return await prisma.request.findMany({
        take: 5,
        orderBy: {
            createdAt: "desc"
        },
        include: {
            user: true
        }
    });
};


export const getRecentMessages = async () => {
    return await prisma.message.findMany({
        take: 5,
        orderBy: {
            createdAt: "desc"
        },
        include: {
            sender: true
        }
    });
};