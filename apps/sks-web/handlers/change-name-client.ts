"use server";
import { prisma } from "@/helpers/prisma";
import { ClientWithActions } from "@/types/enhanced-client";
import { Optional } from "@prisma/client/runtime/library";

export async function renameClient({
  id,
  userId,
  newName,
}: Optional<Omit<ClientWithActions, "name">> & { newName: string }) {
  if (!id || !newName || !userId) {
    return {
      status: 400,
      body: {
        message: "No client ID or new name provided",
      },
    };
  }
  const checkUserExistence = await prisma.sKSUser.findUnique({
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
    const setNewClientName = await prisma.sKSClient.update({
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
