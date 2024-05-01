import { Box, Flex, Loader, Text, Title } from "@mantine/core";
import { GlassBox } from "../components";
import { getStats } from "../handlers/get-stats";

const StatsInfo = ({ stat, statName }: { stat?: number; statName: string }) =>
  typeof stat === "number" ? (
    <Text size="20px" lh="24px">
      <b>{stat}</b>
      <br />
      {statName}
    </Text>
  ) : (
    <Flex direction="column" align="center">
      <Text size="20px" lh="0px" style={{ visibility: "hidden" }}>
        {statName}
      </Text>
      <Loader color="gray" size="sm" type="bars" />
    </Flex>
  );

export const StatsBox = async () => {
  const stats = await getStats();
  return (
    <GlassBox mb="30px">
      <Flex justify="space-around" align="baseline">
        <Box ta="center">
          <Title size="20px">
            Usage
            <br />
            statistics
          </Title>
        </Box>
        <Box ta="center">
          <StatsInfo stat={stats?.body.usersCount} statName="users" />
        </Box>
        <Box ta="center">
          <StatsInfo stat={stats?.body.clientsCount} statName="clients" />
        </Box>
        <Box ta="center">
          <StatsInfo stat={stats?.body.actionsCount} statName="actions" />
        </Box>
      </Flex>
    </GlassBox>
  );
};
