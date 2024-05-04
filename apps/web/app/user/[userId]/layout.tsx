import { Text } from "@mantine/core";
import { ClientsList } from "@sks/common/components/ClientsList";
import { PageContainer } from "@sks/common/components/PageContainer";
import { getClients, getUser } from "@sks/common/handlers";
import { SKSUser } from "@sks/database";
import { Metadata, ResolvingMetadata } from "next";
import { ReactNode } from "react";

type UserPageProps = {
  params: { userId: string };
};

export async function generateMetadata(
  { params }: UserPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const userDataCall = await getUser({ id: params.userId });
  if (!userDataCall.body.data) {
    return {
      title: "Error finding user",
    };
  }
  const userData = userDataCall.body.data as SKSUser;
  return {
    title: `Secure Kill Switch - ${userData.name}`,
  };
}

export default async function UserPageLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: UserPageProps["params"];
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
