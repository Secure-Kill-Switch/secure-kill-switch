"use client";
import {
  ClientsItemDetailsChangeNameModal,
  ClientsItemDetailsMainModal,
} from "@/components";
import { Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { SKSClient } from "@prisma/client";
import { PropsWithChildren } from "react";

export const ClientsItemDetailsMainModalWrapper = ({
  client,
  children,
  userId,
}: PropsWithChildren<{ client: SKSClient; userId: string }>) => {
  const [
    clientModalOpened,
    { open: openClientModal, close: closeClientModal },
  ] = useDisclosure(false);
  const [
    clientChangeNameModalOpened,
    { open: openClientChangeNameModal, close: closeClientChangeNameModal },
  ] = useDisclosure(false);

  return (
    <>
      <Box onClick={openClientModal}>{children}</Box>
      <ClientsItemDetailsMainModal
        client={client}
        clientModalOpened={clientModalOpened}
        closeClientModal={closeClientModal}
        userId={userId}
        openClientChangeNameModal={openClientChangeNameModal}
      />
      <ClientsItemDetailsChangeNameModal
        client={client}
        clientChangeNameModalOpened={clientChangeNameModalOpened}
        closeClientChangeNameModal={closeClientChangeNameModal}
        userId={userId}
      />
    </>
  );
};
