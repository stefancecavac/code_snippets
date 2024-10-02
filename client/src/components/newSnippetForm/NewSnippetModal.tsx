import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { SetStateAction, useState } from "react";
import { createPortal } from "react-dom";
import { codeSnippetQuestionData, codeSnippetQuestionSchema } from "../../types";
import { useCreateSnipetQuestion } from "../../api/CodeSnippetQuestionApi";
import { CloseIcon } from "../IconTypes";
import MainInfoFormPart from "./MainInfoFormPart";
import CodeFormPart from "./CodeFormPart";
import { UseAuthContext } from "../../context/AuthContext";
import StepsComponent from "./StepsComponent";

const NewSnippetModal = ({
  createSnippetModal,
  setCreateSnippetModal,
}: {
  createSnippetModal: boolean;
  setCreateSnippetModal: (value: boolean) => void;
}) => {
  const { user } = UseAuthContext();
  const [page, setPage] = useState<number>(1);
  const [questionCode, setQuestionCode] = useState<string>("");
  const { createSnippetQuestion } = useCreateSnipetQuestion();

  const methods = useForm<codeSnippetQuestionData>({
    resolver: zodResolver(codeSnippetQuestionSchema),
  });

  const { handleSubmit, trigger, resetField } = methods;

  const handleCodeChange = (value: SetStateAction<string | undefined>) => {
    setQuestionCode(value as string);
  };

  const handleCreateSnippet = ({ Questiondetail, language, question }: codeSnippetQuestionData) => {
    if (!user?.userId) {
      console.error("User ID is missing");
      return;
    }
    createSnippetQuestion({
      Questiondetail,
      language,
      question,
      questionCode,
      userId: user.userId,
    });
    setCreateSnippetModal(false);
    resetField("Questiondetail");
    resetField("question");
    resetField("language");
    setQuestionCode("");
    setPage(1);
  };

  const handleNextPage = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const isStepValid = await trigger(["Questiondetail", "question"]);
    if (isStepValid) {
      setPage((prev) => (prev < 2 ? prev + 1 : prev));
    }
  };

  const handlePrevPage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const closeFunction = () => {
    setCreateSnippetModal(false);
    resetField("Questiondetail");
    resetField("question");
    resetField("language");
    setQuestionCode("");
    setPage(1);
  };

  return (
    createSnippetModal &&
    createPortal(
      <div className="flex justify-center items-center fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-50">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleCreateSnippet)} className="bg-white rounded-lg w-3/6 overflow-hidden">
            <div className="flex justify-between items-center text-white p-3 bg-sky-900">
              <h2 className="font-bold text-2xl">Create New Code Snippet</h2>
              <CloseIcon closeFunction={closeFunction} />
            </div>

            <StepsComponent page={page} />
            {page === 1 && <MainInfoFormPart />}
            {page === 2 && <CodeFormPart handleCodeChange={handleCodeChange} />}

            <div className="px-5 py-3 flex justify-end gap-5">
              {page > 1 && (
                <button
                  onClick={handlePrevPage}
                  type="button"
                  className="text-lg rounded-lg px-2 py-1 bg-gray-200 border-2 border-gray-200 text-gray-500 transition-all"
                >
                  Back
                </button>
              )}
              {page !== 2 ? (
                <button
                  onClick={handleNextPage}
                  type="button"
                  className="text-lg rounded-lg px-3 py-1 bg-emerald-500 border-2 border-emerald-500 text-white hover:bg-emerald-100 hover:text-emerald-500 transition-all"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="text-lg rounded-lg px-3 py-1 bg-emerald-500 border-2 border-emerald-500 text-white hover:bg-emerald-100 hover:text-emerald-500 transition-all"
                >
                  Post Snippet
                </button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>,
      document.body
    )
  );
};

export default NewSnippetModal;
