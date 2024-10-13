import { useSearchParams } from "react-router-dom";

export const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("q");

  const setQueryParam = (q: string) => {
    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);
      params.set("q", q);
      return params;
    });
  };

  return { q, setQueryParam };
};
