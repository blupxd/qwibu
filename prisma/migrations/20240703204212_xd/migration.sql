-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "radnjaId" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "workerId" TEXT NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_clientId_key" ON "Schedule"("clientId");

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_radnjaId_fkey" FOREIGN KEY ("radnjaId") REFERENCES "Radnja"("id") ON DELETE CASCADE ON UPDATE CASCADE;
