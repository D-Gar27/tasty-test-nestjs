-- AddForeignKey
ALTER TABLE "Topping" ADD CONSTRAINT "Topping_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
