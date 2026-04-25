-- CreateTable
CREATE TABLE "ingredients" (
    "id" SERIAL NOT NULL,
    "serialNumber" INTEGER NOT NULL,
    "categoryType" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "specification" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredient_substitutes" (
    "id" SERIAL NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,

    CONSTRAINT "ingredient_substitutes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ingredients_serialNumber_key" ON "ingredients"("serialNumber");

-- AddForeignKey
ALTER TABLE "ingredient_substitutes" ADD CONSTRAINT "ingredient_substitutes_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
