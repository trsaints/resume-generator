function clearForm(callbacks) {
  const form = callbacks.getElement("form");

  form.reset();
  form.elements["name"].focus();
}

function displayConfirmation(callbacks, target) {
  const card =
      target.closest("[data-element='experience']") ||
      target.closest("[data-element='degree']") ||
      target.closest("[data-element='skill']"),
    { dataset } = card;

  if (dataset.id === undefined) return;

  const modalName = `${dataset.element}s-confirmation`,
    modal = callbacks.getElement(modalName),
    typeTarget = `${dataset.element}-${dataset.id}`;

  callbacks.openMenu(modalName);
  modal.setAttribute("data-type", typeTarget);
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

  const checkAndRemove = (card) => card.dataset.id == id ? card.remove() : "";

  cards.forEach(checkAndRemove);
}

function updateCharacterCount(callbacks, target) {
  const id = target.getAttribute("id"),
    { value, maxLength } = target;

  if (!id) return;

  const outputTarget = callbacks.getElement(`${id}-length`);

  if (!outputTarget) return;

  outputTarget.textContent = `${value.length}/${maxLength}`;
}

function setValidityMessage(callbacks, components, validityState) {
  const { validationTarget, validityMessage } = validityState,
    id = validationTarget.getAttribute("id");

  if (!id) return;

  const warningTarget = callbacks.getElement(`${id}-warning`);

  if (!warningTarget) return;

  callbacks.clearContent(`${id}-warning`);

  const warningIcon = new components.Icon("circle-exclamation"),
    warningMessage = document.createTextNode(validityMessage);

  warningTarget.appendChild(warningIcon);
  warningTarget.appendChild(warningMessage);
}

function setFieldValidity({ validationTarget }) {
  const targetField = validationTarget.parentNode;

  if (targetField.classList.contains("invalid"))
    targetField.classList.remove("invalid");

  if (validationTarget.checkValidity()) return;

  targetField.classList.add("invalid");
}

export {
  clearForm,
  displayConfirmation,
  renderItem,
  setFieldValidity,
  setValidityMessage,
  unrenderItem,
  updateCharacterCount,
};
