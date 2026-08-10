import prisma from "../config/prisma.js";

export const createEvent = async (eventData, createdBy) => {
    return await prisma.calendarEvent.create({
        data: {
            title: eventData.title,
            description: eventData.description,
            startDate: new Date(eventData.startDate),
            endDate: new Date(eventData.endDate),
            createdBy: Number(createdBy)
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    });
};

export const getAllEvents = async (userId) => {

    return await prisma.calendarEvent.findMany({

        where: {
            createdBy: Number(userId)
        },

        include: {

            user: {

                select: {

                    id: true,

                    name: true,

                    email: true

                }

            }

        },

        orderBy: {

            startDate: "asc"

        }

    });

};

export const getEventById = async (id) => {
    return await prisma.calendarEvent.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    });
};

export const updateEvent = async (id, eventData) => {
    return await prisma.calendarEvent.update({
        where: {
            id: Number(id)
        },
        data: {
            ...eventData,
            createdBy: eventData.createdBy
                ? Number(eventData.createdBy)
                : undefined,
            startDate: eventData.startDate
                ? new Date(eventData.startDate)
                : undefined,
            endDate: eventData.endDate
                ? new Date(eventData.endDate)
                : undefined
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    });
};

export const deleteEvent = async (id) => {
    return await prisma.calendarEvent.delete({
        where: {
            id: Number(id)
        }
    });
};