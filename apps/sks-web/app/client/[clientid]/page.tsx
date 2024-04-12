import { Container, Text } from "@mantine/core";
import { SKSUser } from "@prisma/client";
import { FontHeader } from "@/helpers/fonts";
import { getUser } from "@/handlers/get-user";

export default async function ClientPage({
  params,
}: {
  params: {
    clientid?: string;
  };
}): Promise<JSX.Element> {
  const userDataCall = await getUser({ id: params.clientid });
  const gotUserData = userDataCall.status === 200;
  const userData = gotUserData
    ? (userDataCall.body.data as SKSUser)
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
      <Text className={FontHeader.className}>
        Welcome {userData?.name}
        <br />
        Your ID: {userData?.id}
      </Text>
    </Container>
  );
}
