import { uuidRegex } from "@/helpers/uuid";
import {
  Box,
  Button,
  Divider,
  Flex,
  Group,
  Text,
  TextInput,
  Title,
  rem,
} from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { AppClientData } from "@sks/common/types";
import { IconExternalLink } from "@tabler/icons-react";
import { open } from "@tauri-apps/api/shell";

const iconsStyle = { width: rem(18), height: rem(18) };

export const LoginView = ({
  clientData,
  saveClientIdOnSubmit,
}: {
  clientData?: AppClientData;
  saveClientIdOnSubmit: (clientId: string) => void;
}) => {
  const clientIdForm = useForm({
    initialValues: {
      clientId: "",
    },
    validate: {
      clientId: (value) => {
        if (!value) return "Client ID is required";
        return null;
      },
    },
  });
  const autoLogin = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const clipboardData = event.clipboardData?.getData("Text");
    if (uuidRegex.test(clipboardData)) {
      saveClientIdOnSubmit(clipboardData);
    }
  };
  if (clientData?.id) return null;
  return (
    <Flex direction="row">
      <Box w="100%">
        <Title size="24px" mb="md">
          Insert your Client ID
        </Title>
        <Form
          form={clientIdForm}
          onSubmit={({ clientId }) => saveClientIdOnSubmit(clientId)}
        >
          <Group>
            <TextInput
              placeholder="Client ID"
              w="100%"
              mr="lg"
              {...clientIdForm.getInputProps("clientId")}
              onPaste={autoLogin}
            />
            <Button variant="light" type="submit">
              Connect
            </Button>
          </Group>
        </Form>
      </Box>
      <Divider orientation="vertical" mx="lg" />
      <Box w="100%">
        <Title size="24px" mb="md">
          Don't have a Client ID?
        </Title>
        <Text mb="lg">Create a new one in the web app.</Text>
        <Button
          leftSection={<IconExternalLink style={iconsStyle} />}
          variant="outline"
          size="sm"
          onClick={() => {
            open(process.env.NEXT_PUBLIC_BACKEND_URL as string);
          }}
        >
          Get a new client ID
        </Button>
      </Box>
    </Flex>
  );
};
