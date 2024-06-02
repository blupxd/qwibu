/*
  Warnings:

  - You are about to drop the column `address` on the `Radnja` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Radnja` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Radnja` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logo` to the `Radnja` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Radnja" DROP COLUMN "address",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "logo" TEXT NOT NULL,
ADD COLUMN     "telephone" TEXT;

-- CreateTable
CREATE TABLE "Socials" (
    "id" TEXT NOT NULL,
    "facebook" TEXT,
    "instagram" TEXT,
    "linkedin" TEXT,
    "tiktok" TEXT,
    "radnjaId" TEXT NOT NULL,

    CONSTRAINT "Socials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adresa" (
    "id" TEXT NOT NULL,
    "zemlja" TEXT NOT NULL,
    "ulica" TEXT NOT NULL,
    "grad" TEXT NOT NULL,
    "broj" TEXT NOT NULL,
    "radnjaId" TEXT NOT NULL,

    CONSTRAINT "Adresa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Radnja_email_key" ON "Radnja"("email");

-- AddForeignKey
ALTER TABLE "Socials" ADD CONSTRAINT "Socials_radnjaId_fkey" FOREIGN KEY ("radnjaId") REFERENCES "Radnja"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adresa" ADD CONSTRAINT "Adresa_radnjaId_fkey" FOREIGN KEY ("radnjaId") REFERENCES "Radnja"("id") ON DELETE CASCADE ON UPDATE CASCADE;
