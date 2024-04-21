"use server";
import { Optional } from "@prisma/client/runtime/library";
import { prisma } from "@sks/database";
import { SKSUser } from "@sks/database/generated/prisma-client";

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
    const getUserResult = await prisma.sKSUser.findUniqueOrThrow({
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
        error: JSON.stringify(error),
      },
    };
  }
}
