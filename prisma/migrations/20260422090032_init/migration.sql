-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'NURSE', 'DOCTOR', 'OFFICE_CLERK', 'KITCHEN_CLERK');

-- CreateEnum
CREATE TYPE "DietStatus" AS ENUM ('PENDING', 'APPROVED', 'FROZEN');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'SENT', 'CONFIRMED', 'REJECTED');

-- CreateTable
CREATE TABLE "staff" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "NIC" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "ward" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wards" (
    "id" SERIAL NOT NULL,
    "wardName" TEXT NOT NULL,
    "totalBeds" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patients" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "weight" DOUBLE PRECISION,
    "height" DOUBLE PRECISION,
    "allergy" TEXT,
    "symptoms" TEXT,
    "address" TEXT,
    "admittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dischargedAt" TIMESTAMP(3),
    "wardId" INTEGER NOT NULL,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "diet_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "diet_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "food_groups" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "substitution" TEXT,

    CONSTRAINT "food_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "diet_scales" (
    "id" SERIAL NOT NULL,
    "morningQty" DOUBLE PRECISION NOT NULL,
    "lunchQty" DOUBLE PRECISION NOT NULL,
    "dinnerQty" DOUBLE PRECISION NOT NULL,
    "dietTypeId" INTEGER NOT NULL,
    "foodGroupId" INTEGER NOT NULL,

    CONSTRAINT "diet_scales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "diet_prescriptions" (
    "id" SERIAL NOT NULL,
    "status" "DietStatus" NOT NULL DEFAULT 'PENDING',
    "extraItem" TEXT,
    "prescribedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "patientId" INTEGER NOT NULL,
    "dietTypeId" INTEGER NOT NULL,
    "doctorId" INTEGER,
    "nurseId" INTEGER,

    CONSTRAINT "diet_prescriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ward_summaries" (
    "id" SERIAL NOT NULL,
    "generatedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dietCountByType" JSONB NOT NULL,
    "totalPatients" INTEGER NOT NULL,
    "mealCycle" TEXT NOT NULL,
    "wardId" INTEGER NOT NULL,
    "clerkId" INTEGER,

    CONSTRAINT "ward_summaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredient_orders" (
    "id" SERIAL NOT NULL,
    "orderDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mealCycle" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "totalQuantityRequired" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "isEmergency" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ingredient_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_receipts" (
    "id" SERIAL NOT NULL,
    "itemCode" TEXT NOT NULL,
    "quantityReceived" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "receivedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orderId" INTEGER NOT NULL,
    "clerkId" INTEGER,

    CONSTRAINT "item_receipts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "staff_email_key" ON "staff"("email");

-- CreateIndex
CREATE UNIQUE INDEX "staff_NIC_key" ON "staff"("NIC");

-- CreateIndex
CREATE UNIQUE INDEX "wards_wardName_key" ON "wards"("wardName");

-- CreateIndex
CREATE UNIQUE INDEX "diet_types_name_key" ON "diet_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "food_groups_name_key" ON "food_groups"("name");

-- CreateIndex
CREATE UNIQUE INDEX "diet_scales_dietTypeId_foodGroupId_key" ON "diet_scales"("dietTypeId", "foodGroupId");

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_wardId_fkey" FOREIGN KEY ("wardId") REFERENCES "wards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diet_scales" ADD CONSTRAINT "diet_scales_dietTypeId_fkey" FOREIGN KEY ("dietTypeId") REFERENCES "diet_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diet_scales" ADD CONSTRAINT "diet_scales_foodGroupId_fkey" FOREIGN KEY ("foodGroupId") REFERENCES "food_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diet_prescriptions" ADD CONSTRAINT "diet_prescriptions_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diet_prescriptions" ADD CONSTRAINT "diet_prescriptions_dietTypeId_fkey" FOREIGN KEY ("dietTypeId") REFERENCES "diet_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diet_prescriptions" ADD CONSTRAINT "diet_prescriptions_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diet_prescriptions" ADD CONSTRAINT "diet_prescriptions_nurseId_fkey" FOREIGN KEY ("nurseId") REFERENCES "staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ward_summaries" ADD CONSTRAINT "ward_summaries_wardId_fkey" FOREIGN KEY ("wardId") REFERENCES "wards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ward_summaries" ADD CONSTRAINT "ward_summaries_clerkId_fkey" FOREIGN KEY ("clerkId") REFERENCES "staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_receipts" ADD CONSTRAINT "item_receipts_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "ingredient_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_receipts" ADD CONSTRAINT "item_receipts_clerkId_fkey" FOREIGN KEY ("clerkId") REFERENCES "staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;
