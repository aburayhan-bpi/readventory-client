import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateBookMutation } from "@/redux/api/baseApi";
import { FormProvider, useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router";
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

const AddBookForm = () => {
  const navigate = useNavigate();
  const [createBook, { isLoading }] = useCreateBookMutation();

  const methods = useForm<IBook>({
    defaultValues: {
      title: "",
      author: "",
      genre: "fiction",
      isbn: "",
      description: "",
      copies: 1,
    },
  });

  const onSubmit = async (bookInfo: IBook) => {
    const bookData = {
      ...bookInfo,
      available: true,
    };

    try {
      const res = await createBook(bookData).unwrap();

      if (res) {
        methods.reset();
        toast.success("Book has been added!");
        navigate("/books", { replace: true });
        console.log("Submitted:", res);
      }
    } catch (error) {
      toast.error("Failed to add the book.");
      console.error("Error creating book:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <Card className="max-w-2xl mx-auto mt-10 shadow-xl border border-gray-200">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold text-gray-800 dark:text-white">
            📚 Add a New Book
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-3">
            {/* Title */}
            <FormField
              control={methods.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter book title"
                      {...field}
                      className="bg-white"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Author */}
            <FormField
              control={methods.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    Author
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Author name"
                      {...field}
                      className="bg-white"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Genre */}
            {/* <FormField
              control={methods.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">Genre</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Programming"
                      {...field}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={methods.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">Genre</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Genre" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="fiction">FICTION</SelectItem>
                      <SelectItem value="non-fiction">NON_FICTION</SelectItem>
                      <SelectItem value="science">SCIENCE</SelectItem>
                      <SelectItem value="history">HISTORY</SelectItem>
                      <SelectItem value="biography">BIOGRAPHY</SelectItem>
                      <SelectItem value="fantasy">FANTASY</SelectItem>
                      <SelectItem value="programming">PROGRAMMING</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ISBN */}
            <FormField
              control={methods.control}
              name="isbn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">ISBN</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="ISBN number"
                      {...field}
                      className="bg-white"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={methods.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief summary of the book"
                      rows={4}
                      className="bg-white"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Copies */}
            <FormField
              control={methods.control}
              name="copies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    Copies
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="bg-white"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                disabled={isLoading}
                type="submit"
                className="w-full text-base font-semibold tracking-wide hover:cursor-pointer"
              >
                {isLoading ? (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                ) : (
                  "📥 Add Book"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  );
};

export default AddBookForm;
