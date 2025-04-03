import React, { useEffect, useState } from "react";
import BookCard from "../component/BookCard";
import useBook from "../hook/useBook";
import BookListSkeleton from "../component/skeleton/BookListSkeleton";
import Pagination from "../component/Pagination";
import useDebounce from "../hook/useDebounce";

import SearchFilter from "../component/SearchFilter";
import Constants from "../constants";
import usePaginate from "../hook/usePaginate";
export default function HomePage() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 700);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [searchTopic, setSearchTopic] = useState("");
  const { topicList, useBookQuery, getBookTopics } = useBook();
  const {
    currentSelectedPage,
    setCurrentSelectedPage,
    handleBookPagination,
    getTotalPages,
  } = usePaginate();
  const { data, isLoading, isError } = useBookQuery(
    {
      search: debouncedSearch,
      topic: selectedTopic,
      page: currentSelectedPage,
    },
    {
      enabled: !!(debouncedSearch || selectedTopic), // Only run when filters are set
    }
  );

  const { count, results: books = [] } = data || {};

  useEffect(() => {
    if (books?.length > 0 && !topicList.length) getBookTopics(books);
  }, [books]);

  useEffect(() => {
    setCurrentSelectedPage(1);
  }, [debouncedSearch, selectedTopic]);

  // Handle error state
  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p>Failed to fetch books. Please try reload the page.</p>
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded-md mt-2"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {!isLoading ? (
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Popular Books
          </h2>
          <SearchFilter
            search={search}
            setSearch={setSearch}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            selectedTopic={selectedTopic}
            setSelectedTopic={setSelectedTopic}
            searchTopic={searchTopic}
            setSearchTopic={setSearchTopic}
            topicList={topicList}
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {books?.map((book, index) => (
              <BookCard key={index} book={book} />
            ))}
          </div>
          {books?.length > 0 && (
            <Pagination
              totalPages={getTotalPages(count, Constants.HOME_LIMIT)}
              currentSelectedPage={currentSelectedPage}
              handleBookPagination={handleBookPagination}
            />
          )}
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <BookListSkeleton />
          </div>
        </div>
      )}
    </>
  );
}
