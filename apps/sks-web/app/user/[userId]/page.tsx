"use client";
import { NewClientForm } from "@/components/new-client-form";
import { revalidateCachePath } from "@/handlers/revalidate-path";
import { SKSClient } from "@prisma/client";
import { ReactNode } from "react";

export default function UserPage({
  params,
}: {
  params: { userId: string };
}): ReactNode {
  const onClientCreated = (client: SKSClient) => {
    console.log("Client created", client);
    revalidateCachePath(`/user/${params.userId}`);
  };
  return (
    <NewClientForm onClientCreated={onClientCreated} userId={params.userId} />
  );
}
