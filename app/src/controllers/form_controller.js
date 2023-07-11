export default function initialize(deps) {
  window.addEventListener("load", () => init(deps));
}

function addItem(dataset, callbacks, components) {
  const types = {
    degree: "formação",
    experience: "experiência",
    skill: "competência",
  };

  const { type } = dataset;
  const item = callbacks.addItem(callbacks, type);

  callbacks.closeMenu(`${type}-form`);
  callbacks.renderItem(callbacks, components, type, item);
  callbacks.showWarning(
    components,
    `${types[type]} adicionada com sucesso`,
    "success"
  );
}

function init({ callbacks, components, models }) {
  const form = callbacks.getElement("form");

  setInitialState(callbacks, form);
  setClickActions(callbacks, components, models);
  setInputMonitoring(callbacks, components, form);
  setBaseDataSync(callbacks, form);
  setSubmitMonitoring(callbacks, components, form);
}

function removeItem(target, callbacks, components) {
  const types = {
    degree: "formação",
    experience: "experiência",
    skill: "competência",
  };

  const modal = target.closest("[data-type]"),
    { type } = modal.dataset,
    [item, id] = type.split("-");

  callbacks.removeItem(item, id);
  callbacks.closeMenu(`${item}s-confirmation`);
  callbacks.unrenderItem(callbacks, item, id);
  callbacks.showWarning(
    components,
    `${types[item]} removida com sucesso`,
    "success"
  );
}

function setBaseDataSync(callbacks, form) {
  const syncData = ({ target }) => {
    const validChanges = ["name", "job", "address", "email", "website", "desc"],
      shouldNotSync = !validChanges.includes(target.id);

    if (shouldNotSync) return;

    const baseData = callbacks.getBaseData(form);
    localStorage.setItem("resume", JSON.stringify(baseData));
    console.warn("Active resume has been updated successfuly");
  };

  form.addEventListener("focusout", syncData);
}

function setClickActions(callbacks, components) {
  const actions = {
    openMenu: ({ dataset }) => callbacks.openMenu(dataset.dialog),
    closeMenu: ({ dataset }) => callbacks.closeMenu(dataset.dialog),
    addItem: ({ dataset }) => addItem(dataset, callbacks, components),
    displayConfirmation: (target) =>
      callbacks.displayConfirmation(callbacks, target),
    removeItem: (target) => removeItem(target, callbacks, components),
  };

  document.addEventListener("click", ({ target }) => {
    const { action } = target.dataset;

    if (actions[action]) actions[action](target);
  });
}

function setInitialState(callbacks, form) {
  callbacks.clearActiveResume(form);
  callbacks.resetIds();
  callbacks.clearForm(callbacks);
}

function setInputMonitoring(callbacks, components, form) {
  form.addEventListener("input", ({ target }) => {
    callbacks.updateCharacterCount(callbacks, target);
    validateInput(callbacks, components, target);
  });
}

function setSubmitMonitoring(callbacks, components, form) {
  form.addEventListener("submit", (evt) => {
    const formIsValid = validateSubmit(callbacks, components, form);

    if (formIsValid) return;

    evt.preventDefault();
  });
}

function validateSubmit(callbacks, components, form) {
  const { elements } = form,
    fieldsToCheck = ["name", "job", "address", "email", "website", "desc"],
    invalidFields = [];

  let formIsValid = true;

  for (const field of fieldsToCheck) {
    const fieldIsValid = validateInput(callbacks, components, elements[field]);

    if (fieldIsValid) continue;

    callbacks.showWarning(
      components,
      "Existem campos indevidamente preenchidos",
      "warning"
    );

    formIsValid = false;

    invalidFields.push(elements[field]);
  }

  if (!formIsValid) invalidFields[0].focus();

  return formIsValid;
}

function validateInput(callbacks, components, target) {
  const validityState = callbacks.getValidityState(target);

  callbacks.setFieldValidity(validityState);
  callbacks.setValidityMessage(callbacks, components, validityState);

  return validityState.valid;
}
