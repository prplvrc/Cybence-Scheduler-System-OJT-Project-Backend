import prisma from "../config/prisma.js";

// Keep your existing getDashboardStats, getRecentTasks, etc.

export const getWeeklyActivity = async () => {
    // Get date 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const tasks = await prisma.task.findMany({
        where: {
            createdAt: { gte: sevenDaysAgo }
        },
        select: {
            createdAt: true,
            status: true
        }
    });

    const daysMap = { 0: "Sun", 1: "Mon", 2: "Tue", 3: "Wed", 4: "Thu", 5: "Fri", 6: "Sat" };
    const activity = { Mon: { completed: 0, ongoing: 0, created: 0 }, Tue: { completed: 0, ongoing: 0, created: 0 }, Wed: { completed: 0, ongoing: 0, created: 0 }, Thu: { completed: 0, ongoing: 0, created: 0 }, Fri: { completed: 0, ongoing: 0, created: 0 }, Sat: { completed: 0, ongoing: 0, created: 0 }, Sun: { completed: 0, ongoing: 0, created: 0 } };

    tasks.forEach(task => {
        const dayName = daysMap[new Date(task.createdAt).getDay()];
        if (activity[dayName]) {
            activity[dayName].created += 1;
            if (task.status === "Completed") activity[dayName].completed += 1;
            if (task.status === "Ongoing") activity[dayName].ongoing += 1;
        }
    });

    return Object.keys(activity).map(day => ({ day, ...activity[day] }));
};

export const getTeamOverview = async () => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            role: true,
            assignedTasks: { // Adjust relation name if needed (e.g. tasks)
                select: { status: true }
            }
        }
    });

    return users.map(user => {
        const total = user.assignedTasks.length;
        const completed = user.assignedTasks.filter(t => t.status === "Completed").length;
        const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

        return {
            name: user.name,
            role: user.role || "Member",
            progress: `${progressPercent}%`
        };
    });
};