import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchRepoById } from '../api';
import type { GithubRepo } from '../types';

export default function RepoDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [repo, setRepo] = useState<GithubRepo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadRepo = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchRepoById(id);
        setRepo(data);
      } catch (err) {
        setError('Repository not found');
      } finally {
        setLoading(false);
      }
    };

    loadRepo();
  }, [id]);

  const handleBack = () => {
    navigate(-1); // возврат на предыдущую страницу (список)
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '2em' }}>Loading...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '2em' }}>{error}</div>;
  if (!repo) return null;

  return (
    <div id="repos">
      <div className="border-repo-details">
        <h2>{repo.name}</h2>
        <p>Description: {repo.description || 'none'}</p>
        <p>Language: {repo.language || 'not specified'}</p>
        <p>Stars: {repo.stargazers_count}</p>
        <p>Forks: {repo.forks_count}</p>
        <p>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            Open on GitHub
          </a>
        </p>
        <button className="buttonBack" onClick={handleBack}>
          Back to repositories
        </button>
      </div>
    </div>
  );
}