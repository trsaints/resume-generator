export function renderResume(callbacks, components) {
  const resume = JSON.parse(localStorage.getItem("resume"));
  const target = callbacks.getElement("resume");
  const resumePanel = new components.ResumePage(resume);

  console.warn("Resume generated successfully");

  target.appendChild(resumePanel);

  return resume;
}

export function setTitle(content) {
  const title = document.querySelector("title");

  title.textContent = `Currículo ─ ${content.toUpperCase()}`;
}

export function printResume(callbacks) {
  const details = callbacks.getElements("detail");

  details.forEach((detail) =>
    detail.getAttribute("open") ? "" : detail.setAttribute("open", "")
  );

  window.print();
}
