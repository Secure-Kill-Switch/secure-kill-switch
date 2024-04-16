"use client";
import { Box, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { SKSClient } from "@prisma/client";
import { PropsWithChildren } from "react";

export const ClientsItemDetailsModal = ({
  client,
  children,
}: PropsWithChildren<{ client: SKSClient }>) => {
  const [
    clientModalOpened,
    { open: openClientModal, close: closeClientModal },
  ] = useDisclosure(false);

  return (
    <>
      <Box onClick={openClientModal}>{children}</Box>
      <Modal
        centered
        size="auto"
        opened={clientModalOpened}
        onClose={closeClientModal}
        title={client.name}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        elo
      </Modal>
    </>
  );
};
