const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const contactForm = document.querySelector(".contact-form");

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  alert("需求已记录。后期可以接入真实表单或后台接口。");
  contactForm.reset();
});
