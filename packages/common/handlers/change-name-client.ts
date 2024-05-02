"use server";

import { prismaCommonClient } from "../helpers";
import { ClientWithActions } from "../types";

export async function renameClient({
  id,
  userId,
  newName,
}: Omit<ClientWithActions, "name" | "lastActive" | "icon" | "actions"> & {
  newName: string;
}) {
  if (!id || !newName || !userId) {
    return {
      status: 400,
      body: {
        message: "No client ID or new name provided",
      },
    };
  }
  const checkUserExistence = await prismaCommonClient.sKSUser.findUnique({
    where: {
      id: userId,
    },
  });
  if (!checkUserExistence) {
    return {
      status: 404,
      body: {
        message: "User not found",
      },
    };
  }
  try {
    const setNewClientName = await prismaCommonClient.sKSClient.update({
      where: {
        id,
      },
      data: {
        name: newName,
      },
    });
    return {
      status: 200,
      body: {
        data: setNewClientName,
      },
    };
  } catch (error) {
    return {
      status: 500,
      body: {
        message: "Error finding client",
        error: JSON.stringify(error),
      },
    };
  }
}
