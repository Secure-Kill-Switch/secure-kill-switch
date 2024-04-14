"use client";

import { Button, CopyButton, Flex } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCopy, IconEdit, IconX } from "@tabler/icons-react";

export const ClientActions = ({ clientId }: { clientId: string }) => {
  return (
    <Flex justify="space-between" direction="column">
      <CopyButton value={clientId}>
        {({ copied, copy }) => (
          <Button
            size="xs"
            color={copied ? "teal" : "blue"}
            onClick={() => {
              notifications.show({
                title: "Client ID copied",
                message:
                  "Client ID copied to clipboard, you can now paste it in the desktop app",
                color: "teal",
              });
              copy();
            }}
            leftSection={<IconCopy size={14} stroke={1.5} />}
            mb={5}
          >
            Copy ID
          </Button>
        )}
      </CopyButton>
      <Button
        size="xs"
        mb={5}
        leftSection={<IconEdit size={14} stroke={1.5} />}
      >
        Edit
      </Button>
      <Button
        size="xs"
        mb={5}
        color="red"
        leftSection={<IconX size={14} stroke={1.5} />}
      >
        Remove
      </Button>
    </Flex>
  );
};
