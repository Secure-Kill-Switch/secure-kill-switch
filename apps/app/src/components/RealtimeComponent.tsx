import { executeAction } from "@/helpers/executeAction";
import { dbRealtime } from "@/helpers/realtime";
import { SKSAction } from "@sks/database/generated/prisma-client";
import { useEffect, useState } from "react";

export const RealtimeComponent = ({ clientId }: { clientId: string }) => {
  const [actions, setActions] = useState<SKSAction[]>([]);
  useEffect(() => {
    actions.map(executeAction);
  }, [actions]);
  useEffect(() => {
    const realtimeConnection = dbRealtime
      .channel(`realtime:${clientId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "SKSAction",
          filter: `sKSClientId=eq.${clientId}`,
        },
        (payload: { new: SKSAction }) => {
          setActions((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();
    return () => {
      realtimeConnection.unsubscribe();
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
