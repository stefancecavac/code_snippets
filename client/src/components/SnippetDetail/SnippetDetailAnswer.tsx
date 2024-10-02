import { codeSnippetAnswerData } from "../../types";
import { UserIcon } from "../IconTypes";

const SnippetDetailAnswer = ({ answer }: { answer: codeSnippetAnswerData }) => {
  return (
    <div className="border-l-2 border-gray-300 flex flex-1 w-full pb-5  ">
      <div className="flex   ">
        <div className="flex items-center justify-center size-12 rounded-xl bg-white shadow  -ml-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
      </div>

      <div className="  w-full ml-5  px-5   ">
        <div className="text-gray-500 rounded-lg  flex-1 flex flex-col  ">
          <span className=" my-2 text-emerald-500 flex items-center gap-2 ">
            <UserIcon></UserIcon>
            {answer?.User?.username}
          </span>
          <p className="text-lg">{answer?.answer}</p>
        </div>
        <div className=" text-gray-500 block leading-snug    "></div>

        <div className={`  mt-3 max-w-full  transition-all "flex"`}>
          <pre className="language-javascript  ">
            <code className="text-sm">{answer.answerCode}</code>
          </pre>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <p className="text-gray-500 text-sm py-1 my-1">
              {new Date(answer.createdAt!).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              }) +
                " · " +
                new Date(answer.createdAt!).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnippetDetailAnswer;
