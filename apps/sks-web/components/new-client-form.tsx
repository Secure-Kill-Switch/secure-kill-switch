"use client";
import { createClient } from "@/handlers/create-client";
import { revalidateCachePath } from "@/handlers/revalidate-path";
import { ClientIconsNames, clientIcons } from "@/helpers/client-icons";
import { shortenId } from "@/helpers/shorten-id";
import { Button, Chip, Flex, GridCol, Input, Modal, Text } from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { SKSClient } from "@prisma/client";
import { IconCheck, IconPlus } from "@tabler/icons-react";
import { useState } from "react";

export const NewClientForm = ({ userId }: { userId: string }) => {
  const [
    addNewClientOpened,
    { open: openAddNewClient, close: closeAddNewClient },
  ] = useDisclosure(false);
  const [selectedClientIcon, setSelectedClientIcon] =
    useState<ClientIconsNames>(Object.keys(clientIcons)[0] as ClientIconsNames);
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
      icon: selectedClientIcon,
    });
    if (createClientReply.status === 200 && createClientReply.body?.data?.id) {
      closeAddNewClient();
      setAddingClient(false);
      onClientCreated(createClientReply.body.data);
      createClientForm.reset();
    }
  };
  return (
    <GridCol
      key="new-client-form"
      span={{
        base: 6,
        lg: 4,
      }}
    >
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
        title={
          <Text ff="heading" size="25px">
            Adding a new client
          </Text>
        }
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Form form={createClientForm} onSubmit={createClientOnSubmit}>
          <Flex direction="column">
            <Text size="sm" mb="5px">
              You can specify a clients display name and pick an icon.
            </Text>
            <Input
              w="100%"
              mb="20px"
              placeholder="Your (optional) client name"
              value={createClientForm.values.name}
              onChange={(event) =>
                createClientForm.setFieldValue(
                  "name",
                  event.currentTarget.value
                )
              }
            />
            <Flex
              p="10px"
              mb="10px"
              bg="dark.6"
              style={{ borderRadius: "4px" }}
              justify="space-evenly"
            >
              {Object.keys(clientIcons).map((client) => (
                <Chip
                  key={client}
                  variant="outline"
                  style={{
                    marginRight: "5px",
                    opacity: client === selectedClientIcon ? 1 : 0.3,
                  }}
                  icon={
                    <IconCheck
                      size="14px"
                      strokeWidth={client === selectedClientIcon ? 5 : 1}
                      color={client === selectedClientIcon ? undefined : "gray"}
                    />
                  }
                  checked={true}
                  onClick={() =>
                    setSelectedClientIcon(client as ClientIconsNames)
                  }
                >
                  {clientIcons[client as ClientIconsNames]}
                </Chip>
              ))}
            </Flex>
            <Button type="submit" loading={addingClient}>
              Create Client
            </Button>
          </Flex>
        </Form>
      </Modal>
    </GridCol>
  );
};
