"use client";

import { ClientView } from "@/components/ClientView";
import { LoginView } from "@/components/LoginView";
import { executeAction } from "@/helpers/executeAction";
import { ping } from "@/helpers/ping";
import { clientDataStore } from "@/helpers/store";
import { GlassBox } from "@sks/common/components";
import { AppClientData } from "@sks/common/types";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

export default function Home() {
  const [clientData, setClientData] = useState<AppClientData | undefined>();
  const [gettingClientData, setGettingClientData] = useState(false);
  const handlePingData = (pingClientData?: AppClientData) => {
    setClientData(pingClientData);
    setGettingClientData(false);
    void clientDataStore.set(pingClientData);
    pingClientData?.actions.map(executeAction);
  };
  const saveClientIdOnSubmit = (clientId: string) => {
    setGettingClientData(true);
    ping(clientId).then(handlePingData);
  };
  const clearClientId = () => {
    setClientData(undefined);
    void clientDataStore.delete();
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
    <GlassBox mb="20px">
      <ClientView clientData={clientData} clearClientId={clearClientId} />
      <LoginView
        clientData={clientData}
        saveClientIdOnSubmit={saveClientIdOnSubmit}
      />
    </GlassBox>
  );
}
