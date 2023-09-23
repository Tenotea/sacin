/*
  Warnings:

  - A unique constraint covering the columns `[emailAddress]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Admin_emailAddress_key" ON "Admin"("emailAddress");
