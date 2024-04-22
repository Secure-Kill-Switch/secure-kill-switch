import { Box, Flex, Loader, Text, Title } from "@mantine/core";
import { GlassBox } from "../components";
import { StatsType } from "../handlers/get-stats";

const StatsInfo = ({ stat, statName }: { stat?: number; statName: string }) =>
  typeof stat === "number" ? (
    <Text size="20px" lh="30px">
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

export const StatsBox = ({ stats }: { stats: StatsType | undefined }) => (
  <GlassBox mt="50vh" mb="30px">
    <Flex justify="space-around" align="baseline">
      <Box ta="center">
        <Title>
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
