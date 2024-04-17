import { GlassBox } from "@/components/glass-box";
import { StatsType } from "@/handlers/get-stats";
import { Box, Flex, Text, Title } from "@mantine/core";

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
        <Text size="20px" lh="30px">
          <b>{stats?.body.usersCount ?? "-"}</b>
          <br />
          users
        </Text>
      </Box>
      <Box ta="center">
        <Text size="20px" lh="30px">
          <b>{stats?.body.clientsCount ?? "-"}</b>
          <br />
          clients
        </Text>
      </Box>
      <Box ta="center">
        <Text size="20px" lh="30px">
          <b>{stats?.body.actionsCount ?? "-"}</b>
          <br />
          actions
        </Text>
      </Box>
    </Flex>
  </GlassBox>
);
