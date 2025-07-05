import {
  useGetSingleBooksQuery,
  useUpdateBookMutation,
} from "@/redux/api/baseApi";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

interface IBook {
  title: string;
  description: string;
  author: string;
  genre:
    | "fiction"
    | "non-fiction"
    | "science"
    | "history"
    | "biography"
    | "fantasy"
    | "programming";
  isbn: string;
  copies: number;
}

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: book, isLoading } = useGetSingleBooksQuery(id!);

  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IBook>();

  useEffect(() => {
    if (book?.data) {
      reset({
        title: book.data.title,
        author: book.data.author,
        genre: book.data.genre.toLowerCase() as IBook["genre"],
        isbn: book.data.isbn,
        description: book.data.description,
        copies: book.data.copies,
      });
    }
  }, [book?.data, reset]);

  const onSubmit: SubmitHandler<IBook> = async (data) => {
    const updatedBook = {
      ...data,
      available: data?.copies === 0 ? false : true,
    };

    try {
      const res = await updateBook({
        bookId: id,
        body: updatedBook,
      }).unwrap();

      if (res) {
        toast.success("Book has been updated!");
        navigate("/books", { replace: true });

        console.log("Updated book data:", updatedBook);
      }
    } catch (error) {
      toast.error("Failed to update the book.");
      console.error("Error while updating book:", error);
    }
  };

  return (
    <div className="mt-10 min-h-[70vh]">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <AiOutlineLoading3Quarters className="animate-spin size-8 text-gray-800 dark:text-gray-200" />
        </div>
      ) : (
        <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md mt-10 border border-gray-300 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
            📚 Update Book
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Book title"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Author
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Author name"
                {...register("author", { required: "Author is required" })}
              />
              {errors.author && (
                <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>
              )}
            </div>

            {/* Genre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Genre
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("genre", { required: "Genre is required" })}
              >
                <option value="">Select Genre</option>
                <option value="fiction">Fiction</option>
                <option value="non-fiction">Non-Fiction</option>
                <option value="science">Science</option>
                <option value="history">History</option>
                <option value="biography">Biography</option>
                <option value="fantasy">Fantasy</option>
                <option value="programming">Programming</option>
              </select>
              {errors.genre && (
                <p className="text-red-500 text-sm mt-1">{errors.genre.message}</p>
              )}
            </div>

            {/* ISBN */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                ISBN
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ISBN number"
                {...register("isbn", { required: "ISBN is required" })}
              />
              {errors.isbn && (
                <p className="text-red-500 text-sm mt-1">{errors.isbn.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Brief summary of the book"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            {/* Copies */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Copies
              </label>
              <input
                type="number"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("copies", {
                  required: "Copies is required",
                  valueAsNumber: true,
                  min: { value: 1, message: "Must be at least 1" },
                })}
              />
              {errors.copies && (
                <p className="text-red-500 text-sm mt-1">{errors.copies.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="flex items-center justify-center w-full bg-black hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-md transition duration-200 hover:cursor-pointer"
            >
              {isUpdating ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                "📥 Update Book"
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditBook;
