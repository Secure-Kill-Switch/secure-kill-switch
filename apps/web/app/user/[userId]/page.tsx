"use client";
import { useInterval } from "@mantine/hooks";
import { revalidateCachePath } from "@sks/common/handlers";
import { ReactNode, useEffect } from "react";

export default function UserPage({
  params,
}: {
  params: { userId: string };
}): ReactNode {
  const refreshUserData = useInterval(() => {
    revalidateCachePath(`/user/${params.userId}`);
  }, 10000);
  useEffect(() => {
    refreshUserData.start();
    return () => {
      refreshUserData.stop();
    };
  });
  return null;
}
