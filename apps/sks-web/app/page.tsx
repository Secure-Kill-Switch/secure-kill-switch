"use client";
import { NewUserForm } from "@/components/new-user-form";
import { shortenId } from "@/helpers/shorten-id";
import { Box, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { SKSUser } from "@prisma/client";
import { useRouter } from "next/navigation";

export default function HomePage(): JSX.Element {
  const { push } = useRouter();
  const onUserCreated = (user: SKSUser) => {
    notifications.show({
      title: "User created",
      message: user.name
        ? `User ${shortenId(user.id)} created with name ${user.name}`
        : `User ${shortenId(user.id)} created`,
      color: "teal",
    });
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
