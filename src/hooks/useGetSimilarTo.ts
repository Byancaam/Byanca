import { useQuery } from "react-query";
import { getSimilarTo } from "../services/api";

export const useGetSimilarTo = (wordToSearch: string) => {
  const { data: synonyms, isLoading } = useQuery(
    ["similarTo", wordToSearch],
    () => getSimilarTo(wordToSearch),
    {
      enabled: !!wordToSearch,
    }
  );

  return { loading: isLoading, data: synonyms?.similarTo || [] };
};
