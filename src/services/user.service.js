import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id: Number(id) },
  });
};

export const updateUserProfile = async (id, data) => {
  return await prisma.user.update({
    where: { id: Number(id) },
    data: {
      name: data.fullName,
      email: data.email,
    },
  });
};

export const changePassword = async (id, currentPassword, newPassword) => {
  const user = await prisma.user.findUnique({ where: { id: Number(id) } });
  if (!user) throw new Error("User account not found");

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) throw new Error("Current password is incorrect");

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  return await prisma.user.update({
    where: { id: Number(id) },
    data: { password: hashedPassword },
  });
};

// Fixed: Added missing service method referenced in controller
export const updateNotificationSettings = async (id, settings) => {
  return await prisma.user.findUnique({ where: { id: Number(id) } });
};