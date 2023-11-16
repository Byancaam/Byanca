import { useEffect, useState } from "react";
import { getSimilarTo } from "../services/api";

export const useGetSimilarTo = (wordToSearch: string) => {
  const [loading, setLoading] = useState(false);
  const [synonyms, setSynonyms] = useState<string[]>([]);

  useEffect(() => {
    if (wordToSearch) {
      setLoading(true);
      getSimilarTo(wordToSearch)
        .then((response) => {
          const data: string[] = response.similarTo;

          setSynonyms(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Ocorreu um erro na busca", error);
          setLoading(false);
        });
    }
  }, [wordToSearch]);

  return { loading, data: synonyms };
};
