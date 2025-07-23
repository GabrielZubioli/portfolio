const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

window.onscroll = () => {
  let top = window.scrollY;

  sections.forEach((sec) => {
    const offset = sec.offsetTop - 150;
    const height = sec.offsetHeight;
    const id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
      });

      const activeLink = document.querySelector(".navbar a[href*=" + id + "]");
      if (activeLink) activeLink.classList.add("active");
    }
  });
};

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

function renderCircles() {
  const circles = document.querySelectorAll(".circle");
  circles.forEach((elem) => {
    const dots = elem.getAttribute("data-dots");
    const marked = elem.getAttribute("data-percent");
    const percent = Math.floor((dots * marked) / 100);
    let points = "";
    const rotate = 360 / dots;

    const pointsContainer = elem.querySelector('.points-container');
    pointsContainer.innerHTML = "";

    for (let i = 0; i < dots; i++) {
      points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
    }
    pointsContainer.innerHTML = points;

    const pointsMarked = pointsContainer.querySelectorAll(".points");
    for (let i = 0; i < percent; i++) {
      pointsMarked[i].classList.add("marked");
    }
  });
}



const skillsSection = document.querySelector('.skills');
const skillBars = document.querySelectorAll('.skill-bar');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      skillBars.forEach(bar => {
        bar.classList.remove('animate');
        void bar.offsetWidth;
        bar.classList.add('animate');
      });
      renderCircles();
    } else {
      skillBars.forEach(bar => {
        bar.classList.remove('animate');
      });
    }
  });
}, { threshold: 0.5 });


observer.observe(skillsSection);


const headings = document.querySelectorAll('.heading');

const headingObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    } else {
      entry.target.classList.remove('animate');
    }
  });
}, { threshold: 0.3 });

headings.forEach(heading => headingObserver.observe(heading));

window.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  navbar.classList.add('animate-navbar');
});
