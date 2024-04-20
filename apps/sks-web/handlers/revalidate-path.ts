"use server";
import { revalidatePath } from "next/cache";

export const revalidateCachePath = async (path?: string) => {
  try {
    if (path) {
      revalidatePath(path);
    } else {
      revalidatePath("/");
    }
  } catch (error) {
    return {
      status: 500,
      body: {
        message: "Error revalidating cache",
        error: JSON.stringify(error),
      },
    };
  }
};
