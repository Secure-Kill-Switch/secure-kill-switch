"use server";
import { SKSUser } from "@sks/database";
import { prismaCommonClient } from "../helpers";
import { ClientWithActions } from "../types";

export async function getClients({ id }: Partial<Omit<SKSUser, "name">>) {
  if (!id) {
    return {
      status: 400,
      body: {
        message: "No user ID provided",
      },
    };
  }
  try {
    const getUserClientsCall = await prismaCommonClient.sKSClient.findMany({
      where: {
        userId: id,
      },
    });
    const getActions = getUserClientsCall.length
      ? await prismaCommonClient.sKSAction.findMany({
          where: {
            sKSClientId: {
              in: getUserClientsCall.map((client) => client.id),
            },
          },
        })
      : [];
    const clientsWithActions = getUserClientsCall.map((client) => {
      const actions = getActions
        .filter((action) => action.sKSClientId === client.id)
        .map(({ sKSClientId: _sKSClientId, ...action }) => action);
      return {
        ...client,
        actions,
      };
    });
    return {
      status: 200,
      body: {
        data: clientsWithActions as ClientWithActions[],
      },
    };
  } catch (error) {
    return {
      status: 500,
      body: {
        message: "Error finding user",
        error: JSON.stringify(error),
      },
    };
  }
}
