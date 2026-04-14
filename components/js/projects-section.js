import { Projects } from "./exports/Projects.js";

const content = {
  tech: {
    kicker: "Soluções técnicas",
  },
  design: {
    kicker: "Projetos de design",
  },
};

const state = {
  activeCategory: "tech",
  expanded: false,
};

const INITIAL_PROJECTS_LIMIT = 8;

const elements = {
  container: document.querySelector("#projects-container"),
  count: document.querySelector("#projects-count"),
  kicker: document.querySelector("#projects-kicker"),
  description: document.querySelector("#projects-description"),
  toggle: document.querySelector(".project-toggle"),
  buttons: [...document.querySelectorAll(".project-toggle-btn")],
  moreButton: document.querySelector("#projects-more-btn"),
};

const createAction = (label, url, secondary = false) => {
  if (!url) return "";

  const className = secondary ? "btn btn-secondary" : "btn";
  return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="${className}">${label}</a>`;
};

const createCard = (project) => {
  const hasLinks = Boolean(project.repositoryUrl || project.previewUrl);
  const visibleSkills = project.skills.slice(0, 2);
  const extraSkills = project.skills.length - visibleSkills.length;
  const tagMarkup = visibleSkills
    .map((skill) => `<span class="project-card__tag">${skill}</span>`)
    .join("");

  return `
    <li class="project-card reveal">
      <div class="project-card__media">
        <img src="components/static/img/projects/${project.image}" alt="${project.project}" />
        <span class="project-card__overlay" aria-hidden="true"></span>
      </div>
      <div class="project-card__body">
        <div class="project-card__top">
          <span class="project-card__label">${project.typeLabel}</span>
        </div>
        <h3 class="project-card__title">${project.project}</h3>
        <p class="project-card__description">${project.description}</p>
        <div class="project-card__tags">${tagMarkup}${extraSkills > 0 ? `<span class="project-card__tag">+${extraSkills}</span>` : ""}</div>
        <div class="project-card__actions">
          ${createAction("Repositório", project.repositoryUrl)}
          ${createAction("Detalhes", project.previewUrl, true)}
          ${!hasLinks ? '<span class="project-card__tag">Projeto privado</span>' : ""}
        </div>
      </div>
    </li>
  `;
};

const createEmptyState = () => `
  <li class="project-card project-card--empty reveal">
    <div class="project-card__body">
      <span class="project-card__label">Em breve</span>
      <h3 class="project-card__title">Nenhum projeto listado nesta categoria</h3>
      <p class="project-card__description">
        Esta aba está reservada para trabalhos que você quiser destacar separadamente como design.
      </p>
    </div>
  </li>
`;

const revealRenderedCards = () => {
  const cards = document.querySelectorAll("#projects-container .reveal");
  cards.forEach((card, index) => {
    requestAnimationFrame(() => {
      setTimeout(() => card.classList.add("is-visible"), index * 70);
    });
  });
};

const updateMeta = (category, amount) => {
  const current = content[category];
  if (elements.kicker) elements.kicker.textContent = current.kicker;
  if (elements.description) elements.description.textContent = current.description;
  if (elements.count) elements.count.textContent = `${amount} projeto${amount > 1 ? "s" : ""}`;
  if (elements.container) elements.container.dataset.category = category;
};

const updateMoreButton = (total) => {
  if (!elements.moreButton) return;

  const hasExtraProjects = total > INITIAL_PROJECTS_LIMIT;
  elements.moreButton.hidden = !hasExtraProjects;
  elements.moreButton.textContent = state.expanded ? "Ver menos" : "Ver mais";
};

const renderProjects = (category) => {
  const filtered = Projects.filter((project) => project.category === category);
  const visibleProjects = state.expanded ? filtered : filtered.slice(0, INITIAL_PROJECTS_LIMIT);

  elements.container.classList.add("is-switching");

  window.setTimeout(() => {
    elements.container.innerHTML = filtered.length ? visibleProjects.map(createCard).join("") : createEmptyState();
    updateMeta(category, filtered.length);
    updateMoreButton(filtered.length);
    elements.container.classList.remove("is-switching");
    revealRenderedCards();
  }, 180);
};

const syncToggle = (category) => {
  elements.toggle.dataset.active = category;

  elements.buttons.forEach((button) => {
    const isActive = button.dataset.projectFilter === category;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
};

const handleToggleClick = (event) => {
  const button = event.target.closest("[data-project-filter]");
  if (!button) return;

  const nextCategory = button.dataset.projectFilter;
  if (nextCategory === state.activeCategory) return;

  state.activeCategory = nextCategory;
  state.expanded = false;
  syncToggle(nextCategory);
  renderProjects(nextCategory);
};

if (elements.container && elements.buttons.length) {
  elements.toggle?.addEventListener("click", handleToggleClick);
  elements.moreButton?.addEventListener("click", () => {
    state.expanded = !state.expanded;
    renderProjects(state.activeCategory);
  });
  syncToggle(state.activeCategory);
  renderProjects(state.activeCategory);
}
