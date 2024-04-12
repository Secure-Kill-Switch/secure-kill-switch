-- CreateEnum
CREATE TYPE "SKSPossibleActions" AS ENUM ('TURN_OFF');

-- CreateTable
CREATE TABLE "SKSAction" (
    "id" TEXT NOT NULL,
    "action" "SKSPossibleActions" NOT NULL,
    "sKSClientId" TEXT,

    CONSTRAINT "SKSAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SKSClient" (
    "id" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "SKSClient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SKSUser" (
    "id" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "SKSUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SKSAction" ADD CONSTRAINT "SKSAction_sKSClientId_fkey" FOREIGN KEY ("sKSClientId") REFERENCES "SKSClient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
