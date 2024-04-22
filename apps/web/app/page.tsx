"use client";
import { Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { GlassBox, NewUserForm, StatsBox } from "@sks/common/components";
import { StatsType, getStats } from "@sks/common/handlers";
import { shortenId } from "@sks/common/helpers";
import { SKSUser } from "@sks/database/generated/prisma-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage(): JSX.Element {
  const { push } = useRouter();
  const [stats, setStats] = useState<StatsType | undefined>();
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
  useEffect(() => {
    const fetchStats = async () => {
      const response = await getStats();
      response.body && setStats(response);
    };
    fetchStats();
  }, []);
  return (
    <>
      <StatsBox stats={stats} />
      <GlassBox mb="20px">
        <Text mb="10px">
          This app will let you shut down any Windows/MacOS/Linux device using a
          special link. Start by creating a new user ID.
        </Text>
        <Text mb="10px">
          The next would be downloading a proper desktop app from the releases
          page.
        </Text>
        <Text mb="10px">
          Then on your user page you can create up to 20 unique IDs (one per
          device) which will be used to shut down the device.
        </Text>
        <Text mb="10px">
          Run the app, paste the client ID, set it to run on login and you're
          all set.
        </Text>
        <Text mb="10px" fw="bolder">
          Remember: Save the link to the user page to your bookmarks.
        </Text>
        <Text mb="10px" fs="italic" fw="lighter">
          PS: If you won't choose a name for your user or client, system will
          choose a name for you. It's not technically required but you know...
          we all need names.
        </Text>
      </GlassBox>
      <NewUserForm onUserCreated={onUserCreated} />
    </>
  );
}
