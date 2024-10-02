import { codeSnippetQuestionData } from "../../types";
import { UserIcon } from "../IconTypes";
import Prism from "prismjs";
import "prismjs/themes/prism.css"; // Optional: Import the Prism CSS for styling
import "prismjs/components/prism-javascript"; // Import the necessary language syntax
import { useEffect } from "react";

const SnippetDetailQuestion = ({ codeSnippetQuestion }: { codeSnippetQuestion: codeSnippetQuestionData }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return codeSnippetQuestion ? (
    <>
      <div className="flex flex-col mb-10">
        <p className="text-3xl pb-5 border-b-2 border-gray-300 font-bold">{codeSnippetQuestion?.question}</p>
        <div className="flex justify-between items-center">
          <span className="px-2 py-0.5 flex items-center rounded-full bg-gray-200 border-2 text-sm text-gray-500">
            {codeSnippetQuestion?.language}
          </span>
          <span className="p-2 text-emerald-500 flex items-center gap-2">
            <UserIcon />
            {codeSnippetQuestion?.User?.username}
          </span>
        </div>
      </div>

      <div className="border-l-2 border-gray-300 flex flex-1 w-full pb-5">
        <div className="flex">
          <div className="flex items-center justify-center size-12 rounded-xl bg-white shadow -ml-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8 text-orange-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
              />
            </svg>
          </div>
        </div>

        <div className="w-full ml-5 rounded-lg px-5">
          <div className="text-orange-500 rounded-lg text-sm flex-1 flex justify-between items-center"></div>
          <div className="text-gray-500 block leading-snug">
            <p className="text-lg">{codeSnippetQuestion?.Questiondetail}</p>
          </div>

          <div className={`mt-3 transition-all  ? "flex"`}>
            <pre className="language-javascript">
              <code>{codeSnippetQuestion.questionCode}</code>
            </pre>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <p className="text-gray-500 text-sm py-1 my-1">
                {new Date(codeSnippetQuestion.createdAt!).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                }) +
                  " · " +
                  new Date(codeSnippetQuestion.createdAt!).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <p>Code snippet not found</p>
  );
};

export default SnippetDetailQuestion;
