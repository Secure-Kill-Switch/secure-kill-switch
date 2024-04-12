"use server";
import { prisma } from "@/helpers/prisma";
import { SKSUser } from "@prisma/client";

export async function createUser({ name }: Omit<SKSUser, "id">) {
  try {
    const createUser = await prisma.sKSUser.create({
      data: {
        name,
      },
    });
    return {
      status: 200,
      body: {
        message: "User created",
        data: createUser,
      },
    };
  } catch (error) {
    return {
      status: 500,
      body: {
        message: "Error creating user",
        error: JSON.stringify(error),
      },
    };
  }
}
