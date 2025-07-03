import { useGetBorrowSummaryQuery } from '../api/booksApi';

const BorrowSummary: React.FC = () => {
  const { data, isLoading } = useGetBorrowSummaryQuery();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Borrow Summary</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.data.map((item, index) => (
            <div key={index} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{item.book.title}</h2>
              <p>ISBN: {item.book.isbn}</p>
              <p>Total Quantity: {item.totalQuantity}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BorrowSummary;