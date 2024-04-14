import { ClientActions } from "@/components/client-actions";
import { shortenId } from "@/helpers/shorten-id";
import { Box, Flex, Grid, GridCol, Text, Title } from "@mantine/core";
import { SKSClient } from "@prisma/client";

export const ClientsList = ({ clients }: { clients: SKSClient[] }) => {
  return (
    <Box mt="30px">
      <Title>Clients List</Title>
      {clients.length === 0 && <Box mt="20px">No clients found</Box>}
      <Grid
        columns={8}
        mt={30}
        gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}
      >
        {clients.map((client) => (
          <GridCol key={client.id} span={4}>
            <Box
              p={10}
              style={{
                border: "1px solid",
                borderColor: "lightgray",
                borderRadius: "4px",
              }}
            >
              <Flex direction="row" justify="space-between">
                <Box>
                  <Text mb={10} opacity={client.name ? 1 : 0.5} size="xl">
                    {client.name || "Unnamed"}
                  </Text>
                  <Text
                    size="sm"
                    mb={5}
                    style={{
                      textOverflow: "ellipsis",
                      wordBreak: "keep-all",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    <b>Client ID: </b>
                    {shortenId(client.id)}
                  </Text>
                  <Text size="sm" mb={5}>
                    <b>Last active: </b>????
                  </Text>
                </Box>
                <ClientActions clientId={client.id} />
              </Flex>
            </Box>
          </GridCol>
        ))}
      </Grid>
    </Box>
  );
};
