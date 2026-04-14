const menuToggle = document.querySelector("#menu-toggle");
const navbar = document.querySelector(".navbar");
const navLinks = [...document.querySelectorAll(".navbar a")];
const sections = [...document.querySelectorAll("main section[id]")];
const revealElements = [...document.querySelectorAll(".reveal")];

const closeMenu = () => {
  navbar?.classList.remove("active");
  menuToggle?.setAttribute("aria-expanded", "false");
};

menuToggle?.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  navbar?.classList.toggle("active");
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

const setActiveLink = () => {
  const scrollPosition = window.scrollY + 160;

  sections.forEach((section) => {
    const start = section.offsetTop;
    const end = start + section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollPosition >= start && scrollPosition < end) {
      navLinks.forEach((link) => link.classList.remove("active"));
      const activeLink = document.querySelector(`.navbar a[href="#${id}"]`);
      activeLink?.classList.add("active");
    }
  });
};

window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18, rootMargin: "0px 0px -40px 0px" }
);

revealElements.forEach((element) => revealObserver.observe(element));

if (typeof Swiper !== "undefined") {
  new Swiper(".slide-content", {
    slidesPerView: 1,
    spaceBetween: 24,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      768: {
        slidesPerView: 1.35,
      },
      1080: {
        slidesPerView: 2.2,
      },
    },
  });
}
