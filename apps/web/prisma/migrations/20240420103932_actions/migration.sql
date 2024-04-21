-- AlterEnum
ALTER TYPE "SKSPossibleActions" ADD VALUE 'NOTIFICATION';

-- AlterTable
ALTER TABLE "SKSAction" ADD COLUMN     "notificationText" TEXT;
