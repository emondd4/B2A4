import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetBooksQuery, useDeleteBookMutation } from '../api/booksApi';

const BookList: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [sort, setSort] = useState<'asc' | 'desc'>('asc');
  const [limit, setLimit] = useState(10);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [bookIdToDelete, setBookIdToDelete] = useState<string | null>(null);
  const { data, isLoading } = useGetBooksQuery({ filter, sortBy, sort, limit });
  const [deleteBook] = useDeleteBookMutation();

  const handleDeleteClick = (bookId: string) => {
    setBookIdToDelete(bookId);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (bookIdToDelete) {
      try {
        await deleteBook(bookIdToDelete).unwrap();
        setShowDeleteDialog(false);
        setBookIdToDelete(null);
        window.location.reload(); // Refresh the page to update the book list
      } catch (error) {
        console.error('Failed to delete book:', error);
      }
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setBookIdToDelete(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book List</h1>
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Filter by title/author/genre"
          value={filter ?? ''}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded"
        />
        <select onChange={(e) => setSortBy(e.target.value)} className="border p-2 rounded">
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="genre">Genre</option>
        </select>
        <select onChange={(e) => setSort(e.target.value as 'asc' | 'desc')} className="border p-2 rounded">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <input
          type="number"
          placeholder="Limit"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="border p-2 rounded w-20"
        />
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.data.map((book) => (
            <div key={book._id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p>Author: {book.author}</p>
              <p>Genre: {book.genre}</p>
              <p>ISBN: {book.isbn}</p>
              <p>Copies: {book.copies}</p>
              <p>Available: {book.available ? 'Yes' : 'No'}</p>
              <div className="mt-2 space-x-2">
                <Link to={`/books/${book._id}`} className="text-blue-500">View</Link>
                <Link to={`/edit-book/${book._id}`} className="text-green-500">Edit</Link>
                <Link to={`/borrow/${book._id}`} className="text-yellow-500">Borrow</Link>
                <button
                  onClick={() => handleDeleteClick(book._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete this book?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCancelDelete}
                className="bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400"
              >
                No
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;