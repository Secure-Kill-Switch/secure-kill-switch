"use client";
import { createUser } from "@/handlers/create-user";
import { Button, Input } from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { SKSClient } from "@prisma/client";

export const NewUserForm = ({
  onUserCreated,
}: {
  // eslint-disable-next-line no-unused-vars
  onUserCreated: (client: SKSClient) => void;
}) => {
  const createUserForm = useForm({
    initialValues: {
      name: "",
    },
  });
  const createUserOnSubmit = async () => {
    const createUserReply = await createUser(createUserForm.values);
    if (createUserReply.status === 200 && createUserReply.body?.data?.id) {
      onUserCreated(createUserReply.body.data);
    }
  };
  return (
    <Form form={createUserForm} onSubmit={createUserOnSubmit}>
      <Input
        placeholder="Your client name"
        value={createUserForm.values.name}
        onChange={(event) =>
          createUserForm.setFieldValue("name", event.currentTarget.value)
        }
      />
      <Button type="submit">Create User</Button>
    </Form>
  );
};
