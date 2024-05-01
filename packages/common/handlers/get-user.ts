"use server";

import { SKSUser } from "@sks/database";
import { prismaCommonClient } from "../helpers";

export async function getUser({ id }: Partial<Omit<SKSUser, "name">>) {
  if (!id) {
    return {
      status: 400,
      body: {
        message: "No ID provided",
      },
    };
  }
  try {
    const getUserResult = await prismaCommonClient.sKSUser.findUniqueOrThrow({
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
