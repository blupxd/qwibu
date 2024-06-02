/*
  Warnings:

  - Added the required column `interval` to the `Radnja` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Radnja" ADD COLUMN     "interval" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "Smena" (
    "id" TEXT NOT NULL,
    "pocetak" TEXT NOT NULL,
    "kraj" TEXT NOT NULL,
    "radnjaId" TEXT,

    CONSTRAINT "Smena_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dan" (
    "id" TEXT NOT NULL,
    "dan" TEXT NOT NULL,
    "pocetak" TEXT NOT NULL,
    "kraj" TEXT NOT NULL,
    "radnjaId" TEXT,

    CONSTRAINT "Dan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Smena" ADD CONSTRAINT "Smena_radnjaId_fkey" FOREIGN KEY ("radnjaId") REFERENCES "Radnja"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dan" ADD CONSTRAINT "Dan_radnjaId_fkey" FOREIGN KEY ("radnjaId") REFERENCES "Radnja"("id") ON DELETE CASCADE ON UPDATE CASCADE;
