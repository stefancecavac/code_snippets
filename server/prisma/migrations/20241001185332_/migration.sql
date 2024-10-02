-- CreateTable
CREATE TABLE "CodeSnippetAnswer" (
    "id" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "correct" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "codeSnippetId" TEXT,

    CONSTRAINT "CodeSnippetAnswer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CodeSnippetAnswer" ADD CONSTRAINT "CodeSnippetAnswer_codeSnippetId_fkey" FOREIGN KEY ("codeSnippetId") REFERENCES "CodeSnippet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
