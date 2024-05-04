"use client";
import { dbRealtime } from "@/helpers/realtime";
import { SKSAction, SKSPossibleActions } from "@sks/database";
import { sendNotification } from "@tauri-apps/api/notification";
import { invoke } from "@tauri-apps/api/tauri";

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
    if (
      action.action === SKSPossibleActions.NOTIFICATION &&
      action.notificationText
    ) {
      sendNotification({
        title: "Secure Kill Switch",
        body: action.notificationText,
        sound: "default",
      });
      actionsExecuted.push(action);
    }
    if (action.action === SKSPossibleActions.TURN_OFF) {
      sendNotification({
        title: "Secure Kill Switch",
        body: "Received turn off command. Shutting down the computer in 5 seconds.",
        sound: "default",
      });
      actionsExecuted.push(action);
      setTimeout(() => {
        invoke("shutdown_system");
      }, 5000);
    }
  });
  await markActionsAsExecuted(actionsExecuted);
};
