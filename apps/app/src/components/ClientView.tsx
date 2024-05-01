import { RealtimeComponent } from "@/components/RealtimeComponent";
import { Box, Button, Flex } from "@mantine/core";
import { AppClientData } from "@sks/common/types";
import {
  isPermissionGranted,
  requestPermission,
} from "@tauri-apps/api/notification";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ClientIcon } from "../../../../packages/common/components/ClientIcon";

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
  useEffect(() => {
    isPermissionGranted().then(setNotificationPermission);
  }, []);
  const requestNotificationPermission = async () => {
    if (!notificationPermission) {
      await requestPermission();
      setNotificationPermission(true);
    }
  };
  if (!clientData?.id) return null;
  return (
    <>
      <Flex>
        <Box>
          <ClientIcon
            icon={clientData.icon}
            iconProps={{ size: "140px", strokeWidth: 1 }}
          />
        </Box>
        <Button variant="light" onClick={clearClientId} mt="15px">
          Reset Client ID
        </Button>
        <Button
          variant="light"
          disabled={notificationPermission}
          onClick={requestNotificationPermission}
          mt="15px"
        >
          {notificationPermission
            ? "Notifications enabled"
            : "Enable notifications"}
        </Button>
      </Flex>
      <RealtimeComponent
        clientData={clientData}
        setClientData={setClientData}
      />
    </>
  );
};
