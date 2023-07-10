function clearForm(callbacks) {
  const form = callbacks.getElement("form");

  form.reset();
  form.elements[1].focus();
}

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
  modal.setAttribute("data-type", `${dataset.element}-${dataset.id}`);
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

function updateCharacterCount(callbacks, target) {
  const id = target.getAttribute("id"),
    { value, maxLength } = target;

  if (!id) return;

  const outputTarget = callbacks.getElement(`${id}-length`);

  if (!outputTarget) return;

  outputTarget.textContent = `${value.length}/${maxLength}`;
}

function displayInputValidity(callbacks, target, message) {
  const id = target.getAttribute("id");

  if (!id) return;

  const warningTarget = callbacks.getElement(`${id}-warning`);

  if (!warningTarget) return;

  warningTarget.textContent = message;
}

function setFieldValidity(target) {
  const targetField = target.parentNode;

  if (targetField.classList.contains("invalid"))
    targetField.classList.remove("invalid");

  if (target.checkValidity()) return;

  targetField.classList.add("invalid");
}

export {
  clearForm,
  displayConfirmation,
  displayInputValidity,
  renderItem,
  setFieldValidity,
  unrenderItem,
  updateCharacterCount,
};
