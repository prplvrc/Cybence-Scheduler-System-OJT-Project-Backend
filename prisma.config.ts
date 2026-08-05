import "dotenv/config";
import { defineConfig } from "prisma/config";

// 1. Assign the environment variable to a constant
const databaseUrl = process.env["DATABASE_URL"];

// 2. Validate that the variable exists
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined in your environment variables.");
}

// 3. Pass the validated string variable to Prisma
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: databaseUrl,
  },
});