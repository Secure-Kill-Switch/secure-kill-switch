import { ClientActions } from "@/components/client-actions";
import { ClientIdCopyButton } from "@/components/client-id-copy-button";
import { timeAgo } from "@/helpers/time-ago";
import { Box, GridCol, Indicator, Text } from "@mantine/core";
import { SKSClient } from "@prisma/client";
import dayjs from "dayjs";

export const ClientsItem = ({
  client,
  clientIndex,
  userId,
}: {
  client: SKSClient;
  clientIndex: number;
  userId: string;
}) => {
  const isActive =
    !!client.lastActive && dayjs().diff(dayjs(client.lastActive), "minute") < 5;

  return (
    <GridCol
      key={client.id}
      span={4}
      style={{
        animation: `fadeIn 0.5s ease ${(clientIndex / 2) * 0.1}s 1 normal both`,
      }}
    >
      <Indicator
        color="green"
        size={16}
        disabled={!isActive}
        processing={isActive}
        withBorder
      >
        <Box
          p={10}
          pos="relative"
          style={{
            border: "1px solid",
            borderColor: "lightgray",
            borderRadius: "4px",
          }}
        >
          <Box>
            <Text mb={10} opacity={client.name ? 1 : 0.5} size="xl">
              {client.name || "Unnamed"}
            </Text>
            <ClientIdCopyButton clientId={client.id} />
            <Text size="sm" mt="10px">
              {timeAgo(client.lastActive)}
            </Text>
          </Box>
          <ClientActions
            userId={userId}
            clientId={client.id}
            clientName={client.name}
          />
        </Box>
      </Indicator>
    </GridCol>
  );
};
