import { useState } from "react";
import Constants from "../constants";
import useWishlist from "./useWishlist";
const usePaginate = () => {
  const [currentSelectedPage, setCurrentSelectedPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const { wishlist } = useWishlist();

  const getTotalPages = (count, limit) => {
    return Math.ceil(count / limit);
  };

  const handleBookPagination = (event) => {
    const { selected } = event;
    setCurrentSelectedPage(selected + 1);
  };

  const getStartAndEndIndex = () => {
    const totalPage = getTotalPages(wishlist.length, Constants.WISHLIST_LIMIT);
    if (currentSelectedPage > totalPage) {
      setCurrentSelectedPage(totalPage);
      return;
    }
    const temp_startIndex =
      (currentSelectedPage - 1) * Constants.WISHLIST_LIMIT;
    const temp_endIndex = temp_startIndex + Constants.WISHLIST_LIMIT;
    setStartIndex(temp_startIndex);
    setEndIndex(temp_endIndex);
  };

  return {
    currentSelectedPage,
    setCurrentSelectedPage,
    getTotalPages,
    handleBookPagination,
    startIndex,
    setStartIndex,
    endIndex,
    setEndIndex,
    getStartAndEndIndex,
  };
};

export default usePaginate;
