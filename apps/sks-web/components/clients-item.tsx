import { ClientActions } from "@/components/client-actions";
import { ClientIdCopyButton } from "@/components/client-id-copy-button";
import { clientIconsComponents } from "@/helpers/client-icons";
import { timeAgo } from "@/helpers/time-ago";
import { Box, Flex, GridCol, Indicator, Text } from "@mantine/core";
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

  const ClientIcon = clientIconsComponents[client.icon]
    ? clientIconsComponents[client.icon]
    : clientIconsComponents["laptop"];

  return (
    <GridCol
      key={`client-${client.id}`}
      span={{
        base: 6,
        lg: 4,
      }}
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
        h="100%"
      >
        <Box
          p={10}
          h="100%"
          style={{
            border: "1px solid",
            borderColor: "lightgray",
            borderRadius: "4px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Flex justify="space-between" direction="column" h="100%">
            <ClientIcon
              size="100px"
              strokeWidth={2}
              style={{
                position: "absolute",
                bottom: "50%",
                marginBottom: "-50px",
                right: "10px",
              }}
              opacity={0.1}
            />
            <Flex direction="row">
              <Text mb={10} mr="50px" opacity={client.name ? 1 : 0.5} size="xl">
                {client.name || "Unnamed"}
              </Text>
            </Flex>
            <Box>
              <ClientIdCopyButton clientId={client.id} />
              <Text size="sm" mt="10px">
                {timeAgo(client.lastActive)}
              </Text>
            </Box>
          </Flex>
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
