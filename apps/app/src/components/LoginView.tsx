import { Button, Group, Text, TextInput } from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { AppClientData } from "@sks/common/types";

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
  if (clientData?.id) return null;
  return (
    <>
      <Text>Insert your Client ID</Text>
      <Form
        form={clientIdForm}
        onSubmit={({ clientId }) => saveClientIdOnSubmit(clientId)}
      >
        <Group>
          <TextInput
            placeholder="Client ID"
            w="100%"
            mr="10px"
            {...clientIdForm.getInputProps("clientId")}
          />
          <Button variant="light" type="submit">
            Connect
          </Button>
        </Group>
      </Form>
    </>
  );
};
