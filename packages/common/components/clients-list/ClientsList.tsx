import { Box, Flex, Grid, Title } from "@mantine/core";
import { ClientDetails, NewClientForm } from "../../components";
import { ClientWithActions } from "../../types";

export const ClientsList = ({
  clients,
  userId,
}: {
  clients: ClientWithActions[];
  userId: string;
}) => {
  return (
    <Box mt="30px">
      <Flex align="center" justify="space-between">
        <Title>Clients list</Title>
        <NewClientForm userId={userId} />
      </Flex>
      <Grid
        columns={12}
        mt={10}
        gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}
        align="stretch"
        justify="stretch"
      >
        {clients.map((client, clientIndex) => (
          <ClientDetails
            key={`client-${client.id}`}
            client={client}
            clientIndex={clientIndex}
            userId={userId}
          />
        ))}
      </Grid>
    </Box>
  );
};
