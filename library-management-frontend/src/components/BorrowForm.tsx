import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBorrowBookMutation } from '../api/booksApi';

const BorrowForm: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const [borrowBook] = useBorrowBookMutation();
  const [formData, setFormData] = useState({
    quantity: 1,
    dueDate: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await borrowBook({ book: bookId!, ...formData }).unwrap();
      navigate('/books');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Borrow Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Quantity</label>
          <input
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
            className="border p-2 rounded w-full"
            required
            min="1"
          />
        </div>
        <div>
          <label>Due Date</label>
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Borrow</button>
      </form>
    </div>
  );
};

export default BorrowForm;