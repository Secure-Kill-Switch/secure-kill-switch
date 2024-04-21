"use client";
import {
  ClientsItemDetailsMainModal,
  ClientsItemDetailsRenameModal,
  ClientsItemDetailsShowNotificationModal,
} from "@/components";
import { ClientWithActions } from "@/types/enhanced-client";
import { Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { PropsWithChildren } from "react";

export const ClientsItemDetailsMainModalWrapper = ({
  client,
  children,
  userId,
}: PropsWithChildren<{ client: ClientWithActions; userId: string }>) => {
  const [
    clientModalOpened,
    { open: openClientModal, close: closeClientModal },
  ] = useDisclosure(false);
  const [
    clientRenameModalOpened,
    { open: openClientRenameModal, close: closeClientRenameModal },
  ] = useDisclosure(false);
  const [
    clientShowNotificationModalOpened,
    {
      open: openClientNotificationModal,
      close: closeClientShowNotificationModal,
    },
  ] = useDisclosure(false);

  return (
    <>
      <Box onClick={openClientModal}>{children}</Box>
      <ClientsItemDetailsRenameModal
        client={client}
        clientRenameModalOpened={clientRenameModalOpened}
        closeClientRenameModal={closeClientRenameModal}
        userId={userId}
      />
      <ClientsItemDetailsShowNotificationModal
        client={client}
        clientShowNotificationModalOpened={clientShowNotificationModalOpened}
        closeClientShowNotificationModal={closeClientShowNotificationModal}
        userId={userId}
      />
      <ClientsItemDetailsMainModal
        client={client}
        clientModalOpened={clientModalOpened}
        closeClientModal={closeClientModal}
        userId={userId}
        openClientRenameModal={openClientRenameModal}
        openClientNotificationModal={openClientNotificationModal}
      />
    </>
  );
};
