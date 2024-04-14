"use client";
import { NewClientForm } from "@/components/new-client-form";
import { revalidateCachePath } from "@/handlers/revalidate-path";
import { shortenId } from "@/helpers/shorten-id";
import { notifications } from "@mantine/notifications";
import { SKSClient } from "@prisma/client";
import { ReactNode } from "react";

export default function UserPage({
  params,
}: {
  params: { userId: string };
}): ReactNode {
  const onClientCreated = (client: SKSClient) => {
    console.log("Client created", client);
    notifications.show({
      title: "Client created",
      message: client.name
        ? `Client ${shortenId(client.id)} created with name ${client.name}`
        : `Client ${shortenId(client.id)} created`,
      color: "teal",
    });
    revalidateCachePath(`/user/${params.userId}`);
  };
  return (
    <NewClientForm onClientCreated={onClientCreated} userId={params.userId} />
  );
}
