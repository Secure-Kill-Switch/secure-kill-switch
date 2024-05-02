import { executeActions } from "@/helpers/executeAction";
import { ping } from "@/helpers/ping";
import { dbRealtime } from "@/helpers/realtime";
import { clientDataStore } from "@/helpers/store";
import { Box, Divider } from "@mantine/core";
import { AppClientData } from "@sks/common/types";
import { SKSAction, SKSClient } from "@sks/database";
import { REALTIME_LISTEN_TYPES } from "@supabase/supabase-js";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const RealtimeComponent = ({
  clientData,
  setClientData,
}: {
  clientData: AppClientData;
  setClientData: Dispatch<SetStateAction<AppClientData | undefined>>;
}) => {
  const [actions, setActions] = useState<SKSAction[]>([]);
  useEffect(() => {
    executeActions(actions);
  }, [actions]);
  const handlePingData = (pingClientData?: AppClientData) => {
    setClientData(pingClientData);
    executeActions(pingClientData?.actions as SKSAction[]);
    void clientDataStore.set(pingClientData);
  };
  useEffect(() => {
    const actionsConnection = dbRealtime
      .channel(`realtime-actions:${clientData.id}`)
      .on(
        REALTIME_LISTEN_TYPES.POSTGRES_CHANGES,
        {
          event: "INSERT",
          schema: "public",
          table: "SKSAction",
          filter: `sKSClientId=eq.${clientData.id}`,
        },
        (payload: { new: SKSAction }) => {
          setActions((prev) => [...prev, payload.new]);
        }
      )
      .subscribe((info) => {
        console.log("Realtime actions connection info", info);
      });
    const updatesConnection = dbRealtime
      .channel(`realtime-updates:${clientData.id}`)
      .on(
        REALTIME_LISTEN_TYPES.POSTGRES_CHANGES,
        {
          event: "UPDATE",
          schema: "public",
          table: "SKSClient",
          filter: `id=eq.${clientData.id}`,
        },
        (payload: { new: SKSClient }) => {
          if (payload.new.name !== clientData.name) {
            setClientData({ ...clientData, ...payload.new });
          }
        }
      )
      .subscribe((info) => {
        console.log("Realtime updates connection info", info);
      });
    return () => {
      actionsConnection.unsubscribe();
      updatesConnection.unsubscribe();
    };
  }, []);
  useEffect(() => {
    const pingInterval = setInterval(() => {
      ping(clientData.id).then(handlePingData);
    }, 50 * 1000);
    return () => {
      clearInterval(pingInterval);
    };
  }, []);
  if (process.env.NEXT_PUBLIC_DEBUG_REALTIME) {
    return (
      <Box>
        <Divider mt="20px" mb="10px" />
        <h1>Realtime messagess</h1>
        <div>
          {actions.map((action, index) => (
            <pre key={index}>{JSON.stringify(action, null, 2)}</pre>
          ))}
        </div>
      </Box>
    );
  }
  return null;
};
