"use server";
import { SKSPossibleActions } from "@prisma/client";
import { Optional } from "@prisma/client/runtime/library";
import { prisma } from "../helpers/database";
import { ClientWithActions } from "../types";

export async function showNotificationClient({
  id,
  notificationText,
}: Optional<Omit<ClientWithActions, "name">> & { notificationText: string }) {
  if (!id || !notificationText) {
    return {
      status: 400,
      body: {
        message: "No client ID or notification text provided",
      },
    };
  }
  const checkClientExistence = await prisma.sKSClient.findUnique({
    where: {
      id,
    },
  });
  if (!checkClientExistence) {
    return {
      status: 404,
      body: {
        message: "Client not found",
      },
    };
  }
  try {
    const showNotificationCall = await prisma.sKSAction.create({
      data: {
        action: SKSPossibleActions.NOTIFICATION,
        notificationText,
        sKSClientId: id,
      },
    });
    return {
      status: 200,
      body: {
        data: showNotificationCall,
      },
    };
  } catch (error) {
    return {
      status: 500,
      body: {
        message: "Error creating a notification action",
        error: JSON.stringify(error),
      },
    };
  }
}
