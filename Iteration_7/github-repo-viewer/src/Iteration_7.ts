// cd github-repo-viewer
// npm run dev
interface GithubRepo {
    id: number;
    name: string;
    visibility: string;
    description: string | null;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    html_url: string;
}
interface Repo {
    id: number;
    name: string;
    visibility: string;
    description: string | null;
    language: string | null;
    stars: number;
    forks: number;
}
type LanguageColorMap = Record<string, string>;


const reposContainer = document.getElementById('repos') as HTMLDivElement;
const usernameInput = document.getElementById('username') as HTMLInputElement;
const searchButton = document.getElementById('buttonUser') as HTMLButtonElement;
const backButton = document.getElementById('backButton') as HTMLButtonElement;

const colorCircle : LanguageColorMap = {
    'TypeScript': 'rgb(49, 120, 197)',
    'C++': 'rgb(243, 75, 125)',
    'C#': 'rgb(23, 133, 0)',
    'HTML': 'rgb(233, 76, 42)',
    'JavaScript': 'rgb(237, 225, 100)'
}

window.addEventListener('DOMContentLoaded', handleRoute);
window.addEventListener('hashchange', handleRoute);

function handleRoute(): void {
    const params = new URLSearchParams(window.location.search);
    const username = params.get('username');
    const repoId = window.location.hash.replace('#', '');

    if (repoId) {
        showRepoDetails(repoId);
        return;
    }

    if (username) {
        usernameInput.value = username;
        LoadRepos(username);
        return;
    }

    backButton.style.display = 'none';
}

function repository(
    id: number,
    name: string,
    visibility: string,
    description: string | null,
    language: string | null,
    stars: number,
    forks: number
): Repo {
    return { id, name, visibility, description, language, stars, forks };
}

let reps : Repo[] = [];

function LoadRepos(username : string): void {
    if (!username) {
        reposContainer.innerHTML = '';
        return;
    }
    reps = [];
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then((json: GithubRepo[] | {message: string}) => {
            if (!Array.isArray(json)) {
                reposContainer.innerHTML = '<h2>User not found</h2>';
                return;
            }

            json.forEach(elem => { 
            reps.push(repository(
                elem.id,
                elem.name, 
                elem.visibility,
                elem.description,
                elem.language,
                elem.stargazers_count,
                elem.forks_count
            ));
        });
        console.log(reps);

        renderRepositories(username);
        console.log(reposContainer);
    })
    .catch (error => console.error('Error fetching repos:', error));
}

function showRepoDetails(repoId : string): void {
    fetch(`https://api.github.com/repositories/${repoId}`)
        .then(r => r.json())
        .then((repo: GithubRepo) => {
            displayRepoDetails(repo);
        });
}

function displayRepoDetails(repo : GithubRepo) : void {
    reposContainer.innerHTML = '';
    backButton.textContent = 'Back to repositories';
    backButton.style.display = 'block';

    const details = document.createElement('div');
    details.className = 'border-repo-details';
    details.innerHTML = `
        <h2>${repo.name}</h2>
        <p>Description: ${repo.description || 'none'}</p>
        <p>Language: ${repo.language || 'not specified'}</p>
        <p>Stars: ${repo.stargazers_count}</p>
        <p>Forks: ${repo.forks_count}</p>
        <p><a href="${repo.html_url}" target="_blank">Open on GitHub</a></p>
    `;

    reposContainer.appendChild(details);
    reposContainer.appendChild(backButton);
}

backButton.addEventListener('click', () => {
    window.location.hash = '';
});

function renderRepositories(user : string): void {
    reposContainer.innerHTML = '';
    backButton.style.display = 'none';
    console.log(reps.length);

    if (reps.length === 0) {
        const emptyMsg = document.createElement('div');
        emptyMsg.className = 'border-repository';
        emptyMsg.style.textAlign = 'center';
        emptyMsg.style.padding = '2em';
        emptyMsg.textContent = `User ${user} has no public repositories.`;
        reposContainer.appendChild(emptyMsg);
        return;
    }

    reps.forEach(repo => {
        const card = document.createElement('div');
        card.dataset.repoId = repo.id.toString();
        card.className = 'border-repository animated';
        const color = colorCircle[repo.language ?? ''] || '#999';
        const lang = repo.language || 'not specified';
        card.innerHTML = `
        <div>
            <div style="align-items: center; display: flex; font-weight: bold;">
                <p style="color: rgb(0, 145, 255);">
                    <svg fill="gray" display="inline-block" overflow="visible" style="vertical-align:text-bottom">
                        <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
                    </svg>
                    ${repo.name}
                    <span class="visibility">${repo.visibility}</span>
                </p>
            </div>
            ${repo.description || ''}
        </div>
        
        <div style="align-items: center; display: flex; margin-top: 30px; padding-bottom: 20px;">
            <div class="circle" style="background-color: ${color};"></div>
            ${lang}
            <div class="margin">
                <svg fill="gray">
                    <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path>
                </svg>
                ${repo.stars}
            </div>
        
            <div class="margin">
                <svg fill="gray">
                    <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
                </svg>
                ${repo.forks}
            </div>
        </div>`;
        reposContainer.appendChild(card);
    });
}

searchButton.addEventListener('click', () => {
    const username = usernameInput.value;
    if (!username) return;

    window.location.search = `?username=${username}`;
});

reposContainer.addEventListener('click', (e : MouseEvent) => {
    const card = (e.target as Element).closest('.border-repository') as HTMLDivElement | null;
    if (!card) return;
    
    const repoId = card.dataset.repoId;
    if (!repoId) return;

    window.location.hash = repoId;
});