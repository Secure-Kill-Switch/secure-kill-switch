import { ClientActions } from "@/components/client-actions";
import { ClientIdCopyButton } from "@/components/client-id-copy-button";
import { timeAgo } from "@/helpers/time-ago";
import { Box, Flex, Grid, GridCol, Text, Title } from "@mantine/core";
import { SKSClient } from "@prisma/client";

export const ClientsList = ({
  clients,
  userId,
}: {
  clients: SKSClient[];
  userId: string;
}) => {
  return (
    <Box mt="30px">
      <Title>Clients List</Title>
      {clients.length === 0 && <Box mt="20px">No clients found</Box>}
      <Grid
        columns={12}
        mt={30}
        gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}
      >
        {clients.map((client, clientIndex) => (
          <GridCol
            key={client.id}
            span={4}
            style={{
              animation: `fadeIn 0.5s ease ${(clientIndex / 2) * 0.1}s 1 normal both`,
            }}
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
                <Flex direction="row" mb="5px">
                  <Text size="sm" fw="bold">
                    Client ID:
                  </Text>
                  <ClientIdCopyButton clientId={client.id} />
                </Flex>
                <Flex direction="row" mb="5px">
                  <Text size="sm" fw="bold">
                    Last active:
                  </Text>
                  <Text size="sm" ml="5px">
                    {timeAgo(client.lastActive)}
                  </Text>
                </Flex>
              </Box>
              <ClientActions
                userId={userId}
                clientId={client.id}
                clientName={client.name}
              />
            </Box>
          </GridCol>
        ))}
      </Grid>
    </Box>
  );
};
