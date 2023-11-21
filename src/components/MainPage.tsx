import { QueryClient, QueryClientProvider } from "react-query";
import _debounce from "lodash/debounce";
import { useGetSimilarTo } from "../hooks/useGetSimilarTo";
import Header from "./Header";
import React, { useState } from "react";
import { Form, Input, Table, Button } from "antd";

const queryClient = new QueryClient();

export default function MainPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainPageContent />
    </QueryClientProvider>
  );
}

function MainPageContent() {
  const [word, setWordToSearch] = useState("big");
  const { loading, data } = useGetSimilarTo(word);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const wordInput = form.elements.namedItem("word") as HTMLInputElement;
    const word = wordInput.value;

    setWordToSearch(word);
  }

  const handleDebouncedChange = _debounce((newWord) => {
    setWordToSearch(newWord);
  }, 500);

  const handleInputChange = (e: { target: { value: unknown } }) => {
    const newWord = e.target.value;
    handleDebouncedChange(newWord);
  };

  const columns = [
    {
      title: "Sinônimos",
      dataIndex: "synonym",
      key: "synonym",
    },
  ];

  return (
    <div>
      <Header />
      <Form onFinish={handleSubmit}>
        <Form.Item label="Search" name="word">
          <Input
            type="text"
            name="word"
            value={word}
            onChange={handleInputChange}
            placeholder="Type a word to search for synonyms ..."
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Pesquisar
          </Button>
        </Form.Item>
      </Form>

      <div>
        <Table
          dataSource={data.map((item: unknown, index: unknown) => ({
            key: index,
            synonym: item,
          }))}
          columns={columns}
          loading={loading}
          pagination={false}
        />
      </div>
    </div>
  );
}
