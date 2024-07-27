/*
  Warnings:

  - A unique constraint covering the columns `[category_id]` on the table `Food` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category_id` to the `Food` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Food" ADD COLUMN     "category_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Food_category_id_key" ON "Food"("category_id");

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
