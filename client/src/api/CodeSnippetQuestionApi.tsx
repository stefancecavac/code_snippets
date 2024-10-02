import { useMutation, useQuery } from "@tanstack/react-query";
import { codeSnippetQuestionData } from "../types";
import { UseToastContext } from "../context/ToastContext";
import { useParams } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetAllSnippetQuestions = () => {
  const getQuestions = async () => {
    const response = await fetch(`${API_BASE_URL}/api/snippets`, {
      credentials: "include",
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json as codeSnippetQuestionData[];
  };

  const { data: codeSnippetQuestions, isLoading: codeSnippetQuestionsLoading } = useQuery({
    queryKey: ["codeSnippets"],
    queryFn: getQuestions,
    retry: false,
  });

  return { codeSnippetQuestions, codeSnippetQuestionsLoading };
};

export const useGetSingleSnippetQuestions = () => {
  const { id } = useParams();
  const getQuestion = async () => {
    const response = await fetch(`${API_BASE_URL}/api/snippets/${id}`, {
      credentials: "include",
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json as codeSnippetQuestionData;
  };

  const { data: codeSnippetQuestion, isLoading: codeSnippetQuestionLoading } = useQuery({
    queryKey: ["codeSnippet"],
    queryFn: getQuestion,
    retry: false,
  });

  return { codeSnippetQuestion, codeSnippetQuestionLoading };
};

export const useGetMySnippets = () => {
  const getMysnippets = async () => {
    const response = await fetch(`${API_BASE_URL}/api/snippets`, {
      credentials: "include",
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json as codeSnippetQuestionData[];
  };

  const { data: myCodeSNippets } = useQuery({
    queryKey: ["codeSnippets"],
    queryFn: getMysnippets,
  });

  return { myCodeSNippets };
};

export const useCreateSnipetQuestion = () => {
  const { showToast } = UseToastContext();

  const postSnippetQuestion = async ({ Questiondetail, language, question, questionCode, userId }: codeSnippetQuestionData) => {
    const response = await fetch(`${API_BASE_URL}/api/snippets`, {
      method: "POST",
      body: JSON.stringify({ Questiondetail, language, question, questionCode, userId }),
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json as codeSnippetQuestionData[];
  };

  const { mutate: createSnippetQuestion, error: createSnippetQuestionServerError } = useMutation({
    mutationKey: ["codeSnippets"],
    mutationFn: postSnippetQuestion,
    onSuccess: () => {
      showToast({ type: "SUCCESS", message: "Question successfuly created" });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  return { createSnippetQuestion, createSnippetQuestionServerError };
};
