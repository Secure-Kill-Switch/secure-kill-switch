"use server";
import { SKSPossibleActions } from "@sks/database";
import { prismaCommonClient } from "../helpers";
import { ClientWithActions } from "../types";

export async function shutdownClient({
  userId,
  id,
}: Pick<ClientWithActions, "userId" | "id">) {
  try {
    if (!userId) {
      return {
        status: 400,
        body: {
          message: "User id is required",
        },
      };
    }
    const user = await prismaCommonClient.sKSUser.findFirst({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return {
        status: 404,
        body: {
          message: "User not found",
        },
      };
    }
    const shutdownClientCall = await prismaCommonClient.sKSAction.create({
      data: {
        action: SKSPossibleActions.TURN_OFF,
        sKSClientId: id,
      },
    });
    return {
      status: 200,
      body: {
        message: "Client shut down",
        data: shutdownClientCall,
      },
    };
  } catch (error) {
    return {
      status: 500,
      body: {
        message: "Error shutting down client",
        error: JSON.stringify(error),
      },
    };
  }
}
