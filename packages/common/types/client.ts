import {
  ClientIcons,
  SKSAction,
  SKSClient,
  SKSPossibleActions,
} from "@prisma/client";

export type ClientWithActions = SKSClient & {
  actions: Omit<SKSAction, "sKSClientId">[];
};

export type PingResponseType = {
  actions: {
    id: string;
    action: SKSPossibleActions;
    notificationText: string | null;
    isExecuted: boolean;
    sKSClientId: string;
  }[];
  id: string;
  name: string;
  userId: string;
  lastActive: Date | null;
  icon: ClientIcons;
};

export type AppClientData = {
  id: string;
  name: string;
  icon: ClientIcons;
  actions: {
    id: string;
    action: SKSPossibleActions;
    notificationText: string | null;
    isExecuted: boolean;
  }[];
};
