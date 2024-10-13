import { Link } from "react-router-dom";
import { codeSnippetQuestionData } from "../types";
import { ChevronRightIcon, ClockIcon, MessageCircleIcon, ReputationIcon, TrendingUpIcon } from "./IconTypes";

const SnippetCard = ({ question }: { question: codeSnippetQuestionData }) => {
  return (
    <div className="w-full mx-auto ">
      <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="p-3 relative">
          <div className="flex items-center justify-between mb-4">
            <span className="inline-block bg-sky-950 text-white rounded-full px-3 py-1 text-sm font-medium shadow-sm">{question.language}</span>
            <span className="text-gray-500 text-sm flex items-center gap-1">
              <ClockIcon />
              {new Date(question.createdAt!).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <h3 className="font-bold text-2xl text-gray-800 mb-3 leading-tight">{question.question}</h3>
          <p className="text-gray-600 mb-4">{question.Questiondetail}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {question?.tags?.map((tag, index) => (
              <span key={index} className="bg-blue-100 text-sky-950 rounded-full px-2 py-1 text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="flex items-center gap-1 mr-4">
              <MessageCircleIcon /> {question?._count?.answers} answers
            </span>
            <span className="flex items-center gap-1">
              <TrendingUpIcon />
              73 views
            </span>
          </div>
        </div>
        <div className="bg-gradient-to-r from-sky-950 to-emerald-500 px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-white font-medium flex items-center gap-2">
              <div className="w-8 h-8  rounded-full overflow-hidden  bg-gray-300  ">
                <img src="/placeholder.jpeg" alt={question?.User?.username} />
              </div>
              {question?.User?.username}
            </span>
            <span className="text-white text-sm bg-white bg-opacity-20 rounded-full px-2 py-1 flex items-center gap-1">
              Rep: {question.User?.reputation}
              <ReputationIcon></ReputationIcon>
            </span>
          </div>
          <Link
            to={`/${question.id}`}
            className="bg-white text-sky-950 hover:bg-opacity-90 transition-all duration-200 rounded-full px-4 py-1 flex items-center gap-1 text-sm font-medium"
          >
            View Full Question
            <ChevronRightIcon />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SnippetCard;
