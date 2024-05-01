"use client";
import { Text, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { NewUserForm, PageContainer, StatsBox } from "@sks/common/components";
import { StatsType, getStats } from "@sks/common/handlers";
import { shortenId } from "@sks/common/helpers";
import { SKSUser } from "@sks/database";
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
    <PageContainer noPadding>
      <Title
        size="50px"
        mt="100px"
        mb="15px"
        style={{ textTransform: "initial" }}
      >
        Shut down any computer <br />
        with a link
      </Title>
      <Text size="22px" style={{ textTransform: "initial" }} mb="8px">
        - free forever
      </Text>
      <Text size="22px" style={{ textTransform: "initial" }} mb="8px">
        - open source
      </Text>
      <Text size="22px" style={{ textTransform: "initial" }} mb="8px">
        - no sign up
      </Text>
      <Text size="22px" style={{ textTransform: "initial" }} mb="100px">
        - no bullshit
      </Text>
      <StatsBox stats={stats} />
      <NewUserForm onUserCreated={onUserCreated} />
    </PageContainer>
  );
}
