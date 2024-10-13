import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SetStateAction, useState } from "react";
import { createPortal } from "react-dom";
import { codeSnippetQuestionData, codeSnippetQuestionSchema } from "../../types";
import { useCreateSnipetQuestion } from "../../api/CodeSnippetQuestionApi";
import { UseAuthContext } from "../../context/AuthContext";
import { Editor } from "@monaco-editor/react";
import { CloseIcon } from "../IconTypes";

const NewSnippetModal = ({
  createSnippetModal,
  setCreateSnippetModal,
}: {
  createSnippetModal: boolean;
  setCreateSnippetModal: (value: boolean) => void;
}) => {
  const { user } = UseAuthContext();
  const [questionCode, setQuestionCode] = useState<string>("");
  const { createSnippetQuestion } = useCreateSnipetQuestion();

  const {
    handleSubmit,
    register,
    resetField,
    formState: { errors },
  } = useForm<codeSnippetQuestionData>({
    resolver: zodResolver(codeSnippetQuestionSchema),
  });

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  console.log(tags);

  const handleAddTag = () => {
    if (tags.length >= 5) {
      return;
    }
    setTags([...tags, tagInput]);
    setTagInput("");
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleCodeChange = (value: SetStateAction<string | undefined>) => {
    setQuestionCode(value as string);
  };

  const handleCreateSnippet = ({ Questiondetail, language, question }: codeSnippetQuestionData) => {
    if (!user?.userId) {
      console.error("User ID is missing");
      return;
    }
    console.log("tags", tags);
    createSnippetQuestion({
      Questiondetail,
      language,
      question,
      questionCode,
      tags,
      userId: user.userId,
    });
    setCreateSnippetModal(false);
    resetField("Questiondetail");
    resetField("question");
    resetField("language");
    setQuestionCode("");
  };

  const closeFunction = () => {
    setCreateSnippetModal(false);
    resetField("Questiondetail");
    resetField("question");
    resetField("language");
    setQuestionCode("");
  };

  const [toggleCode, setToggleCode] = useState(false);

  return (
    createSnippetModal &&
    createPortal(
      <div className="h-full  bg-black/50 fixed inset-0 flex items-center justify-center p-4 z-50">
        <div className="w-full min-h-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden relative">
          <div className="absolute top-5 right-5">
            <CloseIcon closeFunction={closeFunction}></CloseIcon>
          </div>
          <div className="bg-sky-950 p-6 text-center relative">
            <h2 className="text-3xl font-bold text-white mb-2">Ask a Question</h2>
            <p className="text-emerald-500">Get help from the community</p>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-sky-950 via-emerald-500 to-sky-950"></div>
          </div>
          <form onSubmit={handleSubmit(handleCreateSnippet)} className="space-y-6 py-5 px-8">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium text-sky-950">
                Title
              </label>
              <input
                {...register("question")}
                id="title"
                placeholder="e.g. How to center a div in CSS?"
                className="w-full border p-1 rounded-lg placeholder:text-sm border-sky-950  focus:outline-none "
              />
              <p className="text-xs text-gray-600">Be specific and imagine you're asking a question to another person.</p>
            </div>

            <div className="space-y-2">
              <div className="bg-gray-100 p-1 flex justify-between rounded-lg gap-2">
                <button
                  onClick={() => setToggleCode((prev) => !prev)}
                  type="button"
                  className={`w-full ${toggleCode ? "text-gray-500" : "bg-white shadow-sm"}  rounded-lg`}
                >
                  Description
                </button>
                <button
                  onClick={() => setToggleCode((prev) => !prev)}
                  type="button"
                  className={`w-full ${toggleCode ? "bg-white shadow-sm" : "text-gray-500"}  rounded-lg`}
                >
                  Code Snippet
                </button>
              </div>
              {toggleCode ? (
                <div className=" border p-1 rounded-lg  border-sky-950   ">
                  <Editor
                    width={"100%"}
                    height={"25vh"}
                    theme="light"
                    options={{
                      lineNumbers: "on",
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      fontSize: 12,
                      renderWhitespace: "none",
                      readOnly: false,
                      cursorBlinking: "smooth",
                      wordWrap: "on",
                      renderLineHighlight: "none",
                      renderValidationDecorations: "off",
                      overviewRulerLanes: 0,
                      tabSize: 2,
                      insertSpaces: true,
                      formatOnType: true,
                      formatOnPaste: true,
                      wordBasedSuggestions: "allDocuments",
                    }}
                    loading="loading"
                    onChange={handleCodeChange}
                  />
                  <p className="text-xs text-gray-600">Include all the information someone would need to answer your question.</p>
                </div>
              ) : (
                <>
                  <textarea
                    {...register("Questiondetail")}
                    id="body"
                    placeholder="Explain your question in detail..."
                    className="w-full border h-[10rem] p-1 rounded-lg placeholder:text-sm border-sky-950  focus:outline-none "
                  />
                  <p className="text-xs text-gray-600">Include all the information someone would need to answer your question.</p>
                </>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="tags" className="text-sm font-medium text-sky-950">
                Tags
              </label>
              {tags.map((tag, index) => (
                <span
                  onClick={() => handleRemoveTag(index)}
                  className="rounded-full   bg-sky-300 text-gray-700 px-2 mx-2 hover:cursor-pointer"
                  key={index}
                >
                  {tag}
                </span>
              ))}
              <div className="flex flex-wrap gap-2 mb-2"></div>
              <div className="flex gap-2">
                <input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  id="tags"
                  placeholder="Add a tag"
                  className="w-full border rounded-lg p-1 placeholder:text-sm border-sky-950  focus:outline-none "
                />
                <button onClick={handleAddTag} type="button" className="border-sky-950  rounded-lg flex text-nowrap p-2 bg-sky-950 text-white">
                  Add Tag
                </button>
              </div>
              <p className="text-xs text-gray-600">Add up to 5 tags to describe what your question is about.</p>
            </div>

            <div className="space-y-2 flex flex-col">
              <label htmlFor="category" className="text-sm font-medium text-sky-950">
                Category
              </label>
              <select {...register("language")} className="w-full border rounded-lg p-1 placeholder:text-sm border-sky-950  focus:outline-none ">
                <option value="javscript">javscript</option>
                <option value="java">javat</option>
                <option value="php">php</option>
                <option value="database">Databases</option>
                <option value="devops">DevOps</option>
              </select>
            </div>

            <button type="submit" className="w-full p-2 rounded-lg bg-emerald-500 hover:bg-emerald-200 text-white">
              Post Your Question
            </button>
          </form>
        </div>
      </div>,
      document.body
    )
  );
};

export default NewSnippetModal;
