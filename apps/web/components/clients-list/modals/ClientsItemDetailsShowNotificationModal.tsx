"use client";
import { revalidateCachePath } from "@/handlers/revalidate-path";
import { showNotificationClient } from "@/handlers/show-notification-client";
import { modalLayers } from "@/helpers";
import { ClientWithActions } from "@/types/enhanced-client";
import { Button, Flex, Modal, Text, TextInput } from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { PropsWithChildren, useState } from "react";

export const ClientsItemDetailsShowNotificationModal = ({
  client,
  userId,
  clientShowNotificationModalOpened,
  closeClientShowNotificationModal,
}: PropsWithChildren<{
  client: ClientWithActions;
  userId: string;
  clientShowNotificationModalOpened: boolean;
  closeClientShowNotificationModal: () => void;
}>) => {
  const [creatingNotification, setCreatingNotification] = useState(false);
  const showNotificationClientForm = useForm({
    initialValues: {
      notificationText: "",
    },
    validate: {
      notificationText: (value) => {
        if (!value) {
          return "Notification text is required";
        }
        if (value.length > 30) {
          return "Notification text is too long";
        }
        return null;
      },
    },
  });
  const showNotificationClientOnSubmit = async () => {
    setCreatingNotification(true);
    const showNotificationClientReply = await showNotificationClient({
      id: client.id,
      notificationText: showNotificationClientForm.values.notificationText,
    });
    if (showNotificationClientReply.status !== 200) {
      console.error(showNotificationClientReply.body?.message);
      setCreatingNotification(false);
      notifications.show({
        title: "Error",
        message: `Error creating notification for ${client.name}`,
        color: "red",
      });
      return;
    }
    if (
      showNotificationClientReply.status === 200 &&
      showNotificationClientReply.body?.data?.id
    ) {
      notifications.show({
        title: "Notification created",
        message: `Notification for ${client.name} created successfully`,
        color: "teal",
      });
      setCreatingNotification(false);
      await revalidateCachePath(`/user/${userId}`);
      showNotificationClientForm.reset();
      closeClientShowNotificationModal();
    }
  };
  return (
    <Modal
      centered
      size="auto"
      opened={clientShowNotificationModalOpened}
      onClose={closeClientShowNotificationModal}
      title={
        <Text ff="heading" size="25px">
          Sending notification to: {client.name}
        </Text>
      }
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      zIndex={modalLayers.second}
    >
      <Form
        form={showNotificationClientForm}
        onSubmit={showNotificationClientOnSubmit}
      >
        <Flex direction="column">
          <Text size="sm" mb="5px">
            Notification text
          </Text>
          <TextInput
            w="100%"
            mb="20px"
            placeholder="Hello world!"
            {...showNotificationClientForm.getInputProps("notificationText")}
          />
          <Button type="submit" loading={creatingNotification}>
            Send notification
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};
