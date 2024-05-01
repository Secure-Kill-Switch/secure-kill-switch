"use server";
import { SKSUser } from "@sks/database";
import { uniqueNamesGenerator } from "unique-names-generator";
import { nameGeneratorOptions, prismaCommonClient } from "../helpers";

export async function createUser({ name: definedName }: Omit<SKSUser, "id">) {
  try {
    const name = definedName || uniqueNamesGenerator(nameGeneratorOptions());
    const createUser = await prismaCommonClient.sKSUser.create({
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
