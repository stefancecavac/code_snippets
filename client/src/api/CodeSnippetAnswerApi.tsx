import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { codeSnippetAnswerData } from "../types";
import { useParams } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetAllAnswers = () => {
  const { id } = useParams();

  const getAnswers = async () => {
    const response = await fetch(`${API_BASE_URL}/api/snippet/answers/${id}`, {
      credentials: "include",
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json as codeSnippetAnswerData[];
  };

  const { data: codeSnippetAnswers, isLoading: codeSnippetsAnswerLoading } = useQuery({
    queryKey: ["codeSnippetAnswers"],
    queryFn: getAnswers,
    retry: false,
  });

  return { codeSnippetAnswers, codeSnippetsAnswerLoading };
};

export const useCreateSnipetAnswer = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const postAnswer = async ({ answer, answerCode, userId }: codeSnippetAnswerData) => {
    const response = await fetch(`${API_BASE_URL}/api/snippet/answers/${id}`, {
      method: "POST",
      body: JSON.stringify({ answer, answerCode, userId }),
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json as codeSnippetAnswerData;
  };

  const { mutate: createAnswer, error: createAnswerServerError } = useMutation({
    mutationKey: ["codeSnippetAnswers"],
    mutationFn: postAnswer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["codeSnippetAnswers"] });
    },
  });

  return { createAnswer, createAnswerServerError };
};
