"use server";
import { prisma } from "@/helpers/prisma";
import { SKSUser } from "@prisma/client";
import { Optional } from "@prisma/client/runtime/library";

export async function getUser({ id }: Optional<Omit<SKSUser, "name">>) {
  if (!id) {
    return {
      status: 400,
      body: {
        message: "No ID provided",
      },
    };
  }
  try {
    const getUserResult = await prisma.sKSUser.findUnique({
      where: {
        id,
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
        error: error,
      },
    };
  }
}
