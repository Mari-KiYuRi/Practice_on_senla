import type { GithubRepo, Repo } from './types.ts';

export async function fetchUserRepos(username: string): Promise<Repo[]> {
  const response = await fetch(`https://api.github.com/users/${username}/repos`);
  if (!response.ok) {
    throw new Error('User not found');
  }
  const data: GithubRepo[] = await response.json();
  return data.map((repo) => ({
    id: repo.id,
    name: repo.name,
    visibility: repo.visibility,
    description: repo.description,
    language: repo.language,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
  }));
}

export async function fetchRepoById(id: string): Promise<GithubRepo> {
  const response = await fetch(`https://api.github.com/repositories/${id}`);
  if (!response.ok) {
    throw new Error('Repository not found');
  }
  return response.json();
}