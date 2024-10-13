/*
  Warnings:

  - You are about to drop the column `rating` on the `CodeSnippetAnswer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CodeSnippetAnswer" DROP COLUMN "rating";

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "ratingType" TEXT NOT NULL,
    "codeSnippetAnswerId" TEXT,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_codeSnippetAnswerId_fkey" FOREIGN KEY ("codeSnippetAnswerId") REFERENCES "CodeSnippetAnswer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
