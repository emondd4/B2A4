import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Book, Borrow, BorrowSummary } from '../types';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://librarymanagementnode.vercel.app/api' }),
  endpoints: (builder) => ({
    getBooks: builder.query<{ success: boolean; message: string; data: Book[] }, { filter?: string; sortBy?: string; sort?: 'asc' | 'desc'; limit?: number }>({
      query: ({ filter, sortBy, sort, limit }) => ({
        url: '/books',
        params: { filter, sortBy, sort, limit },
      }),
    }),
    getBook: builder.query<{ success: boolean; message: string; data: Book }, string>({
      query: (id) => `/books/${id}`,
    }),
    createBook: builder.mutation<{ success: boolean; message: string; data: Book }, Partial<Book>>({
      query: (book) => ({
        url: '/books',
        method: 'POST',
        body: book,
      }),
    }),
    updateBook: builder.mutation<{ success: boolean; message: string; data: Book }, { id: string; book: Partial<Book> }>({
      query: ({ id, book }) => ({
        url: `/books/${id}`,
        method: 'PUT',
        body: book,
      }),
    }),
    deleteBook: builder.mutation<{ success: boolean; message: string; data: null }, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
    }),
    borrowBook: builder.mutation<{ success: boolean; message: string; data: Borrow }, { book: string; quantity: number; dueDate: string }>({
      query: (borrow) => ({
        url: '/borrow',
        method: 'POST',
        body: borrow,
      }),
    }),
    getBorrowSummary: builder.query<{ success: boolean; message: string; data: BorrowSummary[] }, void>({
      query: () => '/borrow',
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = booksApi;