// GitHub API Configuration
const GITHUB_USERNAME = 'bitarah';
const GITHUB_API_BASE = 'https://api.github.com';

// Language colors for visual consistency
const LANGUAGE_COLORS = {
    'JavaScript': '#f1e05a',
    'Python': '#3572A5',
    'Java': '#b07219',
    'C++': '#f34b7d',
    'C#': '#239120',
    'C': '#555555',
    'HTML': '#e34c26',
    'CSS': '#1572B6',
    'TypeScript': '#2b7489',
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'PHP': '#4F5D95',
    'Ruby': '#701516',
    'Swift': '#fa7343',
    'Kotlin': '#F18E33',
    'MATLAB': '#e16737',
    'R': '#198CE7',
    'Shell': '#89e051',
    'Jupyter Notebook': '#DA5B0B'
};

let allRepositories = [];
let filteredRepositories = [];

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
    setupEventListeners();
});

function setupEventListeners() {
    const languageFilter = document.getElementById('language-filter');
    const sortFilter = document.getElementById('sort-filter');
    const refreshBtn = document.getElementById('refresh-btn');

    languageFilter.addEventListener('change', filterAndSortProjects);
    sortFilter.addEventListener('change', filterAndSortProjects);
    refreshBtn.addEventListener('click', loadProjects);
}

async function loadProjects() {
    showLoading();
    hideError();

    try {
        // Fetch repositories
        const repos = await fetchRepositories();

        // Filter out forks and private repos, only include repos with content
        const validRepos = repos.filter(repo =>
            !repo.fork &&
            !repo.private &&
            repo.size > 0 &&
            repo.name !== `${GITHUB_USERNAME}.github.io` // Exclude portfolio repo
        );

        // Fetch additional data for each repository
        const repositoriesWithData = await Promise.all(
            validRepos.map(repo => enrichRepositoryData(repo))
        );

        allRepositories = repositoriesWithData;
        filteredRepositories = [...allRepositories];

        updateStats();
        populateLanguageFilter();
        filterAndSortProjects();
        hideLoading();

    } catch (error) {
        console.error('Error loading projects:', error);
        showError('Failed to load repositories. Please check your internet connection and try again.');
        hideLoading();
    }
}

async function fetchRepositories() {
    const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`);

    if (!response.ok) {
        if (response.status === 403) {
            throw new Error('GitHub API rate limit exceeded. Please try again later.');
        }
        throw new Error(`GitHub API error: ${response.status}`);
    }

    return await response.json();
}

async function enrichRepositoryData(repo) {
    const enrichedRepo = { ...repo };

    try {
        // Fetch OVERVIEW.md
        enrichedRepo.overview = await fetchFileContent(repo.name, 'OVERVIEW.md');

        // Fetch SKILLS.md
        enrichedRepo.skills = await fetchFileContent(repo.name, 'SKILLS.md');

        // Fetch images from IMAGE_ASSETS folder
        enrichedRepo.images = await fetchImageAssets(repo.name);

    } catch (error) {
        console.warn(`Error enriching repository ${repo.name}:`, error);
    }

    return enrichedRepo;
}

async function fetchFileContent(repoName, fileName) {
    try {
        const response = await fetch(`${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repoName}/contents/${fileName}`);

        if (response.ok) {
            const data = await response.json();
            return atob(data.content).replace(/\n/g, ' ').trim();
        }
    } catch (error) {
        console.warn(`Could not fetch ${fileName} for ${repoName}`);
    }

    return null;
}

async function fetchImageAssets(repoName) {
    try {
        const response = await fetch(`${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repoName}/contents/IMAGE_ASSETS`);

        if (response.ok) {
            const files = await response.json();
            return files
                .filter(file => file.type === 'file' && /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(file.name))
                .slice(0, 5) // Limit to 5 images
                .map(file => ({
                    name: file.name,
                    url: file.download_url
                }));
        }
    } catch (error) {
        console.warn(`Could not fetch IMAGE_ASSETS for ${repoName}`);
    }

    return [];
}

function updateStats() {
    const totalRepos = allRepositories.length;
    const languages = [...new Set(allRepositories.map(repo => repo.language).filter(Boolean))];
    const totalStars = allRepositories.reduce((sum, repo) => sum + repo.stargazers_count, 0);

    document.getElementById('total-repos').textContent = totalRepos;
    document.getElementById('total-languages').textContent = languages.length;
    document.getElementById('total-stars').textContent = totalStars;
}

function populateLanguageFilter() {
    const languageFilter = document.getElementById('language-filter');
    const languages = [...new Set(allRepositories.map(repo => repo.language).filter(Boolean))].sort();

    // Clear existing options (except "All Languages")
    languageFilter.innerHTML = '<option value="">All Languages</option>';

    languages.forEach(language => {
        const option = document.createElement('option');
        option.value = language;
        option.textContent = language;
        languageFilter.appendChild(option);
    });
}

function filterAndSortProjects() {
    const languageFilter = document.getElementById('language-filter').value;
    const sortFilter = document.getElementById('sort-filter').value;

    // Filter
    filteredRepositories = allRepositories.filter(repo => {
        if (languageFilter && repo.language !== languageFilter) {
            return false;
        }
        return true;
    });

    // Sort
    filteredRepositories.sort((a, b) => {
        switch (sortFilter) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'created':
                return new Date(b.created_at) - new Date(a.created_at);
            case 'stars':
                return b.stargazers_count - a.stargazers_count;
            case 'updated':
            default:
                return new Date(b.updated_at) - new Date(a.updated_at);
        }
    });

    renderProjects();
}

function renderProjects() {
    const projectsGrid = document.getElementById('projects-grid');

    if (filteredRepositories.length === 0) {
        projectsGrid.innerHTML = `
            <div class="no-projects">
                <i class="fas fa-folder-open" style="font-size: 3rem; color: #71717a; margin-bottom: 1rem;"></i>
                <p style="color: #a1a1aa; text-align: center;">No repositories found matching your criteria.</p>
            </div>
        `;
        return;
    }

    projectsGrid.innerHTML = filteredRepositories.map(repo => createProjectCard(repo)).join('');
}

function createProjectCard(repo) {
    const languageColor = LANGUAGE_COLORS[repo.language] || '#71717a';
    const updatedDate = new Date(repo.updated_at).toLocaleDateString();

    const overviewSection = repo.overview ? `
        <div class="project-overview">
            <h4>Overview</h4>
            <p>${repo.overview}</p>
        </div>
    ` : '';

    const skillsSection = repo.skills ? `
        <div class="project-skills">
            <h4>Key Skills</h4>
            <div class="skills-tags">
                ${repo.skills.split(',').map(skill =>
                    `<span class="skill-tag">${skill.trim()}</span>`
                ).join('')}
            </div>
        </div>
    ` : '';

    const imagesSection = repo.images && repo.images.length > 0 ? `
        <div class="project-images">
            <h4>Screenshots</h4>
            <div class="image-gallery">
                ${repo.images.map(image =>
                    `<div class="project-image" style="background-image: url('${image.url}')"
                          onclick="openImageModal('${image.url}', '${image.name}')"
                          title="${image.name}"></div>`
                ).join('')}
            </div>
        </div>
    ` : '';

    const badge = (repo.overview || repo.skills || repo.images.length > 0) ?
        '<div class="project-badge">Enhanced</div>' : '';

    return `
        <div class="project-card">
            ${badge}
            <div class="project-header">
                <h3 class="project-title">
                    <i class="fab fa-github"></i>
                    ${repo.name}
                </h3>
                <p class="project-description">
                    ${repo.description || 'No description available'}
                </p>
                <div class="project-meta">
                    <div class="project-language">
                        ${repo.language ? `
                            <span class="language-dot" style="background-color: ${languageColor}"></span>
                            <span>${repo.language}</span>
                        ` : '<span>No language</span>'}
                    </div>
                    <div class="project-stats">
                        <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                        <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                    </div>
                </div>
            </div>

            <div class="project-content">
                ${overviewSection}
                ${skillsSection}
                ${imagesSection}

                <div class="project-links">
                    <a href="${repo.html_url}" target="_blank" class="project-link">
                        <i class="fab fa-github"></i> View Code
                    </a>
                    ${repo.homepage ? `
                        <a href="${repo.homepage}" target="_blank" class="project-link">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

function openImageModal(imageUrl, imageName) {
    // Create modal for image viewing
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        cursor: pointer;
    `;

    modal.innerHTML = `
        <div style="max-width: 90%; max-height: 90%; position: relative;">
            <img src="${imageUrl}" alt="${imageName}"
                 style="max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 0.5rem;">
            <div style="position: absolute; top: -2rem; right: 0; color: white; font-size: 1.5rem; cursor: pointer;">
                <i class="fas fa-times"></i>
            </div>
        </div>
    `;

    modal.addEventListener('click', () => document.body.removeChild(modal));
    document.body.appendChild(modal);
}

function showLoading() {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('projects-grid').style.display = 'none';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('projects-grid').style.display = 'grid';
}

function showError(message) {
    const errorContainer = document.getElementById('error-container');
    const errorMessage = document.getElementById('error-message');

    errorMessage.textContent = message;
    errorContainer.style.display = 'block';
    document.getElementById('projects-grid').style.display = 'none';
}

function hideError() {
    document.getElementById('error-container').style.display = 'none';
}

// Mobile menu functionality (inherited from main portfolio)
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}