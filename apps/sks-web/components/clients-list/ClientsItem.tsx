import { ClientsItemDetailsMainModalWrapper } from "@/components";
import { ClientIcon } from "@/components/ClientIcon";
import { FontHeader } from "@/helpers/fonts";
import { timeAgo } from "@/helpers/time-ago";
import { ClientWithActions } from "@/types/enhanced-client";
import { Box, Flex, GridCol, Text } from "@mantine/core";
import dayjs from "dayjs";

export const ClientsItem = ({
  client,
  clientIndex,
  userId,
}: {
  client: ClientWithActions;
  clientIndex: number;
  userId: string;
}) => {
  const isActive =
    !!client.lastActive && dayjs().diff(dayjs(client.lastActive), "minute") < 5;

  return (
    <>
      <GridCol
        span={{
          base: 6,
          lg: 4,
        }}
        style={{
          animation: `fadeIn 0.5s ease ${(clientIndex / 2) * 0.1}s 1 normal both`,
        }}
      >
        <Box pos="relative">
          <ClientsItemDetailsMainModalWrapper client={client} userId={userId}>
            <Box
              p={10}
              h="100%"
              style={{
                cursor: "pointer",
              }}
            >
              <Flex
                justify="space-between"
                direction="column"
                align="center"
                h="100%"
                pl="70px"
              >
                <ClientIcon
                  icon={client.icon}
                  iconProps={{
                    size: "70px",
                    strokeWidth: 1,
                    color: isActive ? "teal" : "gray",
                    opacity: isActive ? 1 : 0.2,
                  }}
                />
                <Text
                  mb="5px"
                  opacity={client.name ? 1 : 0.5}
                  size="xl"
                  lh="sm"
                  className={FontHeader.className}
                >
                  {client.name || "Unnamed"}
                </Text>
                <Box>
                  <Text size="sm">{timeAgo(client.lastActive)}</Text>
                </Box>
              </Flex>
            </Box>
          </ClientsItemDetailsMainModalWrapper>
        </Box>
      </GridCol>
    </>
  );
};
