"use server";
import { prisma } from "@sks/database";

export async function getStats() {
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
}

export type StatsType = Awaited<ReturnType<typeof getStats>>;
