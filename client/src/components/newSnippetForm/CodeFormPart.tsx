import { Editor } from "@monaco-editor/react";
import { Controller, useFormContext } from "react-hook-form";
import { codeSnippetQuestionData } from "../../types";

const CodeFormPart = ({ handleCodeChange }: { handleCodeChange: (value: string | undefined) => void }) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<codeSnippetQuestionData>();
  const selectedLanguage = watch("language");

  return (
    <div className=" px-5 mt-5 py-2 flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <label className="text-sky-900 text-xm font-bold flex">Your Code:</label>
        <div className="flex flex-col gap-2">
          <select
            {...register("language")}
            id="countries"
            defaultValue={""}
            className={`border text-gray-600 b  border-gray-300  text-sm rounded-lg focus:outline-none  w-fit p-1.5 ${
              errors.language?.message ? "border-rose-500" : ""
            } `}
          >
            <option value="" disabled>
              Choose a language
            </option>
            <option value={"javascript"} className="bg-gray-100 text-gray-700">
              JavaScript
            </option>
            <option value={"java"} className="bg-gray-100 text-gray-700">
              java
            </option>
          </select>
          {errors.language?.message && <span className="text-rose-500 text-xs font-semibold">{errors.language?.message as string}</span>}
        </div>
      </div>
      <div className=" rounded-lg overflow-hidden mt-2 border-gray-300 border ">
        <Controller
          name="questionCode"
          control={useFormContext().control}
          render={({ field }) => (
            <Editor
              width={"100%"}
              height={"50vh"}
              theme="light"
              language={selectedLanguage}
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
              value={field.value}
              onChange={(value) => {
                field.onChange(value);
                handleCodeChange(value);
              }}
            />
          )}
        />
        {errors.questionCode?.message && <span className="text-rose-500 text-xs font-semibold">{errors.questionCode?.message as string}</span>}
      </div>
    </div>
  );
};

export default CodeFormPart;
