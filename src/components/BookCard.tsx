/* eslint-disable @typescript-eslint/no-explicit-any */
const BookCard = ({ book }: { book: any }) => (
  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow hover:shadow-lg transition">
    <h3 className="text-xl font-semibold text-indigo-600">{book.title}</h3>
    <p className="text-gray-800 dark:text-gray-300 mt-1">
      Author: {book.author}
    </p>
    <p className="text-gray-500 dark:text-gray-400 text-sm">
      Genre: {book.genre}
    </p>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
      ISBN: {book.isbn}
    </p>
    <p
      className={`text-sm font-medium ${
        book.available ? "text-green-600" : "text-red-500"
      }`}
    >
      {book.available ? "Available" : "Unavailable"}
    </p>
  </div>
);
export default BookCard;
