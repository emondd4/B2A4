import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetBookQuery, useCreateBookMutation, useUpdateBookMutation } from '../api/booksApi';
import type { Book } from '../types';

interface BookFormProps {
  isEdit?: boolean;
}

const genres = ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'] as const;
type Genre = typeof genres[number];

const BookForm: React.FC<BookFormProps> = ({ isEdit }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data } = useGetBookQuery(id!, { skip: !isEdit });
  const [createBook] = useCreateBookMutation();
  const [updateBook] = useUpdateBookMutation();
  const [formData, setFormData] = useState<Partial<Book>>({
    title: '',
    author: '',
    genre: '',
    isbn: '',
    description: '',
    copies: 0,
    available: false,
  });
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  useEffect(() => {
    if (isEdit && data?.data) {
      setFormData(data.data);
    }
  }, [data, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateBook({ id: id!, book: formData }).unwrap();
      } else {
        await createBook(formData).unwrap();
      }
      setShowSuccessDialog(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseDialog = () => {
    setShowSuccessDialog(false);
    navigate('/books');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{isEdit ? 'Edit Book' : 'Create Book'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Author</label>
          <input
            type="text"
            value={formData.author || ''}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Genre</label>
          <select
            value={formData.genre || ''}
            onChange={(e) => setFormData({ ...formData, genre: e.target.value as Genre })}
            className="border p-2 rounded w-full"
            required
          >
            <option value="" disabled>Select a genre</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">ISBN</label>
          <input
            type="text"
            value={formData.isbn || ''}
            onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Copies</label>
          <input
            type="number"
            value={formData.copies ?? ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                copies: e.target.value === '' ? 0 : Number(e.target.value),
              })
            }
            className="border p-2 rounded w-full"
            required
            min="0"
          />
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.available || false}
              onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">Available</span>
          </label>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          {isEdit ? 'Update' : 'Create'}
        </button>
      </form>

      {showSuccessDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">
              {isEdit ? 'Book Updated' : 'Book Created'}
            </h2>
            <p className="mb-4">
              The book has been {isEdit ? 'updated' : 'created'} successfully!
            </p>
            <button
              onClick={handleCloseDialog}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookForm;