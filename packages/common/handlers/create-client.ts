"use server";

import { SKSClient } from "@sks/database";
import { uniqueNamesGenerator } from "unique-names-generator";
import { nameGeneratorOptions, prismaCommonClient } from "../helpers";

export async function createClient({
  name: definedName,
  userId,
  icon,
}: Omit<SKSClient, "id" | "lastActive">) {
  try {
    if (!userId) {
      return {
        status: 400,
        body: {
          message: "User id is required",
        },
      };
    }
    const user = await prismaCommonClient.sKSUser.findFirst({
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
    const name = definedName || uniqueNamesGenerator(nameGeneratorOptions());
    const createClientCall = await prismaCommonClient.sKSClient.create({
      data: {
        name,
        userId,
        icon,
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
