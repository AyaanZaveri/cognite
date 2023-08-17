/*
  Warnings:

  - You are about to drop the `cogs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "cogs";

-- CreateTable
CREATE TABLE "Cog" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL DEFAULT '',
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL DEFAULT '',
    "slug" TEXT NOT NULL,
    "imgUrl" TEXT DEFAULT 'https://github.com/AyaanZaveri/cognite/blob/main/app/icon.png?raw=true',
    "content" TEXT NOT NULL,
    "embeddings" vector(1536),

    CONSTRAINT "Cog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cog_slug_key" ON "Cog"("slug");
