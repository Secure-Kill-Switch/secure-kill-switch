"use server";
import { prisma } from "@/helpers/prisma";
import { SKSUser } from "@prisma/client";
import { Optional } from "@prisma/client/runtime/library";

export async function getClients({ id }: Optional<Omit<SKSUser, "name">>) {
  if (!id) {
    return {
      status: 400,
      body: {
        message: "No user ID provided",
      },
    };
  }
  try {
    const getUserResult = await prisma.sKSClient.findMany({
      where: {
        userId: id,
      },
    });
    return {
      status: 200,
      body: {
        data: getUserResult,
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
