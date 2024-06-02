/*
  Warnings:

  - You are about to drop the `Adresa` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `adresa` to the `Radnja` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Adresa" DROP CONSTRAINT "Adresa_radnjaId_fkey";

-- AlterTable
ALTER TABLE "Radnja" ADD COLUMN     "adresa" TEXT NOT NULL;

-- DropTable
DROP TABLE "Adresa";
