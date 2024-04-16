"use client";
import { removeClient } from "@/handlers/remove-client";
import { revalidateCachePath } from "@/handlers/revalidate-path";
import { clientIconsComponents } from "@/helpers/client-icons";
import { shortenId } from "@/helpers/shorten-id";
import { timeAgo } from "@/helpers/time-ago";
import {
  Badge,
  Box,
  Button,
  CopyButton,
  Divider,
  Flex,
  Modal,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { SKSClient } from "@prisma/client";
import {
  IconBell,
  IconCopy,
  IconCursorText,
  IconEraser,
  IconPower,
} from "@tabler/icons-react";
import { PropsWithChildren, useEffect, useState } from "react";

export const ClientsItemDetailsModal = ({
  client,
  children,
  userId,
}: PropsWithChildren<{ client: SKSClient; userId: string }>) => {
  const [hasToConfirmShutdown, setHasToConfirmShutdown] = useState(false);
  const [hasToConfirmRemoval, setHasToConfirmRemoval] = useState(false);
  const [removingClient, setRemovingClient] = useState(false);
  const [
    clientModalOpened,
    { open: openClientModal, close: closeClientModal },
  ] = useDisclosure(false);
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

  const ClientIcon = clientIconsComponents[client.icon]
    ? clientIconsComponents[client.icon]
    : clientIconsComponents["laptop"];

  return (
    <>
      <Box onClick={openClientModal}>{children}</Box>
      <Modal
        centered
        size="auto"
        opened={clientModalOpened}
        onClose={closeClientModal}
        title={
          <Text ff="heading" size="25px">
            {client.name}
          </Text>
        }
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Flex
          direction={{
            base: "column",
            lg: "row",
          }}
          align="center"
        >
          <ClientIcon size="100px" />
          <Flex
            direction="column"
            maw="100%"
            mt={{
              base: "30px",
              lg: 0,
            }}
            ml={{
              base: 0,
              lg: "20px",
            }}
          >
            <CopyButton value={client.id}>
              {({ copied, copy }) => (
                <Badge
                  style={{
                    textTransform: "none",
                    cursor: "pointer",
                    userSelect: "none",
                    maxWidth: "100%",
                  }}
                  onClick={() => {
                    !copied &&
                      notifications.show({
                        title: "Client ID copied",
                        message: "Now you can paste it in the desktop app",
                        color: "teal",
                      });
                    !copied && copy();
                  }}
                  color={copied ? "teal" : undefined}
                  size="xl"
                  variant="light"
                  mb="10px"
                  rightSection={
                    <IconCopy size="16px" style={{ marginLeft: "5px" }} />
                  }
                >
                  {client.id}
                </Badge>
              )}
            </CopyButton>
            <Badge
              style={{
                textTransform: "none",
                userSelect: "none",
                maxWidth: "100%",
              }}
              w={{
                base: "100%",
                lg: "fit-content",
              }}
              size="xl"
              variant="light"
              title={`${client.lastActive?.toLocaleDateString()} ${client.lastActive?.toLocaleTimeString()}`}
            >
              {timeAgo(client.lastActive)}
            </Badge>
          </Flex>
        </Flex>
        <Divider mt="20px" mb="20px" />
        <Flex justify="space-between">
          <Button
            variant="gradient"
            gradient={{ from: "teal", to: "cyan", deg: 90 }}
            leftSection={<IconCursorText size="18px" />}
            disabled
            w={{
              base: "100%",
              lg: "calc(50% - 5px)",
            }}
          >
            Change client name
          </Button>
          <Button
            variant="gradient"
            gradient={{ from: "teal", to: "cyan", deg: 90 }}
            leftSection={<IconBell size="18px" />}
            disabled
            w={{
              base: "100%",
              lg: "calc(50% - 5px)",
            }}
          >
            Show notification
          </Button>
        </Flex>
        <Flex justify="space-between" mt="10px">
          <Button
            variant="gradient"
            gradient={
              !hasToConfirmShutdown
                ? { from: "teal", to: "cyan", deg: 90 }
                : { from: "grape", to: "red", deg: 90 }
            }
            leftSection={<IconPower size="18px" />}
            w={{
              base: "100%",
              lg: "calc(50% - 5px)",
            }}
            onClick={
              !hasToConfirmShutdown
                ? () => setHasToConfirmShutdown(true)
                : () => {
                    console.log("Shutdown client");
                  }
            }
          >
            {hasToConfirmShutdown
              ? "Click again to confirm"
              : "Shutdown client"}
          </Button>
          <Button
            variant="gradient"
            gradient={
              !hasToConfirmRemoval
                ? { from: "teal", to: "cyan", deg: 90 }
                : { from: "grape", to: "red", deg: 90 }
            }
            leftSection={<IconEraser size="18px" />}
            w={{
              base: "100%",
              lg: "calc(50% - 5px)",
            }}
            loading={removingClient}
            onClick={
              !hasToConfirmRemoval
                ? () => setHasToConfirmRemoval(true)
                : removeClientAction
            }
          >
            {hasToConfirmRemoval ? "Click again to confirm" : "Remove client"}
          </Button>
        </Flex>
      </Modal>
    </>
  );
};
