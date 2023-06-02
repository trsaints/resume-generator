export function renderExperience({ callbacks, components, exp }) {
  const panel = callbacks.getElement("experiences-list");
  const experienceCard = new components.ExperienceCard(exp);

  panel.appendChild(experienceCard);
}

export function renderDegree({ callbacks, components, deg }) {
  const panel = callbacks.getElement("degrees-list");
  const degreeCard = new components.DegreeCard(deg);

  panel.appendChild(degreeCard);
}

export function displayConfirmation(callbacks, target) {
  const card =
    target.closest("[data-element='experience']") ||
    target.closest("[data-element='degree']");

  const { dataset } = card;

  if (dataset.id !== undefined) {
    const modalName = `${dataset.element}s-confirmation`;
    callbacks.openMenu(modalName);
    const modal = callbacks.getElement(modalName);
    modal.setAttribute("data-item", `${dataset.element}-${dataset.id}`);
  }
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
