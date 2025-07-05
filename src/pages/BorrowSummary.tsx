import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetSummaryQuery } from "@/redux/api/baseApi";
import { Loader2 } from "lucide-react";

interface Iborrowbook {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  book: any;
  id: string;
  title: string;
  isbn: string;
  totalQuantity: number;
}

const BorrowSummary = () => {
  const { data, isLoading, isError } = useGetSummaryQuery(undefined);
  console.log({ data, isLoading, isError });

  return (
    <Card className="max-w-5xl mx-auto mt-12 shadow-md">
      <CardHeader>
        <CardTitle className="text-center text-3xl font-semibold text-gray-800 dark:text-white">
          📘 Borrow Summary
        </CardTitle>
      </CardHeader>

      <CardContent className="overflow-x-auto">
        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : isError ? (
          <Alert variant="destructive" className="my-5">
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription>Could not fetch summary data.</AlertDescription>
          </Alert>
        ) : (
          <Table>
            <TableCaption className="text-sm text-muted-foreground mt-2">
              A list of all borrowed books and their total borrowed quantity.
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead className="w-1/2 text-base text-gray-700 dark:text-white">
                  Book Title
                </TableHead>
                <TableHead className="w-1/4 text-base text-gray-700 dark:text-white">
                  ISBN
                </TableHead>
                <TableHead className="text-base text-gray-700 dark:text-white text-center">
                  Total Borrowed
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.data?.map((book: Iborrowbook, index: number) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <TableCell className="font-medium">
                    {book?.book?.title}
                  </TableCell>
                  <TableCell>{book?.book?.isbn}</TableCell>
                  <TableCell className="text-center">
                    {book?.totalQuantity}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default BorrowSummary;
