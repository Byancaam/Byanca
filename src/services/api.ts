import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
    "X-RapidAPI-Host": import.meta.env.VITE_API_HOST,
  },
});

export const getUsageOf = (word: string) => {
  return api.get(`${word}/usageOf`).then((response) => {
    return response.data;
  });
};

export const getSimilarTo = async (word: string) => {
  return await api.get(`${word}/similarTo`).then((response) => {
    return response.data;
  });
};
