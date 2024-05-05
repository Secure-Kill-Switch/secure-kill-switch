import { Grid, GridCol, Text, Title } from "@mantine/core";
import { GlassBox } from "@sks/common/components/GlassBox";
import { NewUserForm } from "@sks/common/components/NewUserForm";
import { PageContainer } from "@sks/common/components/PageContainer";
import { StatsBox } from "@sks/common/components/StatsBox";

export default function HomePage(): JSX.Element {
  return (
    <PageContainer noHeaderPadding>
      <Title
        size="50px"
        mt="100px"
        mb="lg"
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
      <Text size="22px" style={{ textTransform: "initial" }} mb="8px">
        - no bullshit
      </Text>
      <Text size="22px" style={{ textTransform: "initial" }} mb="100px">
        - just follow these steps:
      </Text>
      <Grid align="stretch" mb="lg">
        <GridCol span={4}>
          <GlassBox w="100%" h="100%">
            <Title size="24px" my="lg">
              1. Set up a user
            </Title>
            <Text mb="lg">
              View all of your clients using the generated link.
            </Text>
            <Text mb="lg">Remember to save it (it cannot be recovered).</Text>
            <NewUserForm />
          </GlassBox>
        </GridCol>
        <GridCol span={4}>
          <GlassBox w="100%" h="100%">
            <Title size="24px" my="lg">
              2. Set up a client
            </Title>
            <Text>
              Client is a single computer, recognized by its unique id.
            </Text>
            <Text mt="lg">You can create a client on the user page.</Text>
          </GlassBox>
        </GridCol>
        <GridCol span={4}>
          <GlassBox w="100%" h="100%">
            <Title size="24px" my="lg">
              3. Get the desktop app
            </Title>
            <Text>
              Download the desktop app for Windows, Mac or Linux. The app will
              allow you to shut down any computer, or send a text notification.
            </Text>
          </GlassBox>
        </GridCol>
      </Grid>
      <StatsBox />
    </PageContainer>
  );
}
