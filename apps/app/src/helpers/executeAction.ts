import { AppClientData } from "@sks/common/types";
import { sendNotification } from "@tauri-apps/api/notification";

export const executeAction = async (
  action: AppClientData["actions"][number]
) => {
  if (action.isExecuted) {
    return;
  }
  if (action.notificationText) {
    sendNotification({
      title: "Secure Kill Switch Notification",
      body: action.notificationText,
      sound: "default",
    });
  }
};
