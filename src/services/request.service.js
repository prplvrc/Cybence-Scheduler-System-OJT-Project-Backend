import prisma from "../config/prisma.js";

export const createRequest = async (requestData) => {
    return await prisma.request.create({
        data: {
            title: requestData.title,
            description: requestData.description,
            type: requestData.type,
            status: requestData.status || "Pending",
            requestedBy: Number(requestData.requestedBy)
        },
        include: {
            user: {
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


export const getAllRequests = async () => {
    return await prisma.request.findMany({
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


export const getRequestById = async (id) => {
    return await prisma.request.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            user: {
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


export const updateRequest = async (id, requestData) => {
    return await prisma.request.update({
        where: {
            id: Number(id)
        },
        data: {
            title: requestData.title,
            description: requestData.description,
            type: requestData.type,
            status: requestData.status
        },
        include: {
            user: {
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


export const deleteRequest = async (id) => {
    return await prisma.request.delete({
        where: {
            id: Number(id)
        }
    });
};


export const approveRequest = async (id) => {
    return await prisma.request.update({
        where: {
            id: Number(id)
        },
        data: {
            status: "Approved"
        }
    });
};


export const rejectRequest = async (id) => {
    return await prisma.request.update({
        where: {
            id: Number(id)
        },
        data: {
            status: "Rejected"
        }
    });
};