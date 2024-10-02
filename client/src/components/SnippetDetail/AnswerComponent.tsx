import { zodResolver } from "@hookform/resolvers/zod";
import { SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { codeSnippetAnswerData, codeSnippetAnswerSchema } from "../../types";
import { useCreateSnipetAnswer } from "../../api/CodeSnippetAnswerApi";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";

const AnswerComponent = () => {
  const [expanded, setExpanded] = useState(false);
  const [answerCode, setAnswerCode] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<codeSnippetAnswerData>({ resolver: zodResolver(codeSnippetAnswerSchema) });

  const handleCodeChange = (value: SetStateAction<string | undefined>) => {
    setAnswerCode(value as string);
    setValue("answerCode", value as string);
  };

  const { createAnswer } = useCreateSnipetAnswer();

  const handleSubmitAnswer = (data: codeSnippetAnswerData) => {
    createAnswer(data);
  };

  return (
    <div className="hover:cursor-pointer mb-10 flex w-full items-center border-2 border-gray-300 justify-center rounded-lg px-1 py-2   text-gray-500 ">
      {expanded ? (
        <form onSubmit={handleSubmit(handleSubmitAnswer)} className="flex flex-col w-full p-5">
          <label className="text-sky-900 text-xm font-bold flex flex-col gap-1   ">
            Your Answer:
            <input
              {...register("answer")}
              className={`rounded-lg p-1 px-2 focus:outline-none  border-gray-300 border ${errors.answer?.message ? "border-rose-500" : ""} `}
            ></input>
            {errors.answer?.message && <span className="text-rose-500 text-xs font-semibold">{errors.answer?.message as string}</span>}
          </label>
          <div className=" rounded-lg overflow-hidden mt-2 p-2 border-gray-300 border ">
            Your code:
            <Editor padding={10} highlight={(code) => highlight(code, languages.js, "js")} value={answerCode} onValueChange={handleCodeChange} />
            {errors.answerCode?.message && <span className="text-rose-500 text-xs font-semibold">{errors.answerCode?.message as string}</span>}
          </div>
          <div className="flex justify-end items-center">
            <button onClick={() => setExpanded((prev) => !prev)} type="button">
              Cancel
            </button>

            <button type="submit">Submit</button>
          </div>
        </form>
      ) : (
        <span onClick={() => setExpanded((prev) => !prev)}>Add your answer</span>
      )}
    </div>
  );
};

export default AnswerComponent;
