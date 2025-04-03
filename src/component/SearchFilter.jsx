import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
export default function SearchFilter({
  search,
  setSearch,
  isDropdownOpen,
  setIsDropdownOpen,
  selectedTopic,
  setSelectedTopic,
  searchTopic,
  setSearchTopic,
  topicList,
  setCurrentSelectedPage,
}) {
  const handleSearch = (value = "") => {
    setSearch(value);
    setCurrentSelectedPage(1);
  };
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      {/* Search Bar */}
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Search books..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          value={search}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
        {search && (
          <button
            onClick={() => handleSearch()}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            aria-label="Clear search"
          >
            <AiOutlineClose className="h-5 w-5" />
          </button>
        )}
      </div>
      {/* Searchable Dropdown */}
      <div className="flex-1 relative">
        <div className="flex-1 relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-left flex justify-between items-center"
          >
            {selectedTopic || "Filter by topic"}
            <svg
              className={`w-5 h-5 ml-2 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
              {/* Dropdown search input */}
              <div className="p-2 border-b">
                <input
                  type="text"
                  placeholder="Search topics..."
                  className="w-full px-3 py-1 border border-gray-200 rounded-md text-sm"
                  onChange={(e) => setSearchTopic(e.target.value)}
                />
              </div>

              {/* Dropdown options */}
              {topicList.length > 0 ? (
                topicList
                  .filter((item) =>
                    item?.toLowerCase().includes(searchTopic.toLowerCase())
                  )
                  .map((topic) => (
                    <div
                      key={topic}
                      className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                        selectedTopic === topic
                          ? "bg-blue-50 text-blue-600"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedTopic(topic);
                        setSearchTopic("");
                        setIsDropdownOpen(false);
                        setCurrentSelectedPage(1);
                      }}
                    >
                      {topic}
                    </div>
                  ))
              ) : (
                <div className="px-4 py-2 text-gray-500">No topics found</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
