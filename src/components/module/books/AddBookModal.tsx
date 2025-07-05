"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateBookMutation } from "@/redux/api/baseApi";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
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

const AddBookModal = () => {
  const [open, setOpen] = useState(false);

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
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add the book.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-white hover:bg-primary/90">
          📚 Add Book
        </Button>
      </DialogTrigger>

      <DialogContent aria-describedby={undefined} className="max-w-xl">
        <DialogTitle>📚 Add Book</DialogTitle>
        <DialogDescription>
          Fill in the details below to add a new book to the library catalog.
          Make sure all fields are accurate to help readers find the right book
          easily.
        </DialogDescription>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            {/* Title */}
            <FormField
              control={methods.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter book title" {...field} required />
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
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="Author name" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Genre */}
            <FormField
              control={methods.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Genre" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="fiction">FICTION</SelectItem>
                      <SelectItem value="non-fiction">NON-FICTION</SelectItem>
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
                  <FormLabel>ISBN</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="ISBN number"
                      {...field}
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={3}
                      placeholder="Book summary..."
                      {...field}
                      required
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
                  <FormLabel>Copies</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button type="submit" disabled={isLoading} className="w-full mt-2">
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                "📥 Add Book"
              )}
            </Button>
          </form>
        </FormProvider>

        {/* <AddBookModal onClose={() => setOpen(false)} /> */}
      </DialogContent>
    </Dialog>
  );
};

export default AddBookModal;
