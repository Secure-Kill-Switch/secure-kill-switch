import { ClientsList } from "@/components";
import { getClients } from "@/handlers/get-clients";
import { getUser } from "@/handlers/get-user";
import { Text, Title } from "@mantine/core";
import { SKSUser } from "@prisma/client";
import { ReactNode } from "react";

export default async function UserPageLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { userId: string };
}): Promise<{}> {
  const { userId } = params;
  const userDataCall = await getUser({ id: userId });
  const clientsDataCall = await getClients({ id: userId });
  const gotUserData = userDataCall.status === 200;
  const gotClientsData = clientsDataCall.status === 200;
  const userData = gotUserData
    ? (userDataCall.body.data as SKSUser)
    : undefined;
  const clientsData = gotClientsData ? clientsDataCall.body.data : undefined;
  if (!gotUserData) {
    return <Text>Error finding user</Text>;
  }
  return (
    <>
      <Title>Welcome {userData?.name ? ` ${userData.name}` : ""}</Title>
      {children}
      {clientsData && userData?.id && (
        <ClientsList userId={userData.id} clients={clientsData} />
      )}
    </>
  );
}
