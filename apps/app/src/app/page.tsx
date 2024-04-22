import { Button, Group, Text, TextInput } from "@mantine/core";
import { GlassBox } from "@sks/common/components";

export default function Home() {
  return (
    <GlassBox mb="20px">
      <Text>Insert your client ID</Text>
      <form>
        <Group>
          <TextInput placeholder="Client ID" w="100%" mr="10px" />
          <Button variant="light">Connect</Button>
        </Group>
      </form>
    </GlassBox>
  );
}
