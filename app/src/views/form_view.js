function displayConfirmation(callbacks, target) {
  const card =
    target.closest("[data-element='experience']") ||
    target.closest("[data-element='degree']") ||
    target.closest("[data-element='skill']");

  const { dataset } = card;

  if (dataset.id === undefined) return;

  const modalName = `${dataset.element}s-confirmation`;
  callbacks.openMenu(modalName);
  const modal = callbacks.getElement(modalName);
  modal.setAttribute("data-item", `${dataset.element}-${dataset.id}`);
}

function renderItem(callbacks, components, type, item) {
  const result = {
    experience: () => new components.ExperienceCard(item),
    degree: () => new components.DegreeCard(item),
    skill: () => new components.SkillCard(item),
  };

  const panel = {
    experience: () => callbacks.getElement("experiences-list"),
    degree: () => callbacks.getElement("degrees-list"),
    skill: () => callbacks.getElement("skills-list"),
  };

  const target = panel[type]();

  target.appendChild(result[type]());
}

function unrenderItem(callbacks, type, id) {
  const cards = callbacks.getElements(type);

  cards.forEach((card) => {
    if (card.dataset.id === id) card.remove();
  });
}

export { displayConfirmation, renderItem, unrenderItem };
