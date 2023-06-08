
export function renderResume({ callbacks, components }) {
  const resume = JSON.parse(localStorage.getItem("resume"));
  const target = callbacks.getElement("body");
  const resumePanel = new components.ResumePanel(resume);

  console.warn("Resume generated successfully");

  target.appendChild(resumePanel);
}
