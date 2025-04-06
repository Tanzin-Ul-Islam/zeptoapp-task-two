import { useQuery } from "@tanstack/react-query";
import { getData } from "../api/api-core";
import api from "../api/api.json";
import { useState } from "react";
const useBook = () => {
  const [topicList, setTopicList] = useState([]);
  const fetchBooks = async ({ queryKey }) => {
    const [_key, { search, topic, page }] = queryKey;
    let url = `${api.bookUrl}?page=${page}`;
    if (search) url += `&search=${search}`;
    if (topic) url += `&topic=${topic}`;
    return await getData({ url });
  };
  const fetchBookDetails = async ({ queryKey }) => {
    const [_key, { bookId }] = queryKey;
    const url = `${api.bookUrl}/${bookId}`;
    return await getData({ url });
  };
  const useBookQuery = ({ search, topic, page }) =>
    useQuery({
      queryKey: ["book", { search, topic, page }],
      queryFn: fetchBooks,
      keepPreviousData: true,
    });
  const useBookDetailsQuery  = ({ bookId }) =>
    useQuery({
      queryKey: ['bookDetails', { bookId }],
      queryFn: fetchBookDetails,
      keepPreviousData: true,
    });
  const getBookTopics = (list) => {
    const allUniqueTopics = [...new Set(list.flatMap((book) => book.subjects))];
    setTopicList(allUniqueTopics || []);
  };
  const getAuthorName = (arg) => {
    for (let i = 0; i < arg.length; i++) {
      if (arg[i]?.name) {
        return arg[i].name;
      }
    }
    return "";
  };
  const getSummaries = (arg) => {
    for (let i = 0; i < arg.length; i++) {
      if (arg[i]) {
        return arg[i];
      }
    }
    return "";
  };

  return {
    topicList,
    fetchBooks,
    fetchBookDetails,
    useBookQuery,
    useBookDetailsQuery,
    getBookTopics,
    getAuthorName,
    getSummaries,
  };
};

export default useBook;
