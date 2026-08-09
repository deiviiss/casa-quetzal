-- CreateEnum
CREATE TYPE "IneStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "inePublicId" TEXT,
ADD COLUMN     "ineStatus" "IneStatus",
ADD COLUMN     "ineUploadedAt" TIMESTAMP(3),
ADD COLUMN     "ineUrl" TEXT;
