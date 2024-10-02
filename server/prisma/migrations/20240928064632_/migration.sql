/*
  Warnings:

  - Added the required column `question` to the `CodeSnippet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CodeSnippet" ADD COLUMN     "question" TEXT NOT NULL;
