import { SKSAction, SKSClient } from "@prisma/client";

export type ClientWithActions = SKSClient & {
  actions: Omit<SKSAction, "sKSClientId">[];
};
