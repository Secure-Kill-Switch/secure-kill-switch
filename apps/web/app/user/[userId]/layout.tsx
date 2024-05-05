import { Center, Flex, Text } from "@mantine/core";
import { ClientsList } from "@sks/common/components/ClientsList";
import { GlassBox } from "@sks/common/components/GlassBox";
import { PageContainer } from "@sks/common/components/PageContainer";
import { getClients, getUser } from "@sks/common/handlers";
import { SKSUser } from "@sks/database";
import { IconTemplateOff } from "@tabler/icons-react";
import { Metadata } from "next";
import { ReactNode } from "react";

type UserPageProps = {
  params: { userId: string };
};

export async function generateMetadata({
  params,
}: UserPageProps): Promise<Metadata> {
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
    <PageContainer userName={userData?.name}>
      {children}
      {clientsData && userData?.id && (
        <ClientsList userId={userData.id} clients={clientsData} />
      )}
      {!clientsData?.length && (
        <GlassBox mt="lg">
          <Flex direction="column">
            <Center my="lg">
              <IconTemplateOff size="50" strokeWidth={1} />
            </Center>
            <Center>
              <Text size="xl">No clients found.</Text>
            </Center>
            <Center>
              <Text mb="xl">Add a client to get started.</Text>
            </Center>
          </Flex>
        </GlassBox>
      )}
    </PageContainer>
  );
}
