"use client";

import { removeClient } from "@/handlers/remove-client";
import { revalidateCachePath } from "@/handlers/revalidate-path";
import { shortenId } from "@/helpers/shorten-id";
import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuLabel,
  MenuTarget,
  Modal,
  Text,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconEdit, IconMenu, IconX } from "@tabler/icons-react";
import { useState } from "react";

export const ClientActions = ({
  userId,
  clientId,
  clientName,
}: {
  userId: string;
  clientId: string;
  clientName: string | null;
}) => {
  const [removingClient, setRemovingClient] = useState(false);
  const [
    removeModalOpened,
    { open: openRemoveModal, close: closeRemoveModal },
  ] = useDisclosure(false);
  const removeClientAction = async () => {
    setRemovingClient(true);
    const removeClientCall = await removeClient({ userId, id: clientId });
    if (removeClientCall.status !== 200) {
      notifications.show({
        title: "Error removing client",
        message: removeClientCall.body.message,
        color: "red",
      });
      setRemovingClient(false);
      return;
    }
    notifications.show({
      title: "Client removed",
      message: clientName
        ? `Client ${shortenId(clientId)} created with name ${clientName}`
        : `Client ${shortenId(clientId)} created`,
      color: "teal",
    });
    revalidateCachePath(`/user/${userId}`);
    setRemovingClient(false);
    closeRemoveModal();
  };
  return (
    <>
      <Menu shadow="md" width={200}>
        <MenuTarget>
          <ActionIcon pos="absolute" top="10px" right="10px">
            <IconMenu style={{ width: rem(14), height: rem(14) }} />
          </ActionIcon>
        </MenuTarget>

        <MenuDropdown>
          <MenuLabel>Actions</MenuLabel>
          <MenuItem
            leftSection={
              <IconEdit style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Edit client name
          </MenuItem>
          <MenuItem
            c="red"
            leftSection={<IconX style={{ width: rem(14), height: rem(14) }} />}
            onClick={openRemoveModal}
          >
            Remove client
          </MenuItem>
        </MenuDropdown>
      </Menu>

      <Modal
        centered
        size="auto"
        opened={removeModalOpened}
        onClose={closeRemoveModal}
        title="Are you sure?"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Text size="sm" m="10px" style={{ textAlign: "center" }}>
          You are about to remove client
        </Text>

        <Box
          bg="rgba(200, 200, 200, 0.2)"
          p="10px"
          mb="20px"
          style={{ borderRadius: "4px" }}
        >
          <Text size="sm">
            <Text span fw="bold">
              ID:
            </Text>
            <Text span ml="5px">
              {clientId}
            </Text>
          </Text>
          {clientName && (
            <Text size="sm">
              <Text span fw="bold">
                Name:
              </Text>
              <Text span ml="5px">
                {clientName}
              </Text>
            </Text>
          )}
        </Box>
        <Flex direction="row" justify="space-evenly">
          <Button
            w="100%"
            bg="red"
            mr="20px"
            onClick={removeClientAction}
            loading={removingClient}
          >
            I am sure!
          </Button>
          <Button w="100%" bg="gray" onClick={closeRemoveModal}>
            Go back
          </Button>
        </Flex>
      </Modal>
    </>
  );
};
