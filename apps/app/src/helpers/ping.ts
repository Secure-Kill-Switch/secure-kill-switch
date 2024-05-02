import { AppClientData, PingResponseType } from "@sks/common/types";

export async function ping(clientId?: string) {
  if (!clientId) {
    return;
  }
  const pingData = (await (
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ping/${clientId}`, {
      method: "GET",
    })
  ).json()) as PingResponseType;
  return {
    actions: pingData.actions,
    id: pingData.id,
    name: pingData.name,
    icon: pingData.icon,
  } as AppClientData;
}
