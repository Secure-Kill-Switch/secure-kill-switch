"use client";
import { revalidateCachePath } from "@sks/common/handlers";
import { ReactNode, useEffect } from "react";

export default function UserPage({
  params,
}: {
  params: { userId: string };
}): ReactNode {
  useEffect(() => {
    const refreshUserDataInterval = setInterval(() => {
      revalidateCachePath(`/user/${params.userId}`);
    }, 10000);
    return () => {
      clearInterval(refreshUserDataInterval);
    };
  });
  return null;
}
