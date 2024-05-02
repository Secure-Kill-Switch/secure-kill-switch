"use client";
import {
  Badge,
  Menu,
  MenuDivider,
  MenuDropdown,
  MenuItem,
  MenuLabel,
  MenuTarget,
  rem,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconBell,
  IconCursorText,
  IconPlus,
  IconPower,
  IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";
import { removeClient, revalidateCachePath } from "../../../handlers";
import { shortenId } from "../../../helpers";
import { ClientWithActions } from "../../../types";

export const ClientsItemDetailsMenu = ({
  client,
  userId,
  openClientRenameModal,
  openClientNotificationModal,
}: {
  client: ClientWithActions;
  userId: string;
  openClientRenameModal: () => void;
  openClientNotificationModal: () => void;
}) => {
  const [removingClient, setRemovingClient] = useState(false);
  const removeClientAction = async () => {
    setRemovingClient(true);
    const removeClientCall = await removeClient({ userId, id: client.id });
    if (removeClientCall.status !== 200) {
      notifications.show({
        title: "Error removing client",
        message: removeClientCall.body.message,
        color: "red",
      });
      setRemovingClient(false);
      return;
    }
    notifications.show({
      title: "Client removed",
      message: client.name
        ? `Client ${shortenId(client.id)} (${client.name}) removed`
        : `Client ${shortenId(client.id)} removed`,
      color: "teal",
    });
    revalidateCachePath(`/user/${userId}`);
    setRemovingClient(false);
  };

  const menuIconsStyle = { width: rem(14), height: rem(14) };

  return (
    <Menu shadow="md" width={200}>
      <MenuTarget>
        <Badge
          mr="10px"
          style={{
            textTransform: "none",
            userSelect: "none",
            maxWidth: "100%",
            cursor: "pointer",
          }}
          w={{
            base: "100%",
            lg: "fit-content",
          }}
          size="lg"
          color="gray"
          variant="outline"
          leftSection={<IconPlus style={{ width: rem(14), height: rem(14) }} />}
        >
          Execute action
        </Badge>
      </MenuTarget>

      <MenuDropdown>
        <MenuLabel>Actions</MenuLabel>
        <MenuItem leftSection={<IconPower style={menuIconsStyle} />}>
          Shutdown
        </MenuItem>
        <MenuItem
          onClick={openClientNotificationModal}
          leftSection={<IconBell style={menuIconsStyle} />}
        >
          Send notification
        </MenuItem>
        <MenuDivider />
        <MenuLabel>Edit client</MenuLabel>
        <MenuItem
          onClick={openClientRenameModal}
          leftSection={<IconCursorText style={menuIconsStyle} />}
        >
          Change name
        </MenuItem>
        <MenuItem
          color="red"
          onClick={removeClientAction}
          leftSection={<IconTrash style={menuIconsStyle} />}
        >
          Delete client
        </MenuItem>
      </MenuDropdown>
    </Menu>
  );
};
