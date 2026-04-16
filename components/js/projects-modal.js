// Modal behavior for project cards
const createModal = () => {
  const modal = document.createElement('div');
  modal.className = 'project-modal';
  modal.hidden = true;

  modal.innerHTML = `
  <div class="project-modal__dialog" role="dialog" aria-modal="true" aria-hidden="true" tabindex="-1">
    <button type="button" class="project-modal__close" aria-label="Fechar modal">×</button>
    <div class="project-modal__content">
      <div class="project-modal__media"><img src="" alt="" /></div>
      <div class="project-modal__info">
        <h3 class="project-modal__title"></h3>
        <p class="project-modal__description"></p>
        <div class="project-modal__tech">
          <strong>Tecnologias:</strong>
          <span class="project-modal__skills"></span>
        </div>
      </div>
    </div>
  </div>
`;

  document.body.appendChild(modal);
  return modal;
};

const modal = createModal();
const dialog = modal.querySelector('.project-modal__dialog');
const img = modal.querySelector('.project-modal__media img');
const media = modal.querySelector('.project-modal__media');
const titleEl = modal.querySelector('.project-modal__title');
const descriptionEl = modal.querySelector('.project-modal__description');
const skillsEl = modal.querySelector('.project-modal__skills');

const focusableSelector =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

let modalOpen = false;
let lastFocused = null;

const getFocusable = () => {
  return [...dialog.querySelectorAll(focusableSelector)].filter(
    (el) => el.offsetParent !== null
  );
};

const openModal = (data = {}) => {
  if (modalOpen) return;

  lastFocused = document.activeElement;

  titleEl.textContent = data.title || '';
  descriptionEl.textContent = data.description || '';
  skillsEl.textContent = data.skills || '';

  if (data.image) {
    img.src = `components/static/img/projects/${data.image}`;
    img.alt = data.title || '';
    media.hidden = false;
  } else {
    img.removeAttribute('src');
    img.alt = '';
    media.hidden = true;
  }

  modal.hidden = false;

  requestAnimationFrame(() => {
    modal.classList.add('is-open');
    dialog.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    modalOpen = true;

    const focusable = getFocusable();
    if (focusable.length) {
      focusable[0].focus();
    } else {
      dialog.focus();
    }
  });
};

const closeModal = () => {
  if (!modalOpen) return;

  modal.classList.remove('is-open');
  dialog.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  modalOpen = false;

  const finishClose = () => {
    modal.hidden = true;
    img.removeAttribute('src');

    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  };

  // fallback caso não exista transition no CSS
  const hasTransition = getComputedStyle(modal).transitionDuration !== '0s';

  if (hasTransition) {
    modal.addEventListener('transitionend', finishClose, { once: true });
  } else {
    finishClose();
  }
};

// Delegate clicks on project cards
const container = document.querySelector('#projects-container');

if (container) {
  container.addEventListener('click', (e) => {
    const card = e.target.closest('.project-card');
    if (!card || !container.contains(card)) return;

    // não abrir modal se clicou em elemento interativo dentro do card
    if (e.target.closest('a, button, input, textarea, select, label')) return;

    openModal({
      image: card.dataset.image,
      title: card.dataset.title,
      description: card.dataset.description,
      skills: card.dataset.skills,
    });
  });
}

// Close handlers
modal.addEventListener('click', (e) => {
  if (
    e.target === modal ||
    e.target.closest('.project-modal__close')
  ) {
    closeModal();
  }
});

// Keyboard
document.addEventListener('keydown', (e) => {
  if (!modalOpen) return;

  if (e.key === 'Escape') {
    closeModal();
    return;
  }

  if (e.key === 'Tab') {
    const focusable = getFocusable();

    if (!focusable.length) {
      e.preventDefault();
      dialog.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});