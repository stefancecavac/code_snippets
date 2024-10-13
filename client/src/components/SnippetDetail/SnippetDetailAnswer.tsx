import { useRateDown, useRateUp } from "../../api/CodeSnippetRatingApi";
import { UseAuthContext } from "../../context/AuthContext";
import { codeSnippetAnswerData } from "../../types";
import { UserIcon } from "../IconTypes";
import { useState } from "react";

const SnippetDetailAnswer = ({ answer }: { answer: codeSnippetAnswerData }) => {
  const { rateUp } = useRateUp();
  const { rateDown } = useRateDown();
  const { user } = UseAuthContext();

  // Local state to manage the updated answer details
  const [localAnswer, setLocalAnswer] = useState<codeSnippetAnswerData>(answer);

  const handleRateUp = async () => {
    const hasRatedUp = answer.rating?.some((rating) => rating.userId === user.userId && rating.ratingType === "positive");
    const hasRatedDown = answer.rating?.some((rating) => rating.userId === user.userId && rating.ratingType === "negative");

    if (hasRatedUp) {
      console.log("User has already rated positively");
      return;
    }

    setLocalAnswer((prev) => ({
      ...prev,
      totalRating: prev.totalRating + (hasRatedDown ? 2 : 1),
      rating: [{ ratingType: "positive", userId: user.userId! }],
    }));

    rateUp({ answerId: answer.id! });
  };

  const handleRateDown = async () => {
    const hasRatedDown = answer.rating?.some((rating) => rating.userId === user.userId && rating.ratingType === "negative");
    const hasRatedUp = answer.rating?.some((rating) => rating.userId === user.userId && rating.ratingType === "positive");

    if (hasRatedDown) {
      console.log("User has already rated negativly");
      return;
    }
    setLocalAnswer((prev) => ({
      ...prev,
      totalRating: prev.totalRating - (hasRatedUp ? 2 : 1),
      rating: [{ ratingType: "negative", userId: user.userId! }],
    }));

    // Call the API to rate down
    rateDown({ answerId: answer.id! });
  };

  return (
    <div className="space-y-4 my-5 bg-white border-l-4 border-green-500 rounded-lg p-4 shadow">
      <div className="flex items-center justify-between space-x-2">
        <div className="flex items-center gap-2">
          <UserIcon />
          <div>
            <h3 className="font-semibold text-emerald-800">{localAnswer.User?.username}</h3>
            <p className="text-sm text-gray-600">
              Answered{" "}
              {new Date(localAnswer.createdAt!).toLocaleString([], {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
        <div className="flex">
          <button
            className={`border-2 p-5 ${
              localAnswer.rating?.some((rating) => rating.userId === user.userId && rating.ratingType === "positive") ? "bg-green-500" : ""
            }`}
            onClick={handleRateUp}
          >
            Rate up
          </button>

          <p>{localAnswer.totalRating}</p>

          <button
            className={`border-2 p-5 ${
              localAnswer.rating?.some((rating) => rating.userId === user.userId && rating.ratingType === "negative") ? "bg-red-500" : ""
            }`}
            onClick={handleRateDown}
          >
            Rate down
          </button>
        </div>
      </div>

      <div className="pl-4 border-l-2 border-gray-500">
        <p className="text-gray-700">{localAnswer.answer}</p>
      </div>

      <div className="relative">
        <div className="absolute -left-3 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-grey-500 text-white"></div>
        <pre className="p-4 bg-gray-100 border border-gray-300 rounded-lg overflow-x-auto ">
          <code className="text-sm text-gray-800">{localAnswer.answerCode}</code>
        </pre>
      </div>
    </div>
  );
};

export default SnippetDetailAnswer;
