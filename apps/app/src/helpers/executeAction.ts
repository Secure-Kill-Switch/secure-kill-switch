"use client";
import { dbRealtime } from "@/helpers/realtime";
import { SKSAction } from "@sks/database";
import { sendNotification } from "@tauri-apps/api/notification";

export const markActionsAsExecuted = async (
  executedActionsList: SKSAction[]
) => {
  if (!executedActionsList.length) {
    return;
  }
  await dbRealtime.from("SKSAction").upsert(
    executedActionsList.map((action) => ({
      ...action,
      isExecuted: true,
    }))
  );
};

export const executeActions = async (actions?: SKSAction[]) => {
  const actionsExecuted: SKSAction[] = [];
  if (!actions) {
    return;
  }
  actions?.forEach((action) => {
    if (!action || action.isExecuted) {
      return;
    }
    if (action.notificationText) {
      sendNotification({
        title: "Secure Kill Switch Notification",
        body: action.notificationText,
        sound: "default",
      });
      actionsExecuted.push(action);
    }
  });
  await markActionsAsExecuted(actionsExecuted);
};
