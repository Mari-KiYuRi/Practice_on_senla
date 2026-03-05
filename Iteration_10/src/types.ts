export interface GithubRepo {
    id: number;
    name: string;
    visibility: string;
    description: string | null;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    html_url: string;
}
export interface Repo {
    id: number;
    name: string;
    visibility: string;
    description: string | null;
    language: string | null;
    stars: number;
    forks: number;
}
export type LanguageColorMap = Record<string, string>;