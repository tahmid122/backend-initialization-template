/*
  Warnings:

  - You are about to alter the column `startPrice` on the `packages` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "packages" ALTER COLUMN "startPrice" SET DEFAULT 0,
ALTER COLUMN "startPrice" SET DATA TYPE INTEGER;
