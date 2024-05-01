"use client";

import { Button, Flex, Modal, Text, TextInput, rem } from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { SKSUser } from "@sks/database";
import { IconUser } from "@tabler/icons-react";
import { useState } from "react";
import { createUser } from "../handlers";
import { modalLayers } from "../helpers";

export const NewUserForm = ({
  onUserCreated,
}: {
  onUserCreated: (client: SKSUser) => void;
}) => {
  const createUserForm = useForm({
    initialValues: {
      name: "",
    },
    validate: {
      name: (value) => {
        if (value.length > 30) {
          return "Name is too long";
        }
        return null;
      },
    },
  });
  const [addingUser, setAddingUser] = useState(false);
  const [addNewUserOpened, { open: openAddNewUser, close: closeAddNewUser }] =
    useDisclosure(false);
  const createUserOnSubmit = async () => {
    setAddingUser(true);
    const createUserReply = await createUser(createUserForm.values);
    if (createUserReply.status === 200 && createUserReply.body?.data?.id) {
      onUserCreated(createUserReply.body.data);
    }
    createUserForm.reset();
    closeAddNewUser();
    setAddingUser(false);
  };
  return (
    <>
      <Flex justify="center">
        <Button
          size="lg"
          leftSection={<IconUser style={{ width: rem(14), height: rem(14) }} />}
          onClick={openAddNewUser}
        >
          Add new user
        </Button>
      </Flex>
      <Modal
        centered
        size="auto"
        opened={addNewUserOpened}
        onClose={closeAddNewUser}
        title={
          <Text ff="heading" size="25px">
            Adding a new user
          </Text>
        }
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        zIndex={modalLayers.first}
      >
        <Form form={createUserForm} onSubmit={createUserOnSubmit}>
          <Flex direction="column">
            <Text size="sm" mb="5px">
              Enter a name for the new user.
              <br />
              If can think of anything, a name will be generated for you.
            </Text>
            <TextInput
              w="100%"
              mb="20px"
              placeholder="Your (optional) client name"
              {...createUserForm.getInputProps("name")}
            />
            <Button type="submit" loading={addingUser}>
              Create User
            </Button>
          </Flex>
        </Form>
      </Modal>
    </>
  );
};
