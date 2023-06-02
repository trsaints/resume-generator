export function displayConfirmation(callbacks, target) {
  const card =
    target.closest("[data-element='experience']") ||
    target.closest("[data-element='degree']");

  const { dataset } = card;

  if (dataset.id === undefined) return;

  const modalName = `${dataset.element}s-confirmation`;
  callbacks.openMenu(modalName);
  const modal = callbacks.getElement(modalName);
  modal.setAttribute("data-item", `${dataset.element}-${dataset.id}`);
}

export function renderItem(callbacks, components, type, item) {
  const result = {
    experience: () => new components.ExperienceCard(item),
    degree: () => new components.DegreeCard(item),
  };

  const panel = {
    experience: () => callbacks.getElement("experiences-list"),
    degree: () => callbacks.getElement("degrees-list"),
  };

  const target = panel[type]();

  target.appendChild(result[type]());
}

export function unrenderItem(callbacks, type, id) {
  const cards = callbacks.getElements(type);

  cards.forEach((card) => {
    if (card.dataset.id === id) card.remove();
  });
}

export function renderResume({ callbacks, components }) {
  const resume = JSON.parse(localStorage.getItem("resume"));
  const target = callbacks.getElement("body");
  const resumePanel = new components.ResumePanel(resume);

  console.warn("Resume generated successfully");
  console.log(resumePanel);

  target.appendChild(resumePanel);
}
