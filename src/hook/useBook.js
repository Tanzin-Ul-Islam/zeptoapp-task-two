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
    const response = await getData({ url });
    return response;
  };
  const useBookQuery = ({ search, topic, page }) =>
    useQuery({
      queryKey: ["book", { search, topic, page }],
      queryFn: fetchBooks,
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

  return {
    topicList,
    fetchBooks,
    useBookQuery,
    getBookTopics,
    getAuthorName,
  };
};

export default useBook;
