import { wishlistAtom, wishlistCounterAtom } from "../store/wishlist";
import { useAtom } from "jotai";

const useWishlist = () => {
  const [wishlist, setWishlist] = useAtom(wishlistAtom);
  const [wishlistCounter, setWishlistCounter] = useAtom(
    wishlistCounterAtom || 0
  );

  const addToWishlist = (book) => {
    const newWishlist = [...wishlist, book];
    setWishlist([...newWishlist]);
    localStorage.setItem("wishlist", JSON.stringify(newWishlist || []));
  };

  const removeFromWishlist = (book) => {
    const newWishlist = wishlist.filter((item) => item.id !== book.id);
    setWishlist([...newWishlist]);
    localStorage.setItem("wishlist", JSON.stringify(newWishlist || []));
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem("wishlist");
  };

  const isInWishlist = (book) => {
    return wishlist.some((item) => item.id === book.id);
  };


  return {
    wishlist,
    wishlistCounter,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
  };
};

export default useWishlist;
