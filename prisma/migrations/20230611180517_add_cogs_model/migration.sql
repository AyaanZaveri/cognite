/*
  Warnings:

  - You are about to drop the column `content` on the `Document` table. All the data in the column will be lost.
  - Added the required column `title` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Document" DROP COLUMN "content",
ADD COLUMN     "cogsId" INTEGER,
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Cogs" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Cogs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_cogsId_fkey" FOREIGN KEY ("cogsId") REFERENCES "Cogs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
