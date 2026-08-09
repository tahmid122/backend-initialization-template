-- CreateTable
CREATE TABLE "promotions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "yearOfExperience" INTEGER NOT NULL,
    "designation" TEXT NOT NULL,
    "image" TEXT,
    "phone" TEXT NOT NULL,
    "description" TEXT,
    "serves" TEXT[],
    "chamber" TEXT,
    "availability" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "promotions_pkey" PRIMARY KEY ("id")
);
