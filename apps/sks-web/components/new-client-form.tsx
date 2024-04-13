"use client";
import { createClient } from "@/handlers/create-client";
import { Button, Flex, Input } from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { SKSClient } from "@prisma/client";

export const NewClientForm = ({
  userId,
  onClientCreated,
}: {
  userId: string;
  // eslint-disable-next-line no-unused-vars
  onClientCreated: (client: SKSClient) => void;
}) => {
  const createClientForm = useForm({
    initialValues: {
      name: "",
    },
  });
  const createClientOnSubmit = async () => {
    const createClientReply = await createClient({
      name: createClientForm.values.name,
      userId,
    });
    if (createClientReply.status === 200 && createClientReply.body?.data?.id) {
      onClientCreated(createClientReply.body.data);
    }
  };
  return (
    <Form form={createClientForm} onSubmit={createClientOnSubmit}>
      <Flex direction="row">
        <Input
          w="100%"
          mr="20px"
          placeholder="Your client name"
          value={createClientForm.values.name}
          onChange={(event) =>
            createClientForm.setFieldValue("name", event.currentTarget.value)
          }
        />
        <Button type="submit" w="200px">
          Create Client
        </Button>
      </Flex>
    </Form>
  );
};
