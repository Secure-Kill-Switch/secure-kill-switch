"use client";
import { createClient } from "@/handlers/create-client";
import { Button, Input } from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { SKSClient } from "@prisma/client";

export const NewClientForm = ({
  userId,
  onClientCreated,
}: {
  // eslint-disable-next-line no-unused-vars
  userId: string;
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
      <Input
        placeholder="Your client name"
        value={createClientForm.values.name}
        onChange={(event) =>
          createClientForm.setFieldValue("name", event.currentTarget.value)
        }
      />
      <Button type="submit">Create Client</Button>
    </Form>
  );
};