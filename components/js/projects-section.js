import { Projects } from "./exports/Projects.js";
import { Consumer } from "./classes/Consumer.js";

const contentTemplate = (object) => `
<li class="card">
	<div class="img">
		<img src="components/static/img/projects/${object.image}" alt="${object.image}">
	</div>
	<div class="animation">
		<div class="details">
			<h3>${object.project}</h3>
			<div class="skill-tags">
				${object.skills.map(skill => `<span class="tag">${skill}</span>`).join("")}
			</div>
			<p>${object.description}</p>
			<div class="links">
				${object.repository ? `<a href="https://github.com/GabrielZubioli/${object.repository}" target="_blank" class="btn" >Repositório</a>` : ""}
				${object.pages ? `<a href="${object.pages}" target="_blank" class="btn">Web Site</a>` : ""}
				${!object.repository && !object.pages ? `<span>Ainda não há links disponíveis para este projeto!!</span>` : ""}
			</div>
		</div>
	</div>
</li>
`;

document.addEventListener("DOMContentLoaded", () => {
  new Consumer("#projects-container", contentTemplate, Projects);

  setTimeout(() => {
    document.querySelectorAll(".card").forEach(el => unifiedObserver.observe(el));
  }, 100);
});
