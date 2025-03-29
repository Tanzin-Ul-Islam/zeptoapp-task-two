import React from "react";
import BookCard from "../component/BookCard";
export default function Home() {
  const books = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      coverImage:
        "https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg",
      rating: 4.2,
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      coverImage:
        "https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg",
      rating: 4.3,
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      coverImage:
        "https://m.media-amazon.com/images/I/61ZewDE3beL._AC_UF1000,1000_QL80_.jpg",
      rating: 4.2,
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      coverImage:
        "https://m.media-amazon.com/images/I/71Q1tPupKjL._AC_UF1000,1000_QL80_.jpg",
      rating: 4.3,
    },
    {
      id: 5,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      coverImage:
        "https://m.media-amazon.com/images/I/710+HcoP38L._AC_UF1000,1000_QL80_.jpg",
      rating: 4.7,
    },
    {
      id: 6,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      coverImage:
        "https://m.media-amazon.com/images/I/91HPG31dTwL._AC_UF1000,1000_QL80_.jpg",
      rating: 3.8,
    },
    {
      id: 7,
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      coverImage:
        "https://m.media-amazon.com/images/I/51EstVXM1UL._AC_UF1000,1000_QL80_.jpg",
      rating: 4.5,
    },
    {
      id: 8,
      title: "Animal Farm",
      author: "George Orwell",
      coverImage:
        "https://m.media-amazon.com/images/I/91LUbAcpACL._AC_UF1000,1000_QL80_.jpg",
      rating: 4.2,
    },
  ];
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Popular Books</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard book={book} />
        ))}
      </div>
    </div>
  );
}
