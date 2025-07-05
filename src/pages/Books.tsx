import BorrowBookModalForm from "@/components/module/borrow/BorrowBookModalForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { IoOpenOutline } from "react-icons/io5";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { cn } from "@/lib/utils";
import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/api/baseApi";
import { Edit2, Loader2, Trash2 } from "lucide-react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link } from "react-router";
import { toast } from "sonner";
import type { TBook } from "types.ts";

const Books = () => {
  const { data, isLoading, isError } = useGetBooksQuery(undefined);
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

  const handleBookDelete = async (bookId: string) => {
    if (bookId) {
      try {
        const res = await deleteBook(bookId);
        if (res) {
          toast("Book has been deleted", {
            description: `${new Date()}`,
          });
        }
        if (res.error) {
          toast.error("Failed to delete the book, try again later!");
        }
      } catch (error) {
        toast.error("Failed to delete the book.");
        console.error("Error while deleting book:", error);
      }
    }
  };

  return (
    <div>
      <div>
        <h2 className="text-center text-3xl font-semibold py-10 text-gray-900 dark:text-gray-100">
          All Books
        </h2>
        <div className="flex justify-start mb-4 md:justify-end">
          <Link to="/create-book">
            <Button className="bg-green-300 text-black hover:bg-green-400 dark:bg-green-700 dark:text-white dark:hover:bg-green-600 transition-colors duration-300 hover:cursor-pointer mb-4">
              📚 Add a New Book
            </Button>
          </Link>
        </div>
      </div>
      <div>
        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-primary dark:text-indigo-400" />
          </div>
        ) : isError ? (
          <Alert variant="destructive" className="my-5">
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription>Could not fetch summary data.</AlertDescription>
          </Alert>
        ) : (
          <Table className="bg-white dark:bg-gray-900 rounded-md shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
            <TableCaption className="text-gray-600 dark:text-gray-400">
              A list of all books.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                  Title
                </TableHead>
                <TableHead className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                  Author
                </TableHead>
                <TableHead className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                  Genre
                </TableHead>
                <TableHead className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                  ISBN
                </TableHead>
                <TableHead className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                  Copies
                </TableHead>
                <TableHead className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                  Availability
                </TableHead>
                <TableHead className="text-right bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.map((book: TBook) => (
                <TableRow
                  key={book?._id}
                  className="even:bg-gray-50 dark:even:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <TableCell className="font-normal text-gray-900 dark:text-gray-100">
                    {book?.title}
                  </TableCell>
                  <TableCell className="font-normal text-gray-900 dark:text-gray-100">
                    {book?.author}
                  </TableCell>
                  <TableCell className="font-normal uppercase text-gray-900 dark:text-gray-100">
                    {book?.genre}
                  </TableCell>
                  <TableCell className="font-normal text-gray-900 dark:text-gray-100">
                    {book?.isbn}
                  </TableCell>
                  <TableCell
                    className={cn("font-normal border-r w-fit px-3 py-1", {
                      "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400":
                        book?.copies === 0,
                      "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400":
                        book?.copies !== 0,
                    })}
                  >
                    {book?.copies}
                  </TableCell>
                  <TableCell
                    className={cn("font-normal w-fit px-3 py-1", {
                      "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400":
                        book?.available === true,
                      "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400":
                        book?.available === false,
                    })}
                  >
                    {book?.available === false ? "Not Available" : "Available"}
                  </TableCell>
                  <TableCell className="font-medium flex gap-3 items-center justify-end">
                    {/* Edit Button */}
                    <Link to={`/edit-book/${book?._id}`}>
                      <Button
                        title="Edit"
                        className="bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900 dark:text-green-400 dark:hover:bg-green-800 transition-all duration-300 hover:cursor-pointer"
                      >
                        <Edit2 />
                      </Button>
                    </Link>

                    {/* Delete Alert */}
                    <AlertDialog>
                      <AlertDialogTrigger
                        title="Delete"
                        className="bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900 dark:text-red-400 dark:hover:bg-red-800 transition-all duration-300 hover:cursor-pointer h-9 px-3 py-2 rounded-md flex items-center justify-center"
                      >
                        <Trash2 size={18} />
                      </AlertDialogTrigger>
                      <AlertDialogContent className="dark:bg-gray-800 dark:text-gray-100">
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure to delete this book?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your book and remove the book data from
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="hover:cursor-pointer">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleBookDelete(book?._id)}
                            disabled={isDeleting}
                            className="hover:cursor-pointer"
                          >
                            {isDeleting ? (
                              <AiOutlineLoading3Quarters className="animate-spin" />
                            ) : (
                              "Delete"
                            )}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    {/* Borrow Modal */}
                    <BorrowBookModalForm book={book} />

                    {/* View Book Details */}
                    <Link to={`/books/${book?._id}`}>
                      <Button
                        title="View"
                        className="bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800 transition-all duration-300 hover:cursor-pointer"
                      >
                        <IoOpenOutline />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Books;
