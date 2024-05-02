import { prismaCommonClient } from "../helpers";

export async function getStats() {
  const usersCount = await prismaCommonClient.sKSUser.count();
  const clientsCount = await prismaCommonClient.sKSClient.count();
  const actionsCount = await prismaCommonClient.sKSAction.count();
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
