import { create } from 'zustand';
import { fetchUserRepos } from '../api';
import type { Repo } from '../types';

// Zustand - библиотека, которая выносит данные в голобальное хранилище, доступное из любого компонента без необходимости явной передачи данных через цепочку родительских компонентов.
// react context - встроенный в React механизм, позволяющий создать провайдер с данными на верхнем уровне и использовать эти данные в любом вложенном компоненте через хук useContext.
// хук useSyncExternalStore тоже встроен в React, позволяет компонентам поключиться к любому внешнему источнику данных.

interface RepoState {
  repos: Repo[];
  loading: boolean;
  error: string | null;
  fetchRepos: (username: string) => Promise<void>;
}

export const useRepoStore = create<RepoState>((set) => ({
  repos: [],
  loading: false,
  error: null,

  fetchRepos: async (username: string) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchUserRepos(username);
      set({ repos: data, loading: false });
    } catch (err) {
      set({ error: 'User not found', loading: false, repos: [] });
    }
  },
}));