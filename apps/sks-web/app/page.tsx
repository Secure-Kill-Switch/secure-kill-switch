"use client";
import { Box, Text } from "@mantine/core";
import { SKSUser } from "@prisma/client";
import { NewUserForm } from "@/components/new-user-form";
import { useRouter } from "next/navigation";

export default function HomePage(): JSX.Element {
  const { push } = useRouter();
  const onUserCreated = (user: SKSUser) => {
    push(`/user/${user.id}`);
  };
  return (
    <>
      <Box mb="20px">
        <Text mb="10px">
          Start by creating a new user ID. Then access the user page to see the
          list of devices associated with that user.
        </Text>
        <Text>
          You can choose a custom name that will show up on the user page.
        </Text>
      </Box>
      <NewUserForm onUserCreated={onUserCreated} />
    </>
  );
}
