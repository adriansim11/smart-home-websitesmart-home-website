const form = document.querySelector("#quote-form");
const formNote = document.querySelector("#form-note");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const name = data.get("name").toString().trim().split(" ")[0] || "there";

  formNote.textContent = `Thanks, ${name}. Your smart-home quote request is ready to connect to email or a backend.`;
  form.reset();
});
