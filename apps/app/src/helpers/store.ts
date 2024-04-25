import { AppClientData } from "@sks/common/types";
import { Store } from "tauri-plugin-store-api";

const store = new Store(".sks-settings.dat");

export const clientDataStore = {
  get: async () => {
    return JSON.parse(
      (await store.get("clientData")) as string
    ) as AppClientData | null;
  },
  set: async (clientData?: AppClientData) => {
    if (!clientData) {
      return;
    }
    await store.set("clientData", JSON.stringify(clientData));
    await store.save();
  },
  delete: async () => {
    await store.delete("clientData");
  },
};
