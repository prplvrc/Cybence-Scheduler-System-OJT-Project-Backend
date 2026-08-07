import { PrismaClient } from "@prisma/client";

// Ensure Prisma initializes cleanly
const prisma = new PrismaClient();

export default prisma;