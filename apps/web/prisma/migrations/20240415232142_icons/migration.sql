-- CreateEnum
CREATE TYPE "ClientIcons" AS ENUM ('laptop', 'desktop', 'mac', 'linux', 'windows');

-- AlterTable
ALTER TABLE "SKSClient" ADD COLUMN     "icon" "ClientIcons" NOT NULL DEFAULT 'laptop';
