import { useGetSingleBooksQuery } from "@/redux/api/baseApi";
import { format } from "date-fns";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate, useParams } from "react-router";

const ViewBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: book, isLoading } = useGetSingleBooksQuery(id!);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-900">
        <AiOutlineLoading3Quarters className="animate-spin size-10 text-indigo-600 dark:text-indigo-400" />
      </div>
    );
  }

  if (!book?.data) {
    return (
      <div className="text-center mt-20 text-xl text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
        Book not found
      </div>
    );
  }

  const {
    title,
    author,
    genre,
    isbn,
    description,
    copies,
    available,
    createdAt,
    updatedAt,
  } = book.data;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <div className="rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
        {/* Book Cover & Basic Info Section */}
        <div className="md:flex">
          <div className="md:w-1/3 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900 dark:to-blue-900 p-8 flex items-center justify-center">
            <div className="w-full h-72 bg-white/80 dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center shadow-inner">
              <span className="text-7xl mb-4">📚</span>
              <span className="text-xs font-medium text-indigo-600 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900 px-2 py-1 rounded-full">
                {genre.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="md:w-2/3 p-6 sm:p-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-1">{title}</h1>
                <p className="text-lg sm:text-xl text-indigo-700 dark:text-indigo-400 font-medium mb-4">
                  by {author}
                </p>
              </div>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                ISBN: {isbn}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span
                className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                  available
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300"
                    : "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300"
                }`}
              >
                {available ? "AVAILABLE" : "CHECKED OUT"}
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full text-xs sm:text-sm font-semibold">
                {copies} {copies === 1 ? "COPY" : "COPIES"} AVAILABLE
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                  Genre
                </h3>
                <p className="text-sm font-medium capitalize">{genre}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                  Published
                </h3>
                <p className="text-sm font-medium">
                  {format(new Date(createdAt), "yyyy")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="p-6 sm:p-8 border-t border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4">Description</h2>
          <p className="leading-relaxed">{description}</p>
        </div>

        {/* Metadata Section */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <span className="material-icons-outlined text-base mr-2">📅</span>
            <div>
              <span className="font-medium">Added:</span>{" "}
              {format(new Date(createdAt), "MMM d, yyyy")}
            </div>
          </div>
          <div className="flex items-center">
            <span className="material-icons-outlined text-base mr-2">🔄</span>
            <div>
              <span className="font-medium">Updated:</span>{" "}
              {format(new Date(updatedAt), "MMM d, yyyy")}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-end gap-3">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors hover:cursor-pointer"
          >
            Back to Book List Page
          </button>
          {/* Borrow button can be added here if needed */}
        </div>
      </div>
    </div>
  );
};

export default ViewBook;
