// import SearchSynonyms from "./SearchSynonyms";

import Header from "./Header";
import { getSimilarTo } from "../services/api";
import React, { useEffect, useState } from "react";

export default function MainPage() {
  const [wordToSearch, setWordToSearch] = useState("big");
  const [loading, setLoading] = useState(false);
  const [synonyms, setSynonyms] = useState<string[]>([]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const wordInput = form.elements.namedItem("word") as HTMLInputElement;
    const word = wordInput.value;

    setWordToSearch(word);
  }

  useEffect(() => {
    if (wordToSearch) {
      setLoading(true);
      getSimilarTo(wordToSearch)
        .then((response) => {
          console.log(
            "🚀 ~ file: MainPage.tsx:23 ~ .then ~ response:",
            response
          );

          setSynonyms(response.similarTo);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Ocorreu um erro na busca", error);
          setLoading(false);
        });
    }
  }, [wordToSearch]);

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <label>
          Search:{" "}
          <input
            type="text"
            name="word"
            value={wordToSearch}
            onChange={(e) => setWordToSearch(e.target.value)}
            placeholder="Digite uma palavra para fazer a busca por sinônimos"
          />
        </label>

        <button type="submit">Pesquisar</button>
      </form>

      <div>
        <table>
          <thead>
            <tr>
              <th> Tabela de Sinônimos</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                {" "}
                <td>Carregando...</td>{" "}
              </tr>
            ) : (
              synonyms.map((synonym, index) => (
                <tr key={index}>
                  {" "}
                  <td>{synonym}</td>{" "}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
