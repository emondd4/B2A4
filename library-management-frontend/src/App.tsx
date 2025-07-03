import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { store } from './store/store';
import Navbar from './components/Navbar';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import BookForm from './components/BookForm';
import BorrowForm from './components/BorrowForm';
import BorrowSummary from './components/BorrowSummary';

const App: React.FC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/books" element={<BookList />} />
        <Route path="/create-book" element={<BookForm />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/edit-book/:id" element={<BookForm isEdit />} />
        <Route path="/borrow/:bookId" element={<BorrowForm />} />
        <Route path="/borrow-summary" element={<BorrowSummary />} />
        <Route path="/" element={<Navigate to="/books" />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default App;