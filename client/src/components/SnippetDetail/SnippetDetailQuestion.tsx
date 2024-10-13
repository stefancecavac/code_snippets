import { codeSnippetQuestionData } from "../../types";
import { ClockIcon, QuestionIcon, UserIcon } from "../IconTypes";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-javascript";
import { useEffect } from "react";

const SnippetDetailQuestion = ({ codeSnippetQuestion }: { codeSnippetQuestion: codeSnippetQuestionData }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return codeSnippetQuestion ? (
    <div className="w-full  mx-auto overflow-hidden shadow-lg bg-white rounded-lg border border-gray-300">
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">{codeSnippetQuestion.question}</h2>
          <div className="flex items-center space-x-2">
            <span className="bg-blue-100 text-blue-800">{codeSnippetQuestion.language}</span>
            <div className="flex items-center text-sm text-gray-500">
              <UserIcon />
              {codeSnippetQuestion.User?.username}
            </div>
          </div>
        </div>

        <div className="pl-4 border-l-2 border-orange-500">
          <p className="text-gray-600">{codeSnippetQuestion.Questiondetail}</p>
        </div>

        <div className="relative">
          <div className="absolute -left-3 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white">
            <QuestionIcon></QuestionIcon>
          </div>
          <pre className="p-4 bg-gray-100 border border-gray-300 rounded-lg overflow-x-auto">
            <code className="text-sm">{codeSnippetQuestion.questionCode}</code>
          </pre>
        </div>

        <div className="flex items-center text-sm text-gray-500 space-x-4">
          <div className="flex items-center">
            <ClockIcon />
            {new Date(codeSnippetQuestion.createdAt!).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
          <div className="flex items-center">
            <ClockIcon />
            {new Date(codeSnippetQuestion.createdAt!).toLocaleDateString([], { year: "numeric", month: "short", day: "numeric" })}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p>Code snippet not found</p>
  );
};

export default SnippetDetailQuestion;
