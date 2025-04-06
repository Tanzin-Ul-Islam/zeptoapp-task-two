import React, { useEffect, useState } from "react";
import BookCard from "../component/BookCard";
import useBook from "../hook/useBook";
import BookListSkeleton from "../component/skeleton/BookListSkeleton";
import Pagination from "../component/Pagination";
import useDebounce from "../hook/useDebounce";

import SearchFilter from "../component/SearchFilter";
import Constants from "../constants";
import usePaginate from "../hook/usePaginate";
import { useLocation, useSearchParams } from "react-router-dom";
export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get individual parameter
  const id = searchParams.get("id");
  const page = searchParams.get("page");
  console.log("id", id, "page", page);
  const location = useLocation();
  console.log(location.pathname); // "/products/123"
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
      enabled: !!(debouncedSearch || selectedTopic),
    }
  );

  const { count, results: books = [] } = data || {};

  useEffect(() => {
    if (books?.length > 0 && !topicList.length) getBookTopics(books);
  }, [books]);

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
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Popular Books</h2>
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
        setCurrentSelectedPage={setCurrentSelectedPage}
      />
      {!isLoading ? (
        <>
          {books?.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {books?.map((book, index) => (
                <BookCard key={index} book={book} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <img
                src="/book.jpg"
                alt="No Books Found"
                className="w-48 h-48 mb-4"
              />
              <p className="text-xl font-bold text-gray-600">No books found</p>
            </div>
          )}

          {books?.length > 0 && (
            <Pagination
              totalPages={getTotalPages(count, Constants.HOME_LIMIT)}
              currentSelectedPage={currentSelectedPage}
              handleBookPagination={handleBookPagination}
            />
          )}
        </>
      ) : (
        <BookListSkeleton />
      )}
    </div>
  );
}
