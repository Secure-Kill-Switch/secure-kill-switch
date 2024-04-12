"use server";
import { prisma } from "@/helpers/prisma";
import { SKSClient } from "@prisma/client";

export async function createClient({ name, userId }: Omit<SKSClient, "id">) {
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
    const createClientCall = await prisma.sKSClient.create({
      data: {
        name,
        userId,
      },
    });
    return {
      status: 200,
      body: {
        message: "Client created",
        data: createClientCall,
      },
    };
  } catch (error) {
    return {
      status: 500,
      body: {
        message: "Error creating client",
        error: JSON.stringify(error),
      },
    };
  }
}
