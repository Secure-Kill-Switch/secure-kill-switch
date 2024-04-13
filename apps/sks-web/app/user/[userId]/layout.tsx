import {
  Container,
  Grid,
  GridCol,
  RingProgress,
  Text,
  Title,
} from "@mantine/core";
import { SKSClient, SKSUser } from "@prisma/client";
import { FontBody, FontHeader } from "@/helpers/fonts";
import { getUser } from "@/handlers/get-user";
import { ReactNode } from "react";
import { getClients } from "@/handlers/get-clients";
import { ClientsList } from "@/components/clients-list";

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
    // should return value as such: value: 40, color: "cyan"
    console.log("usage", usage);
    return [
      { value: usage, color: "red" },
      { value: 100 - usage, color: "green" },
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
                (max {maxClients})
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
