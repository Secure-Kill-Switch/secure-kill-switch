"use client";

import { ClientView } from "@/components/ClientView";
import { LoginView } from "@/components/LoginView";
import { executeActions } from "@/helpers/executeAction";
import { ping } from "@/helpers/ping";
import { clientDataStore } from "@/helpers/store";
import { GlassBox } from "@sks/common/components/GlassBox";
import { PageContainer } from "@sks/common/components/PageContainer";

import { AppClientData } from "@sks/common/types";
import { SKSAction } from "@sks/database";
import { sendNotification } from "@tauri-apps/api/notification";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

export default function Home() {
  const [clientData, setClientData] = useState<AppClientData | undefined>();
  const [gettingClientData, setGettingClientData] = useState(false);
  const handlePingData = (pingClientData?: AppClientData) => {
    setClientData(pingClientData);
    setGettingClientData(false);
    executeActions(pingClientData?.actions as SKSAction[]);
    void clientDataStore.set(pingClientData);
  };
  const saveClientIdOnSubmit = (clientId: string) => {
    setGettingClientData(true);
    ping(clientId)
      .then(handlePingData)
      .then(() => {
        sendNotification({
          title: "Secure Kill Switch",
          body: "Client ID saved successfully! You can now control this client remotely.",
          sound: "default",
        });
      });
  };
  const clearClientId = () => {
    clientDataStore.delete().then(() => {
      setClientData(undefined);
    });
  };
  useEffect(() => {
    clientDataStore.get().then((clientData) => {
      if (!gettingClientData && clientData) {
        setGettingClientData(true);
        setClientData(clientData);
        ping(clientData.id).then(handlePingData);
      }
    });
  }, []);
  return (
    <PageContainer clientName={clientData?.name} clientIcon={clientData?.icon}>
      <GlassBox mb="20px">
        <ClientView
          clientData={clientData}
          clearClientId={clearClientId}
          setClientData={setClientData}
        />
        <LoginView
          clientData={clientData}
          saveClientIdOnSubmit={saveClientIdOnSubmit}
        />
      </GlassBox>
    </PageContainer>
  );
}
