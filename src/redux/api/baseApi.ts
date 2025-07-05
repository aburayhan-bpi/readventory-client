import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api",
  }),
  tagTypes: ["book", "borrow"],
  endpoints: (builder) => ({
    // Get all books
    getBooks: builder.query({
      query: () => "/books",
      providesTags: ["book"],
    }),
    // Get single book
    getSingleBooks: builder.query({
      query: (bookId) => `/books/${bookId}`,
      providesTags: ["book"],
    }),
    // Get books summary
    getSummary: builder.query({
      query: () => "/borrow",
      providesTags: ["borrow"],
    }),
    // Create a book
    createBook: builder.mutation({
      query: (bookData) => ({
        url: "/books",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["book"],
    }),

    // Update a book
    updateBook: builder.mutation({
      query: ({ bookId, body }) => ({
        url: `/books/${bookId}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["book"],
    }),
    // Delete a book
    deleteBook: builder.mutation({
      query: (bookId) => ({
        url: `/books/${bookId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["book"],
    }),
    // Borrow a book
    borrowBook: builder.mutation({
      query: (borrowData) => ({
        url: "/borrow",
        method: "POST",
        body: borrowData,
      }),
      invalidatesTags: ["borrow", "book"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useUpdateBookMutation,
  useGetSingleBooksQuery,
  useCreateBookMutation,
  useGetSummaryQuery,
  useDeleteBookMutation,
  useBorrowBookMutation,
} = baseApi;
