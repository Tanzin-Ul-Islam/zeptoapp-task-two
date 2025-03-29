import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const wishlistAtom = atomWithStorage("wishlist", [], {
  deserialize: (storedValue) => {
    try {
      return storedValue ? JSON.parse(storedValue) : [];
    } catch {
      return [];
    }
  },
});

export const wishlistCounterAtom = atom((get) => get(wishlist).length);

export const addToWishlist = atom(null, (get, set, book) => {
  const currentWishlist = get(wishlist);
  set(wishlist, [...currentWishlist, book]);
  set(wishlistCounter, currentWishlist.length + 1);
});

export const removeFromWishlist = atom(null, (get, set, book) => {
  const currentWishlist = get(wishlist);
  set(
    wishlist,
    currentWishlist.filter((b) => b.id !== book.id)
  );
  set(wishlistCounter, currentWishlist.length - 1);
});

export const clearWishlist = atom(null, (get, set) => {
  set(wishlist, []);
  set(wishlistCounter, 0);
});

export const isInWishlist = atom((get, book) => {
  const currentWishlist = get(wishlist);
  return currentWishlist.some((b) => b.id === book.id);
});
