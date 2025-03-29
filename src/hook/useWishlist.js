import { wishlistAtom, wishlistCounterAtom } from "../store/wishlist";
import { useAtom } from "jotai";

const useWishlist = () => {
  const [wishlist, setWishlist] = useAtom(wishlistAtom);
  const [wishlistCounter, setWishlistCounter] = useAtom(wishlistCounterAtom);

  const addToWishlist = (book) => {
    setWishlist([...wishlist, book]);
    setWishlistCounter(wishlistCounter + 1);
    localStorage.setItem("wishlist", JSON.stringify(wishlist || []));
  };

  const removeFromWishlist = (book) => {
    setWishlist(wishlist.filter((item) => item.id !== book.id));
    wishlistCounter > 0 && setWishlistCounter(wishlistCounter - 1);
    localStorage.setItem("wishlist", JSON.stringify(wishlist || []));
  };

  const clearWishlist = () => {
    setWishlist([]);
    setWishlistCounter(0);
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
