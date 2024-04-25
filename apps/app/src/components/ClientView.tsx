import { RealtimeComponent } from "@/components/RealtimeComponent";
import { Button, Title } from "@mantine/core";
import { AppClientData } from "@sks/common/types";
import {
  isPermissionGranted,
  requestPermission,
} from "@tauri-apps/api/notification";
import { useEffect, useState } from "react";

export const ClientView = ({
  clientData,
  clearClientId,
}: {
  clientData?: AppClientData;
  clearClientId: () => void;
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
      <Title>Hello {clientData.name}</Title>
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
      <RealtimeComponent clientId={clientData.id} />
    </>
  );
};
