"use server";
import { nameGeneratorOptions } from "@/helpers/name-generator-options";
import { prisma } from "@sks/database";
import { SKSClient } from "@sks/database/generated/prisma-client";
import { uniqueNamesGenerator } from "unique-names-generator";

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
    const name = definedName || uniqueNamesGenerator(nameGeneratorOptions());
    const createClientCall = await prisma.sKSClient.create({
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
