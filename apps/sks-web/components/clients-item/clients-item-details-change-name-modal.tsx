"use client";
import { Modal, Text } from "@mantine/core";
import { SKSClient } from "@prisma/client";
import { PropsWithChildren } from "react";

export const ClientsItemDetailsChangeNameModal = ({
  client,
  userId: _userId,
  clientChangeNameModalOpened,
  closeClientChangeNameModal,
}: PropsWithChildren<{
  client: SKSClient;
  userId: string;
  clientChangeNameModalOpened: boolean;
  closeClientChangeNameModal: () => void;
}>) => {
  return (
    <Modal
      centered
      size="auto"
      opened={clientChangeNameModalOpened}
      onClose={closeClientChangeNameModal}
      title={
        <Text ff="heading" size="25px">
          Changing name: {client.name}
        </Text>
      }
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      yo
    </Modal>
  );
};
