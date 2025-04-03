import { FaRegHeart, FaHeart } from "react-icons/fa";
import useBook from "../hook/useBook";
import useWishlist from "../hook/useWishlist";
import { useState } from "react";

const BookCard = ({ book }) => {
  const { getAuthorName } = useBook();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
      {isInWishlist(book) ? (
        <button
          className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-red-100 transition-colors duration-200"
          onClick={() => removeFromWishlist(book)}
          aria-label="Remove from wishlist"
        >
          <FaHeart className="text-blue-500" />
        </button>
      ) : (
        <button
          className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-red-100 transition-colors duration-200"
          onClick={() => addToWishlist(book)}
          aria-label="Remove from wishlist"
        >
          <FaRegHeart className="text-gray-600 hover:text-blue-500" />
        </button>
      )}

      {/* Book Cover Image */}
      <div className="h-48 md:h-56 overflow-hidden">
      <img
          src="/blur.jpg"
          alt="Blurred Image"
          className="w-full h-full object-cover"
          style={{
            filter: "blur(15px)",
            transition: "opacity 0.5s ease",
            opacity: isImageLoaded ? 0 : 1,
          }}
        />
        <img
          src={book?.formats["image/jpeg"]}
          alt={book.title}
          className="w-full h-[224px] object-cover absolute top-0 left-0"
          onLoad={handleImageLoad}
          style={{
            opacity: isImageLoaded ? 1 : 0, // Fixed this line (was 0:0)
            transition: "opacity 0.5s ease",
          }}
        />
      </div>

      {/* Book Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
          {book?.title}
        </h3>
        {book?.authors?.length > 0 && (
          <p className="text-gray-600 text-sm font-medium mb-2">
            by {getAuthorName(book?.authors)}
          </p>
        )}
      </div>
    </div>
  );
};

export default BookCard;
