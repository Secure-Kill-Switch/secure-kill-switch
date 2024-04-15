"use client";
import { createClient } from "@/handlers/create-client";
import { revalidateCachePath } from "@/handlers/revalidate-path";
import { shortenId } from "@/helpers/shorten-id";
import { Button, Flex, GridCol, Input, Modal } from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { SKSClient } from "@prisma/client";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";

export const NewClientForm = ({ userId }: { userId: string }) => {
  const [
    addNewClientOpened,
    { open: openAddNewClient, close: closeAddNewClient },
  ] = useDisclosure(false);
  const [addingClient, setAddingClient] = useState(false);
  const onClientCreated = (client: SKSClient) => {
    notifications.show({
      title: "Client created",
      message: client.name
        ? `Client ${shortenId(client.id)} created with name ${client.name}`
        : `Client ${shortenId(client.id)} created`,
      color: "teal",
    });
    revalidateCachePath(`/user/${userId}`);
  };
  const createClientForm = useForm({
    initialValues: {
      name: "",
    },
  });
  const createClientOnSubmit = async () => {
    setAddingClient(true);
    const createClientReply = await createClient({
      name: createClientForm.values.name,
      userId,
    });
    if (createClientReply.status === 200 && createClientReply.body?.data?.id) {
      closeAddNewClient();
      setAddingClient(false);
      onClientCreated(createClientReply.body.data);
      createClientForm.reset();
    }
  };
  return (
    <GridCol span={4}>
      <Flex
        p={10}
        h="100%"
        style={{
          border: "1px solid",
          borderColor: "lightgray",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        align="center"
        justify="center"
        direction="column"
        onClick={openAddNewClient}
      >
        <IconPlus size={24} />
        Add new client
      </Flex>
      <Modal
        centered
        size="auto"
        opened={addNewClientOpened}
        onClose={closeAddNewClient}
        title="Adding a new client"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Form form={createClientForm} onSubmit={createClientOnSubmit}>
          <Flex direction="column">
            <Input
              w="100%"
              mb="20px"
              placeholder="Your client name (optional)"
              value={createClientForm.values.name}
              onChange={(event) =>
                createClientForm.setFieldValue(
                  "name",
                  event.currentTarget.value
                )
              }
            />
            <Button type="submit" w="200px" loading={addingClient}>
              Create Client
            </Button>
          </Flex>
        </Form>
      </Modal>
    </GridCol>
  );
};
