/*
  Warnings:

  - You are about to drop the column `content` on the `Cog` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Cog` table. All the data in the column will be lost.
  - You are about to drop the column `embeddings` on the `Cog` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Cog` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Cog" DROP COLUMN "content",
DROP COLUMN "date",
DROP COLUMN "embeddings",
DROP COLUMN "type",
ADD COLUMN     "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "username" TEXT NOT NULL,
ALTER COLUMN "email" SET NOT NULL;

-- CreateTable
CREATE TABLE "Embeddings" (
    "id" SERIAL NOT NULL,
    "content" TEXT,
    "cog_id" INTEGER NOT NULL,
    "embedding" vector,

    CONSTRAINT "Embeddings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Embeddings_content_cog_id_key" ON "Embeddings"("content", "cog_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Embeddings" ADD CONSTRAINT "Embeddings_cog_id_fkey" FOREIGN KEY ("cog_id") REFERENCES "Cog"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
