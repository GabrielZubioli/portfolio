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
 document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const section = entry.target;

        if (entry.isIntersecting) {
          const bars = section.querySelectorAll(".skill-bar");
          bars.forEach((bar, i) => {
            setTimeout(() => {
              bar.classList.add("aparecendo");
            }, i * 150);
          });

          const techItems = section.querySelectorAll(".skill-right li");
          techItems.forEach((li, i) => {
            setTimeout(() => {
              li.classList.add("aparecendo");
            }, i * 150);
          });

        } else {
          section.querySelectorAll(".skill-bar").forEach(bar => bar.classList.remove("aparecendo"));
          section.querySelectorAll(".skill-right li").forEach(li => li.classList.remove("aparecendo"));
        }
      });
    }, { threshold: 0.3 });

    const skillsSection = document.querySelector(".skills");
    if (skillsSection) observer.observe(skillsSection);
  });