import { ClientsItem, NewClientForm, glassBoxClassName } from "@/components";
import { ClientWithActions } from "@/types/enhanced-client";
import { Box, Grid, Title } from "@mantine/core";
import dayjs from "dayjs";

export const ClientsList = ({
  clients,
  userId,
}: {
  clients: ClientWithActions[];
  userId: string;
}) => {
  const activeClients = clients.filter(
    (client) =>
      !!client.lastActive &&
      dayjs().diff(dayjs(client.lastActive), "minute") < 5
  );
  const inactiveClients = clients.filter(
    (client) =>
      !client.lastActive ||
      dayjs().diff(dayjs(client.lastActive), "minute") >= 5
  );

  return (
    <Box mt="30px">
      <Title>Active clients</Title>
      <Grid
        columns={12}
        mt={10}
        gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}
        align="stretch"
        justify="stretch"
        className={glassBoxClassName}
      >
        <NewClientForm userId={userId} />
        {activeClients.map((client, clientIndex) => (
          <ClientsItem
            key={`client-${client.id}`}
            client={client}
            clientIndex={clientIndex}
            userId={userId}
          />
        ))}
      </Grid>
      {inactiveClients.length !== 0 && (
        <>
          <Title mt="30px">Inactive clients</Title>
          <Grid
            columns={12}
            mt={10}
            gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}
            align="stretch"
            justify="stretch"
            className={glassBoxClassName}
          >
            {inactiveClients.map((client, clientIndex) => (
              <ClientsItem
                key={`client-${client.id}`}
                client={client}
                clientIndex={clientIndex}
                userId={userId}
              />
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};
