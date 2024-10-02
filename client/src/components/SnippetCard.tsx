import { Link } from "react-router-dom";
import { codeSnippetQuestionData } from "../types";
import { UserIcon } from "./IconTypes";

const SnippetCard = ({ question }: { question: codeSnippetQuestionData }) => {
  return (
    <Link to={`/${question.id}`}>
      <div className=" border-2 border-gray-200    flex flex-col   p-3  justify-between  rounded-lg  transition-all">
        <h3 className="font-bold mt-px text-2xl ml-2">{question.question}</h3>
        <span className="bg-emerald-100 text-emerald-700 rounded-full px-3 py-1 w-fit my-3 text-sm">{question.language}</span>
        <div className="flex items-center justify-between  mt-2 ">
          <span className="text-emerald-500 ml-2 flex items-center gap-2   ">
            <UserIcon></UserIcon>
            {question.User?.username}
          </span>
          <span className="text-slate-600 text-sm flex gap-1 items-center">
            {new Date(question.createdAt!).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            }) +
              " · " +
              new Date(question.createdAt!).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default SnippetCard;
