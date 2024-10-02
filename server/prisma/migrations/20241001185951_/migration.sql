-- AlterTable
ALTER TABLE "CodeSnippetAnswer" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "CodeSnippetAnswer" ADD CONSTRAINT "CodeSnippetAnswer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
