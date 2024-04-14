import { ClientsList } from "@/components/clients-list";
import { getClients } from "@/handlers/get-clients";
import { getUser } from "@/handlers/get-user";
import { FontBody, FontHeader } from "@/helpers/fonts";
import { Grid, GridCol, RingProgress, Text, Title } from "@mantine/core";
import { SKSClient, SKSUser } from "@prisma/client";
import { ReactNode } from "react";

const maxClients = 20;

export default async function UserPageLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { userId: string };
}): Promise<{}> {
  const userDataCall = await getUser({ id: params.userId });
  const clientsDataCall = await getClients({ id: params.userId });
  const gotUserData = userDataCall.status === 200;
  const gotClientsData = clientsDataCall.status === 200;
  const userData = gotUserData
    ? (userDataCall.body.data as SKSUser)
    : undefined;
  const clientsData = gotClientsData
    ? (clientsDataCall.body.data as SKSClient[])
    : undefined;
  if (!gotUserData) {
    return <Text className={FontHeader.className}>Error finding user</Text>;
  }
  const getClientUsageData = (clients: typeof clientsData) => {
    // max is 20
    if (!clients) return [];
    const totalClients = clients.length;
    const usage = (totalClients / maxClients) * 100;
    const usageColor = usage > 80 ? "red" : "green";
    return [
      { value: usage, color: usageColor },
      { value: 100 - usage, color: "rgba(150, 150, 150, 0.2)" },
    ];
  };
  return (
    <>
      <Grid columns={24} align="center">
        <GridCol span={18}>
          <Title className={FontHeader.className} mb="15px">
            Welcome{userData?.name ? ` ${userData.name}` : ""}
          </Title>
          <Text className={FontBody.className}>ID: {userData?.id}</Text>
        </GridCol>
        <GridCol span={6}>
          <RingProgress
            label={
              <Text size="xs" ta="center">
                Clients usage
                <br />
                <small>(max {maxClients})</small>
              </Text>
            }
            size={140}
            sections={getClientUsageData(clientsData)}
          />
        </GridCol>
      </Grid>
      {children}
      {clientsData && <ClientsList clients={clientsData} />}
    </>
  );
}
