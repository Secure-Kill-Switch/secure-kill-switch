import { Container, Text, Title } from "@mantine/core";
import { SKSClient, SKSUser } from "@prisma/client";
import { FontBody, FontHeader } from "@/helpers/fonts";
import { getUser } from "@/handlers/get-user";
import { ReactNode } from "react";
import { getClients } from "@/handlers/get-clients";
import { ClientsList } from "@/components/clients-list";

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
    return (
      <Container mt={20}>
        <Text className={FontHeader.className}>Error finding user</Text>
      </Container>
    );
  }
  return (
    <Container mt={20}>
      <Title className={FontHeader.className}>Welcome {userData?.name}</Title>
      <Text className={FontBody.className}>Your ID: {userData?.id}</Text>
      {children}
      {clientsData && <ClientsList clients={clientsData} />}
    </Container>
  );
}
