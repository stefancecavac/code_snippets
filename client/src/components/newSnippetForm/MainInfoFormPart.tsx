import { useFormContext } from "react-hook-form";
import { codeSnippetQuestionData } from "../../types";

const MainInfoFormPart = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<codeSnippetQuestionData>();
  return (
    <div className="flex flex-col p-5">
      <label className="text-sky-900 text-xm font-bold flex flex-col gap-1   ">
        Your Question:
        <input
          {...register("question")}
          className={`rounded-lg p-1 px-2 focus:outline-none  border-gray-300 border ${errors.question?.message ? "border-rose-500" : ""} `}
        ></input>
        {errors.question?.message && <span className="text-rose-500 text-xs font-semibold">{errors.question?.message as string}</span>}
      </label>
      <label className="text-sky-900 text-xm font-bold flex flex-col gap-1   ">
        Detailed description:
        <textarea
          {...register("Questiondetail")}
          className={`rounded-lg p-1 resize-none px-2 focus:outline-none h-[15rem]  border-gray-300 border ${
            errors.Questiondetail?.message ? "border-rose-500" : ""
          }`}
        ></textarea>
        {errors.Questiondetail?.message && <span className="text-rose-500 text-xs font-semibold">{errors.Questiondetail?.message as string}</span>}
      </label>
    </div>
  );
};

export default MainInfoFormPart;
