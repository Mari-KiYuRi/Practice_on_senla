import { useEffect, useState, useDeferredValue, useCallback, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useRepoStore } from '../store/repoStore';
import RepoCard from './RepoCard';

export default function RepoList() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const username = searchParams.get('username');

  const { repos, loading, error, fetchRepos } = useRepoStore();
  // хук useDeferredValue позволяет отложить обновление некоторых частей интерфейса, пока обновляются более важные элементы
  const [filterText, setFilterText] = useState('');
  const deferredFilter = useDeferredValue(filterText);

  const filteredRepos = useMemo(() => {
    if (!deferredFilter) return repos;
    return repos.filter(repo => 
      repo.name.toLowerCase().includes(deferredFilter.toLowerCase())
    );
  }, [repos, deferredFilter]);

  useEffect(() => {
    if (username) {
      fetchRepos(username);
    }
  }, [username, fetchRepos]);

  const handleRepoClick = useCallback((repoId: number) => {
    navigate(`/repository/${repoId}`);
  }, [navigate]);

  if (!username) {
    return <div style={{ textAlign: 'center', padding: '2em' }}>Enter a username to see repositories</div>;
  }

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2em' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '2em' }}>{error}</div>;
  }

  if (repos.length === 0) {
    return <div style={{ textAlign: 'center', padding: '2em' }}>User {username} has no public repositories.</div>;
  }

  return (
    <div id="repos">
      <input
        type="text"
        placeholder="Search by repository name..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        style={{ marginBottom: '1em', marginLeft: '25%', width: '100%' }}
      />
      {/* списки рендерятся путем преобразования массива данных в массив React-элементов с помощью метода .map() */}
      {filteredRepos.map((repo) => (
        // пропс key помогаtт React определять, какие элементы были изменены, добавлены или удалены
        // его всегда необходимо указывать для элементов созданных внутри .map()
        <RepoCard key={repo.id} repo={repo} onClick={handleRepoClick} />
      ))}
    </div>
  );
}