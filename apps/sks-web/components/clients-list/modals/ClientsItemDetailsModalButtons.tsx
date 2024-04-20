"use client";
import { removeClient } from "@/handlers/remove-client";
import { revalidateCachePath } from "@/handlers/revalidate-path";
import { shortenId } from "@/helpers/shorten-id";
import { ClientWithActions } from "@/types/enhanced-client";
import { Box, Button, Flex } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconBell,
  IconCursorText,
  IconEraser,
  IconPower,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

export const ClientsItemDetailsModalButtons = ({
  client,
  userId,
  openClientRenameModal,
  openClientNotificationModal,
}: {
  client: ClientWithActions;
  userId: string;
  openClientRenameModal: () => void;
  openClientNotificationModal: () => void;
}) => {
  const [hasToConfirmShutdown, setHasToConfirmShutdown] = useState(false);
  const [hasToConfirmRemoval, setHasToConfirmRemoval] = useState(false);
  const [removingClient, setRemovingClient] = useState(false);
  const removeClientAction = async () => {
    setRemovingClient(true);
    const removeClientCall = await removeClient({ userId, id: client.id });
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
      message: client.name
        ? `Client ${shortenId(client.id)} (${client.name}) removed`
        : `Client ${shortenId(client.id)} removed`,
      color: "teal",
    });
    revalidateCachePath(`/user/${userId}`);
    setRemovingClient(false);
  };
  useEffect(() => {
    if (hasToConfirmShutdown) {
      const timeout = setTimeout(() => {
        setHasToConfirmShutdown(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [hasToConfirmShutdown]);
  useEffect(() => {
    if (hasToConfirmRemoval) {
      const timeout = setTimeout(() => {
        setHasToConfirmRemoval(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [hasToConfirmRemoval]);

  return (
    <>
      <Flex justify="space-between">
        <Button
          leftSection={<IconCursorText size="18px" />}
          onClick={openClientRenameModal}
          w={{
            base: "100%",
            lg: "calc(50% - 5px)",
          }}
          mr="5px"
        >
          Change name
        </Button>
        <Button
          leftSection={<IconBell size="18px" />}
          onClick={openClientNotificationModal}
          w={{
            base: "100%",
            lg: "calc(50% - 5px)",
          }}
          ml="5px"
        >
          Show notification
        </Button>
      </Flex>
      <Flex justify="space-between" mt="10px">
        <Box
          w={{
            base: "100%",
            lg: "calc(50% - 5px)",
          }}
          pos="relative"
          mr="5px"
        >
          <Button
            leftSection={<IconPower size="18px" />}
            w="100%"
            onClick={() => setHasToConfirmShutdown(true)}
          >
            Shutdown
          </Button>
          <Button
            variant="gradient"
            gradient={{ from: "grape", to: "red", deg: 90 }}
            leftSection={<IconPower size="18px" />}
            w="100%"
            style={{
              pointerEvents: hasToConfirmShutdown ? "auto" : "none",
              transform: hasToConfirmShutdown
                ? "rotateX(0deg)"
                : "rotateX(90deg)",
              transition: "transform 0.3s",
            }}
            pos="absolute"
            top="0px"
            left="0px"
            onClick={() => console.log("Shutdown client")}
          >
            Click again to confirm
          </Button>
        </Box>
        <Box
          w={{
            base: "100%",
            lg: "calc(50% - 5px)",
          }}
          pos="relative"
          ml="5px"
        >
          <Button
            leftSection={<IconEraser size="18px" />}
            loading={removingClient}
            w="100%"
            onClick={() => setHasToConfirmRemoval(true)}
          >
            Remove
          </Button>
          <Button
            variant="gradient"
            gradient={{ from: "grape", to: "red", deg: 90 }}
            leftSection={<IconEraser size="18px" />}
            loading={removingClient}
            w="100%"
            style={{
              pointerEvents: hasToConfirmRemoval ? "auto" : "none",
              transform: hasToConfirmRemoval
                ? "rotateX(0deg)"
                : "rotateX(90deg)",
              transition: "transform 0.3s",
            }}
            pos="absolute"
            top="0px"
            left="0px"
            onClick={removeClientAction}
          >
            Click again to confirm
          </Button>
        </Box>
      </Flex>
    </>
  );
};
