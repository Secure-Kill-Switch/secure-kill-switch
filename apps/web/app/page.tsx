import { Text, Title } from "@mantine/core";
import { NewUserForm, PageContainer, StatsBox } from "@sks/common/components";

export default function HomePage(): JSX.Element {
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
      <StatsBox />
      <NewUserForm />
    </PageContainer>
  );
}
