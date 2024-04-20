"use client";
import { renameClient } from "@/handlers/change-name-client";
import { revalidateCachePath } from "@/handlers/revalidate-path";
import { modalLayers } from "@/helpers/modal-zindex";
import { ClientWithActions } from "@/types/enhanced-client";
import { Button, Flex, Modal, Text, TextInput } from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { PropsWithChildren, useState } from "react";

export const ClientsItemDetailsRenameModal = ({
  client,
  userId,
  clientRenameModalOpened,
  closeClientRenameModal,
}: PropsWithChildren<{
  client: ClientWithActions;
  userId: string;
  clientRenameModalOpened: boolean;
  closeClientRenameModal: () => void;
}>) => {
  const [changingName, setChangingName] = useState(false);
  const renameClientForm = useForm({
    initialValues: {
      newName: client.name,
    },
    validate: {
      newName: (value) => {
        if (value.length > 30) {
          return "Name is too long";
        }
        return null;
      },
    },
  });
  const renameClientOnSubmit = async () => {
    setChangingName(true);
    const renameClientReply = await renameClient({
      id: client.id,
      newName: renameClientForm.values.newName,
      userId,
    });
    if (renameClientReply.status !== 200) {
      console.error(renameClientReply.body?.message);
      setChangingName(false);
      return;
    }
    if (renameClientReply.status === 200 && renameClientReply.body?.data?.id) {
      notifications.show({
        title: "Client name updated",
        message: `${client.name} changed to ${renameClientReply.body.data.name}`,
        color: "teal",
      });
      setChangingName(false);
      revalidateCachePath(`/user/${userId}`);
      renameClientForm.initialize({
        newName: renameClientReply.body.data.name,
      });
      closeClientRenameModal();
    }
  };
  return (
    <Modal
      centered
      size="auto"
      opened={clientRenameModalOpened}
      onClose={closeClientRenameModal}
      title={
        <Text ff="heading" size="25px">
          Changing name: {client.name}
        </Text>
      }
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      zIndex={modalLayers.second}
    >
      <Form form={renameClientForm} onSubmit={renameClientOnSubmit}>
        <Flex direction="column">
          <Text size="sm" mb="5px">
            Pick a new name for your client
          </Text>
          <TextInput
            w="100%"
            mb="20px"
            placeholder={client.name || "Client name"}
            {...renameClientForm.getInputProps("newName")}
          />
          <Button type="submit" loading={changingName}>
            Update name
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};
