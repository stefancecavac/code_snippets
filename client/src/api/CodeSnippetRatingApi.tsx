import { useMutation, useQueryClient } from "@tanstack/react-query";
import { codeSnippetAnswerData } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useRateUp = () => {
  const queryClient = useQueryClient();
  const ratingUp = async ({ answerId }: { answerId: string }) => {
    const response = await fetch(`${API_BASE_URL}/api/snippet/answers/rate-up`, {
      method: "PATCH",
      headers: {
        "content-type": "Application/json",
      },
      body: JSON.stringify({ answerId }),
      credentials: "include",
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json as codeSnippetAnswerData[];
  };

  const { mutate: rateUp } = useMutation({
    mutationKey: ["rating"],
    mutationFn: ratingUp,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["codeSnippetAnswers"] });
    },
  });

  return { rateUp };
};

export const useRateDown = () => {
  const queryClient = useQueryClient();

  const ratingDown = async ({ answerId }: { answerId: string }) => {
    const response = await fetch(`${API_BASE_URL}/api/snippet/answers/rate-down`, {
      method: "PATCH",
      headers: {
        "content-type": "Application/json",
      },
      body: JSON.stringify({ answerId }),
      credentials: "include",
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json as codeSnippetAnswerData[];
  };

  const { mutate: rateDown } = useMutation({
    mutationKey: ["rating"],
    mutationFn: ratingDown,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["codeSnippetAnswers"] });
    },
  });

  return { rateDown };
};
