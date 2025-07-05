export type TBook = {
  _id: string;
  title: string;
  description: string;
  author: string;
  genre: string;
  isbn: string;
  copies: number;
  available: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TBorrowBook = {
  book: unknown;
  title: string;
  isbn: string;
  totalQuantity: number;
};

export interface IAddBorrowFormModalProps {
  handleBookBorrow(bookId: string): void;
  book: TBook;
}
