import { useParams, Link } from 'react-router-dom';
import { useGetBookQuery } from '../api/booksApi';

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetBookQuery(id!);

  if (isLoading) return <p>Loading...</p>;
  if (!data?.data) return <p>Book not found</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{data.data.title}</h1>
      <p>Author: {data.data.author}</p>
      <p>Genre: {data.data.genre}</p>
      <p>ISBN: {data.data.isbn}</p>
      <p>Description: {data.data.description}</p>
      <p>Copies: {data.data.copies}</p>
      <p>Available: {data.data.available ? 'Yes' : 'No'}</p>
      <Link to="/books" className="text-blue-500 mt-4 inline-block">Back to Books</Link>
    </div>
  );
};

export default BookDetails;