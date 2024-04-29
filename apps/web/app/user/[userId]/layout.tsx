import { Text } from "@mantine/core";
import { SKSUser } from "@prisma/client";
import { ClientsList, PageContainer } from "@sks/common/components";
import { getClients, getUser } from "@sks/common/handlers";
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
    <PageContainer userName={userData?.name} noPadding>
      {children}
      {clientsData && userData?.id && (
        <ClientsList userId={userData.id} clients={clientsData} />
      )}
    </PageContainer>
  );
}
