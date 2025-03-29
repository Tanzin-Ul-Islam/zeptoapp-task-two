import { FaRegHeart, FaHeart } from "react-icons/fa";
const BookCard = ({ book }) => {
  // Sample book data

  return (
    <div
      key={book.id}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative"
    >
      {/* Wishlist Icon - Top Right Corner */}
      <button
        className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-red-100 transition-colors duration-200"
        onClick={() => {}}
        aria-label="Remove from wishlist"
      >
        {true ? (
          <FaHeart className="text-blue-500" />
        ) : (
          <FaRegHeart className="text-gray-600 hover:text-blue-500" />
        )}
      </button>

      {/* Book Cover Image */}
      <div className="h-48 md:h-56 overflow-hidden">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://via.placeholder.com/300x400?text=Book+Cover";
          }}
        />
      </div>

      {/* Book Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
          {book.title}
        </h3>
        <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
      </div>
    </div>
  );
};

export default BookCard;
