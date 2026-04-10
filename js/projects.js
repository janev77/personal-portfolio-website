// format: "janev77/repo-name"
const FEATURED_REPOS = [
  "janev77/GymManagementSystem",
  "janev77/ReportHubSystem",
  "janev77/MSE_Scraper",
  "janev77/astrodelivery",
];

async function fetchRepo(slug) {
  const res = await fetch(`https://api.github.com/repos/${slug}`);
  if (!res.ok) throw new Error(`Failed to fetch ${slug}`);
  const data = await res.json();
  return {
    title: data.name.replace(/[-_]/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
    description: data.description || "No description provided.",
    tags: data.topics && data.topics.length ? data.topics : [data.language].filter(Boolean),
    repoUrl: data.html_url,
    liveUrl: data.homepage && data.homepage.trim() ? data.homepage : null,
  };
}

function renderCard(project) {
  const tagsHtml = project.tags.map(t => `<span>${t}</span>`).join("");
  const liveLink = project.liveUrl
    ? `<a href="${project.liveUrl}" target="_blank" rel="noopener">
         <i class="fa-solid fa-up-right-from-square"></i> Live
       </a>`
    : "";
  const repoLink = `
    <a href="${project.repoUrl}" target="_blank" rel="noopener">
      <i class="fa-brands fa-github"></i> Repo
    </a>`;

  return `
    <div class="card card--no-image">
      <div class="card__body">
        <h4 class="card__title">${project.title}</h4>
        <p class="card__desc">${project.description}</p>
        <div class="card__tags">${tagsHtml}</div>
        <div class="card__links">${liveLink}${repoLink}</div>
      </div>
    </div>
  `;
}

async function loadGithubProjects() {
  const container = document.getElementById("github-projects");
  try {
    const projects = await Promise.all(FEATURED_REPOS.map(fetchRepo));
    container.innerHTML = projects.map(renderCard).join("");
  } catch (err) {
    console.error(err);
    container.innerHTML = `<p class="projects-loading">Could not load GitHub projects.</p>`;
  }
}

loadGithubProjects();