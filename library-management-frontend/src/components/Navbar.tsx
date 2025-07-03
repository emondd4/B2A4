import { Link } from 'react-router-dom';

const Navbar: React.FC = () => (
  <nav className="bg-gray-800 p-4 text-white">
    <div className="container mx-auto flex justify-between">
      <Link to="/books" className="text-lg font-bold">Library Management</Link>
      <div className="space-x-4">
        <Link to="/books">Books</Link>
        <Link to="/create-book">Create Book</Link>
        <Link to="/borrow-summary">Borrow Summary</Link>
      </div>
    </div>
  </nav>
);

export default Navbar;