/*
  Warnings:

  - You are about to drop the column `code` on the `CodeSnippetAnswer` table. All the data in the column will be lost.
  - You are about to drop the `CodeSnippet` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `answerCode` to the `CodeSnippetAnswer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CodeSnippet" DROP CONSTRAINT "CodeSnippet_userId_fkey";

-- DropForeignKey
ALTER TABLE "CodeSnippetAnswer" DROP CONSTRAINT "CodeSnippetAnswer_codeSnippetId_fkey";

-- AlterTable
ALTER TABLE "CodeSnippetAnswer" DROP COLUMN "code",
ADD COLUMN     "answerCode" TEXT NOT NULL;

-- DropTable
DROP TABLE "CodeSnippet";

-- CreateTable
CREATE TABLE "CodeSnippetQuestion" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "Questiondetail" TEXT NOT NULL,
    "questionCode" TEXT NOT NULL,
    "answered" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "CodeSnippetQuestion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CodeSnippetQuestion" ADD CONSTRAINT "CodeSnippetQuestion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodeSnippetAnswer" ADD CONSTRAINT "CodeSnippetAnswer_codeSnippetId_fkey" FOREIGN KEY ("codeSnippetId") REFERENCES "CodeSnippetQuestion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
