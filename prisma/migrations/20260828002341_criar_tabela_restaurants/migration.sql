-- CreateTable
CREATE TABLE "Restaurant" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "category" VARCHAR(100),
    "rating" DECIMAL(2,1),

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);
