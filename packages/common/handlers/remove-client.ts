"use server";
import { prisma } from "@sks/common/helpers";
import { ClientWithActions } from "../types";

export async function removeClient({
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
    const user = await prisma.sKSUser.findFirst({
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
    const removeClientCall = await prisma.sKSClient.delete({
      where: {
        id,
      },
    });
    return {
      status: 200,
      body: {
        message: "Client removed",
        data: removeClientCall,
      },
    };
  } catch (error) {
    return {
      status: 500,
      body: {
        message: "Error removing client",
        error: JSON.stringify(error),
      },
    };
  }
}
