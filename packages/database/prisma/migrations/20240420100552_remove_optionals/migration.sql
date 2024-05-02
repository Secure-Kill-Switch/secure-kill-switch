/*
  Warnings:

  - Made the column `sKSClientId` on table `SKSAction` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `SKSClient` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `SKSClient` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `SKSUser` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "SKSAction" DROP CONSTRAINT "SKSAction_sKSClientId_fkey";

-- DropForeignKey
ALTER TABLE "SKSClient" DROP CONSTRAINT "SKSClient_userId_fkey";

-- AlterTable
ALTER TABLE "SKSAction" ALTER COLUMN "sKSClientId" SET NOT NULL;

-- AlterTable
ALTER TABLE "SKSClient" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "SKSUser" ALTER COLUMN "name" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "SKSAction" ADD CONSTRAINT "SKSAction_sKSClientId_fkey" FOREIGN KEY ("sKSClientId") REFERENCES "SKSClient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SKSClient" ADD CONSTRAINT "SKSClient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "SKSUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
