-- AlterTable
ALTER TABLE "User" ADD COLUMN     "is_admin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_banned" BOOLEAN NOT NULL DEFAULT false;
