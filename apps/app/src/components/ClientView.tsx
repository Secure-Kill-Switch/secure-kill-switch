import { RealtimeComponent } from "@/components/RealtimeComponent";
import { Box, Button, Center, Flex, Text, rem } from "@mantine/core";
import { AppClientData } from "@sks/common/types";
import { IconBell, IconLogin, IconPower, IconTrash } from "@tabler/icons-react";
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

async function getAppWindow() {
  return (await import("@tauri-apps/api/window")).appWindow;
}

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
  async function closeApp(): Promise<void> {
    getAppWindow().then((appWindow) => {
      appWindow.close();
    });
  }
  useEffect(() => {
    getAppWindow().then((appWindow) => {
      void isPermissionGranted().then(setNotificationPermission);
      void isAutostartEnabled().then((enabled) => {
        setAutostartEnabled(enabled);
        // if autostart is not enabled, we need to manually show the window
        !enabled && appWindow.show();
      });
    });
  }, []);
  const requestNotificationPermission = async () => {
    if (!notificationPermission) {
      requestPermission().then((notificationPermissionEnabled) => {
        setNotificationPermission(notificationPermissionEnabled === "granted");
      });
    }
  };
  const requestAutostartPermission = async () => {
    if (!autostartEnabled) {
      enableAutostart().then(() => {
        void isAutostartEnabled().then(setAutostartEnabled);
      });
    }
  };
  const removeAutostartPermission = async () => {
    if (!autostartEnabled) {
      return;
    }
    disableAutostart().then(() => {
      void isAutostartEnabled().then(setAutostartEnabled);
    });
  };
  if (!clientData?.id) return null;
  return (
    <>
      <Flex justify="space-evenly">
        <Button
          variant="outline"
          color="red"
          onClick={clearClientId}
          mt="lg"
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
          mt="lg"
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
            mt="lg"
          >
            {autostartEnabled ? "Auto start enabled" : "Enable auto start"}
          </Button>
          <Center>
            <Text size="12px" mt="4px">
              {autostartEnabled ? "(click again to disable)" : "\u00A0"}
            </Text>
          </Center>
        </Box>
        <Button
          variant="outline"
          color="lime"
          onClick={closeApp}
          leftSection={<IconPower style={actionIconsStyle} />}
          mt="lg"
        >
          Close app
        </Button>
      </Flex>
      <RealtimeComponent
        clientData={clientData}
        setClientData={setClientData}
      />
    </>
  );
};
