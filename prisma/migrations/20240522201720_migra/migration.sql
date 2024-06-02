-- AlterTable
ALTER TABLE "Socials" ALTER COLUMN "radnjaId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Usluga" (
    "id" TEXT NOT NULL,
    "naziv" TEXT NOT NULL,
    "trajanje" DOUBLE PRECISION NOT NULL,
    "slika" TEXT NOT NULL,
    "radnjaId" TEXT,

    CONSTRAINT "Usluga_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Usluga" ADD CONSTRAINT "Usluga_radnjaId_fkey" FOREIGN KEY ("radnjaId") REFERENCES "Radnja"("id") ON DELETE CASCADE ON UPDATE CASCADE;
