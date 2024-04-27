import { executeActions } from "@/helpers/executeAction";
import { dbRealtime } from "@/helpers/realtime";
import { AppClientData } from "@sks/common/types";
import { SKSAction } from "@sks/database/generated/prisma-client";
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
  useEffect(() => {
    const actionsConnection = dbRealtime
      .channel(`realtime:${clientData.id}`)
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
      );
    return () => {
      actionsConnection.unsubscribe();
    };
  }, []);
  if (process.env.NEXT_PUBLIC_DEBUG_REALTIME) {
    return (
      <div>
        <h1>Realtime messagess</h1>
        <div>
          {actions.map((action, index) => (
            <pre key={index}>{JSON.stringify(action, null, 2)}</pre>
          ))}
        </div>
      </div>
    );
  }
  return null;
};
