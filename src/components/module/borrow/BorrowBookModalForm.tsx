import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBorrowBookMutation } from "@/redux/api/baseApi";
import { formatISO } from "date-fns";
import { useForm, type SubmitHandler } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiBookAdd } from "react-icons/bi";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import type { TBook } from "types";

interface BorrowBookModalFormProps {
  book: TBook;
}

interface IborrowProps {
  _id: string;
  quantity: number;
  dueDate: string;
}

const BorrowBookModalForm = ({ book }: BorrowBookModalFormProps) => {
  console.log(book);
  const navigate = useNavigate();
  const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IborrowProps>();

  // Borrow Handler
  const onSubmit: SubmitHandler<IborrowProps> = async (data) => {
    const borrowData = {
      ...data,
      dueDate: formatISO(new Date(data?.dueDate)),
      book: book._id,
    };

    try {
      const res = await borrowBook(borrowData).unwrap();

      if (res) {
        toast.success("Book has been borrowed!");
        reset();
        navigate("/borrow-summary", { replace: true });

        console.log("Form submission data:", borrowData);
      }
    } catch (error) {
      toast.error("Failed to borrow the book.");
      console.error("Error while borrow book:", error);
    }
  };

  return (
    <div>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              disabled={book?.available === false || book?.copies === 0}
              title={
                book?.available === false || book?.copies === 0
                  ? "Copies not available"
                  : "Borrow"
              }
              className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 hover:cursor-pointer"
            >
              <BiBookAdd className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>Borrow {book.title}</DialogTitle>
                <DialogDescription>
                  Please enter the quantity and due date for borrowing this
                  book.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quantity" className="text-right">
                    Quantity
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max={book.copies}
                    className="col-span-3"
                    {...register("quantity", {
                      required: "Quantity is required",
                      valueAsNumber: true,
                      min: {
                        value: 1,
                        message: "Minimum quantity is 1",
                      },
                      max: {
                        value: book.copies,
                        message: `Maximum available: ${book.copies}`,
                      },
                    })}
                  />
                  {errors.quantity && (
                    <p className="col-span-4 text-right text-sm text-red-500">
                      {errors.quantity.message}
                    </p>
                  )}
                </div>
                {/* Due Date */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dueDate" className="text-right">
                    Due Date
                  </Label>
                  <Input
                    id="dueDate"
                    type="date"
                    className="col-span-3"
                    {...register("dueDate", {
                      required: "Due date is required",
                      validate: (value) => {
                        const selectedDate = new Date(value);
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return (
                          selectedDate >= today || "Date must be in the future"
                        );
                      },
                    })}
                  />
                  {errors.dueDate && (
                    <p className="col-span-4 text-right text-sm text-red-500">
                      {errors.dueDate.message}
                    </p>
                  )}
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline" className="hover:cursor-pointer">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  disabled={isBorrowing}
                  className="flex items-center justify-center hover:cursor-pointer"
                >
                  {isBorrowing ? (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  ) : (
                    "Borrow Book"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default BorrowBookModalForm;
