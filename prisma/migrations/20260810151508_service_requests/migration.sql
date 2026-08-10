-- CreateEnum
CREATE TYPE "ServiceRequestType" AS ENUM ('CUSTOM', 'PACKAGE');

-- CreateEnum
CREATE TYPE "ServiceRequestStatus" AS ENUM ('REQUESTED', 'PAYMENT_PENDING', 'CONFIRMED', 'COMPLETED');

-- CreateTable
CREATE TABLE "serviceRequests" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "ServiceRequestType" NOT NULL,
    "status" "ServiceRequestStatus" NOT NULL DEFAULT 'REQUESTED',
    "description" TEXT,
    "packageId" TEXT,
    "contactInfo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "serviceRequests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "serviceRequests" ADD CONSTRAINT "serviceRequests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "serviceRequests" ADD CONSTRAINT "serviceRequests_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "packages"("id") ON DELETE SET NULL ON UPDATE CASCADE;
