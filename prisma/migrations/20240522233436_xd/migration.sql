-- DropForeignKey
ALTER TABLE "Radnja" DROP CONSTRAINT "Radnja_ownerId_fkey";

-- AddForeignKey
ALTER TABLE "Radnja" ADD CONSTRAINT "Radnja_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
