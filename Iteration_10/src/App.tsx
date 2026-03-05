import { Routes, Route, Navigate } from 'react-router-dom';
import SearchForm from './components/SearchForm';
import RepoList from './components/RepoList';
import RepoDetails from './components/RepoDetails';

function App() {
  return (
    <div>
      <SearchForm />
      <Routes>
        <Route path="/" element={<RepoList />} />
        <Route path="/repository/:id" element={<RepoDetails />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;