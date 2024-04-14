"use client";

import { shortenId } from "@/helpers/shorten-id";
import { CopyButton, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCopy } from "@tabler/icons-react";

export const ClientIdCopyButton = ({ clientId }: { clientId: string }) => {
  return (
    <CopyButton value={clientId}>
      {({ copied, copy }) => (
        <Text
          style={{
            cursor: "pointer",
          }}
          size="sm"
          ml={5}
          c={copied ? "teal" : "gray"}
          onClick={() => {
            notifications.show({
              title: "Client ID copied",
              message:
                "Client ID copied to clipboard, you can now paste it in the desktop app",
              color: "teal",
            });
            copy();
          }}
        >
          {shortenId(clientId)}
          <IconCopy
            style={{
              display: "inline",
              marginLeft: 5,
            }}
            size={14}
            stroke={1.5}
          />
        </Text>
      )}
    </CopyButton>
  );
};
