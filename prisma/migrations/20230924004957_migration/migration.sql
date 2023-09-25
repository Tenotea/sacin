/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Event` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "code" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Event_code_key" ON "Event"("code");
