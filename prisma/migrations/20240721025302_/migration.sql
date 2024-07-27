/*
  Warnings:

  - You are about to drop the column `items` on the `Topping` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Topping" DROP COLUMN "items";

-- CreateTable
CREATE TABLE "ToppingItem" (
    "id" TEXT NOT NULL,
    "topping_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "add_on_price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ToppingItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ToppingItem" ADD CONSTRAINT "ToppingItem_topping_id_fkey" FOREIGN KEY ("topping_id") REFERENCES "Topping"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
