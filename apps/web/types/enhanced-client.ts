import { SKSAction, SKSClient } from "@sks/database/generated/prisma-client";

export type ClientWithActions = SKSClient & {
  actions: Omit<SKSAction, "sKSClientId">[];
};
