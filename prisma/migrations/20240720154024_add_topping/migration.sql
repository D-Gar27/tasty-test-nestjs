-- CreateTable
CREATE TABLE "Topping" (
    "id" TEXT NOT NULL,
    "food_id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "is_radio" BOOLEAN NOT NULL,
    "items" JSONB NOT NULL,

    CONSTRAINT "Topping_pkey" PRIMARY KEY ("id")
);
