import { useGetSimilarTo } from "../hooks/useGetSimilarTo";
import Header from "./Header";
import React, { useState } from "react";

export default function MainPage() {
  const [word, setWordToSearch] = useState("big");
  const { loading, data } = useGetSimilarTo(word);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const wordInput = form.elements.namedItem("word") as HTMLInputElement;
    const word = wordInput.value;

    setWordToSearch(word);
  }

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <label>
          Search:{" "}
          <input
            type="text"
            name="word"
            value={word}
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
              <th>
                {" "}
                <h2>Tabela de Sinônimos</h2>
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                {" "}
                <td>Carregando...</td>{" "}
              </tr>
            ) : (
              data.map((item, index: number) => (
                <tr key={index}>
                  {" "}
                  <td>{item}</td>{" "}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
