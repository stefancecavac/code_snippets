/*
  Warnings:

  - Added the required column `language` to the `CodeSnippet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CodeSnippet" ADD COLUMN     "language" TEXT NOT NULL;
