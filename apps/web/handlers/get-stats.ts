"use server";
import { prisma } from "@/helpers/prisma";

export async function getStats() {
  try {
    const usersCount = await prisma.sKSUser.count();
    const clientsCount = await prisma.sKSClient.count();
    const actionsCount = await prisma.sKSAction.count();
    return {
      status: 200,
      body: {
        usersCount,
        clientsCount,
        actionsCount,
      },
    };
  } catch (error) {
    return {
      status: 500,
      body: {
        message: "Error getting stats",
        error: JSON.stringify(error),
      },
    };
  }
}

export type StatsType = Awaited<ReturnType<typeof getStats>>;
