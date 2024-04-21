"use client";

import { shortenId } from "@/helpers";
import { CopyButton, Flex, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCopy } from "@tabler/icons-react";

export const ClientIdCopyButton = ({ clientId }: { clientId: string }) => {
  return (
    <CopyButton value={clientId}>
      {({ copy }) => (
        <Flex
          style={{
            cursor: "pointer",
          }}
          onClick={() => {
            notifications.show({
              title: "Client ID copied",
              message:
                "Client ID copied to clipboard, you can now paste it in the desktop app",
              color: "teal",
            });
            copy();
          }}
          align="center"
        >
          <Text size="sm">{shortenId(clientId)}</Text>
          <IconCopy
            style={{
              display: "inline",
              marginLeft: 5,
            }}
            size={14}
            stroke={1.5}
          />
        </Flex>
      )}
    </CopyButton>
  );
};
