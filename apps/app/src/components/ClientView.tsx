import { RealtimeComponent } from "@/components/RealtimeComponent";
import { Box, Button, Center, Flex, Text, rem } from "@mantine/core";
import { AppClientData } from "@sks/common/types";
import { IconBell, IconLogin, IconTrash } from "@tabler/icons-react";
import {
  isPermissionGranted,
  requestPermission,
} from "@tauri-apps/api/notification";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { invoke } from "@tauri-apps/api/tauri";

async function isAutostartEnabled(): Promise<boolean> {
  return await invoke("plugin:autostart|is_enabled");
}
async function enableAutostart(): Promise<void> {
  await invoke("plugin:autostart|enable");
}
async function disableAutostart(): Promise<void> {
  await invoke("plugin:autostart|disable");
}

const actionIconsStyle = { width: rem(18), height: rem(18) };

export const ClientView = ({
  clientData,
  clearClientId,
  setClientData,
}: {
  clientData?: AppClientData;
  clearClientId: () => void;
  setClientData: Dispatch<SetStateAction<AppClientData | undefined>>;
}) => {
  const [notificationPermission, setNotificationPermission] = useState(false);
  const [autostartEnabled, setAutostartEnabled] = useState(false);
  useEffect(() => {
    void isPermissionGranted().then(setNotificationPermission);
  }, []);
  useEffect(() => {
    void isAutostartEnabled().then(setAutostartEnabled);
  }, []);
  const requestNotificationPermission = async () => {
    if (!notificationPermission) {
      await requestPermission();
      setNotificationPermission(true);
    }
  };
  const requestAutostartPermission = async () => {
    if (!autostartEnabled) {
      await enableAutostart();
      void isAutostartEnabled().then(setAutostartEnabled);
    }
  };
  const removeAutostartPermission = async () => {
    if (!autostartEnabled) {
      return;
    }
    await disableAutostart();
    void isAutostartEnabled().then(setAutostartEnabled);
  };
  if (!clientData?.id) return null;
  return (
    <>
      <Flex justify="space-evenly">
        <Button
          variant="outline"
          color="red"
          onClick={clearClientId}
          mt="15px"
          leftSection={<IconTrash style={actionIconsStyle} />}
        >
          Reset client
        </Button>
        <Button
          variant="outline"
          color="teal"
          disabled={notificationPermission}
          onClick={requestNotificationPermission}
          leftSection={<IconBell style={actionIconsStyle} />}
          mt="15px"
        >
          {notificationPermission
            ? "Notifications enabled"
            : "Enable notifications"}
        </Button>
        <Box>
          <Button
            variant="outline"
            color="teal"
            onClick={
              autostartEnabled
                ? removeAutostartPermission
                : requestAutostartPermission
            }
            leftSection={<IconLogin style={actionIconsStyle} />}
            mt="15px"
          >
            {autostartEnabled ? "Auto start enabled" : "Enable auto start"}
          </Button>
          <Center>
            <Text size="12px" mt="4px">
              (click again to disable)
            </Text>
          </Center>
        </Box>
      </Flex>
      <RealtimeComponent
        clientData={clientData}
        setClientData={setClientData}
      />
    </>
  );
};
