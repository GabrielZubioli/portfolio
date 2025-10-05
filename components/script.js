const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");
const skillsSection = document.querySelector(".skills");
const slideContainer = document.querySelector(".slide-container");
const skillBars = document.querySelectorAll(".skill-bar");

window.onscroll = () => {
  const top = window.scrollY;

  sections.forEach((sec) => {
    const offset = sec.offsetTop - 150;
    const height = sec.offsetHeight;
    const id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => link.classList.remove("active"));
      const activeLink = document.querySelector(`.navbar a[href*=${id}]`);
      if (activeLink) activeLink.classList.add("active");
    }
  });
};

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

window.addEventListener("DOMContentLoaded", () => {
  navbar.classList.add("animate-navbar");
});

const unifiedObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const el = entry.target;

      if (entry.isIntersecting) {
        if (el.classList.contains("skills")) {
          const bars = el.querySelectorAll(".skill-bar");
          const techItems = el.querySelectorAll(".skill-right li");

          bars.forEach((bar, i) =>
            setTimeout(() => bar.classList.add("aparecendo"), i * 150)
          );

          techItems.forEach((li, i) =>
            setTimeout(() => li.classList.add("aparecendo"), i * 80)
          );
        }


        if (el.classList.contains("heading")) el.classList.add("animate");


        if (el.classList.contains("services-box")) el.classList.add("aparecendo");


        if (el.classList.contains("card")) el.classList.add("aparecendo");
      } else {

        if (el.classList.contains("skills")) {
          el.querySelectorAll(".skill-bar").forEach((bar) => bar.classList.remove("aparecendo"));
          el.querySelectorAll(".skill-right li").forEach((li) => li.classList.remove("aparecendo"));
        }
        if (el.classList.contains("heading")) el.classList.remove("animate");
        if (el.classList.contains("services-box")) el.classList.remove("aparecendo");
        if (el.classList.contains("card")) el.classList.remove("aparecendo");
      }
    });
  },
  { threshold: 0.3 }
);

if (skillsSection) unifiedObserver.observe(skillsSection);
document.querySelectorAll(".heading").forEach((h) => unifiedObserver.observe(h));
document.querySelectorAll(".services-box").forEach((box) => unifiedObserver.observe(box));
document.querySelectorAll(".card").forEach((el) => unifiedObserver.observe(el));

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        skillBars.forEach((bar) => {
          bar.classList.remove("animate");
          void bar.offsetWidth; // trigger reflow
          bar.classList.add("animate");
        });
        renderCircles();
      } else {
        skillBars.forEach((bar) => bar.classList.remove("animate"));
      }
    });
  },
  { threshold: 0.5 }
);

if (skillsSection) skillObserver.observe(skillsSection);

const reviewsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      if (entry.isIntersecting) el.classList.add("aparecendo");
      else el.classList.remove("aparecendo");
    });
  },
  { threshold: 0.5 }
);

if (slideContainer) reviewsObserver.observe(slideContainer);


const swiper = new Swiper(".slide-content", {
  slidesPerView: 4,
  spaceBetween: 25,
  centerSlide: true,
  fade: true,
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
    0: { slidesPerView: 1 },
    520: { slidesPerView: 1 },
    950: { slidesPerView: 2 },
  },
});