import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { fetchUserRepos } from '../api';
import type { Repo } from '../types';
import RepoCard from './RepoCard';

export default function RepoList() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const username = searchParams.get('username');

  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) {
      setRepos([]);
      return;
    }

    const loadRepos = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchUserRepos(username);
        setRepos(data);
      } catch (err) {
        setError('User not found');
        setRepos([]);
      } finally {
        setLoading(false);
      }
    };

    loadRepos();
  }, [username]);

  const handleRepoClick = (repoId: number) => {
    navigate(`/repository/${repoId}`);
  };

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
      {repos.map((repo) => (
        <RepoCard key={repo.id} repo={repo} onClick={handleRepoClick} />
      ))}
    </div>
  );
}