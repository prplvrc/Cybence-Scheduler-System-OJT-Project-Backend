import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllRequests = async () => {
  return await prisma.request.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getRequestById = async (id) => {
  return await prisma.request.findUnique({
    where: { id: Number(id) },
    include: {
      user: true,
    },
  });
};

export const createRequest = async (data) => {
  return await prisma.request.create({
    data: {
      title: data.title,
      description: data.description,
      type: data.type,
      status: data.status || "Pending",
      requestedBy: Number(data.requestedBy),
    },
  });
};

export const updateRequest = async (id, data) => {
  return await prisma.request.update({
    where: { id: Number(id) },
    data,
  });
};

export const deleteRequest = async (id) => {
  return await prisma.request.delete({
    where: { id: Number(id) },
  });
};

export const updateStatus = async (id, status) => {
  return await prisma.request.update({
    where: { id: Number(id) },
    data: { status },
  });
};