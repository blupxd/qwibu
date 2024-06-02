-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_radnjaId_fkey";

-- DropForeignKey
ALTER TABLE "Radnja" DROP CONSTRAINT "Radnja_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_radnjaId_fkey";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_radnjaId_fkey" FOREIGN KEY ("radnjaId") REFERENCES "Radnja"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Radnja" ADD CONSTRAINT "Radnja_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_radnjaId_fkey" FOREIGN KEY ("radnjaId") REFERENCES "Radnja"("id") ON DELETE CASCADE ON UPDATE CASCADE;
