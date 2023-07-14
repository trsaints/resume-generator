export default function initialize(deps) {
  window.addEventListener("load", () => init(deps));
}

function addItem(dataset, callbacks, components, form) {
  const typeTranslation = {
    degree: "formação",
    experience: "experiência",
    skill: "competência",
  };

  const { type } = dataset;

  const fieldsetIsInvalid = !validateItemFieldset(
    callbacks,
    components,
    form,
    type
  );

  if (fieldsetIsInvalid) return;

  const item = callbacks.addItem(callbacks, type);

  callbacks.closeMenu(`${type}-form`);
  callbacks.renderItem(callbacks, components, type, item);
  callbacks.showWarning(
    components,
    `${typeTranslation[type]} adicionada com sucesso`,
    "success"
  );
}

function init({ callbacks, components }) {
  const form = callbacks.getElement("form");

  setInitialState(callbacks, form);
  setClickActions(callbacks, components, form);
  setInputMonitoring(callbacks, components, form);
  setBaseDataSync(callbacks, form);
  setSubmitValidation(callbacks, components, form);
}

function removeItem(target, callbacks, components) {
  const typesTranslation = {
    degree: "formação",
    experience: "experiência",
    skill: "competência",
  };

  const modal = target.closest("[data-type]"),
    { type } = modal.dataset,
    [itemType, id] = type.split("-"),
    modalName = `${itemType}s-confirmation`;

  callbacks.removeItem(itemType, id);
  callbacks.closeMenu(modalName);
  callbacks.unrenderItem(callbacks, itemType, id);

  const warningMessage = `${typesTranslation[itemType]} removida com sucesso`;

  callbacks.showWarning(components, warningMessage, "success");
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

function setClickActions(callbacks, components, form) {
  const mainActions = {
    openMenu: ({ dataset }) => callbacks.openMenu(dataset.dialog),
    closeMenu: ({ dataset }) => callbacks.closeMenu(dataset.dialog),
    addItem: ({ dataset }) => addItem(dataset, callbacks, components, form),
    displayConfirmation: (target) =>
      callbacks.displayConfirmation(callbacks, target),
    removeItem: (target) => removeItem(target, callbacks, components),
  };

  const performMainAction = ({ target }) => {
    const { action } = target.dataset;

    if (mainActions[action]) mainActions[action](target);
  };

  document.addEventListener("click", performMainAction);
}

function setInitialState(callbacks, form) {
  callbacks.clearActiveResume(form);
  callbacks.resetIds();
  callbacks.clearForm(callbacks);
}

function setInputMonitoring(callbacks, components, form) {
  const respondToInput = ({ target }) => {
    callbacks.updateCharacterCount(callbacks, target);
    validateInput(callbacks, components, target);
  };

  form.addEventListener("input", respondToInput);
}

function setSubmitValidation(callbacks, components, form) {
  const preventInvalidSubmit = (evt) => {
    const formIsValid = validateRequiredFields(callbacks, components, form);

    if (formIsValid) return;

    evt.preventDefault();
  };

  form.addEventListener("submit", preventInvalidSubmit);
}

function validateRequiredFields(callbacks, components, form) {
  const fieldsToCheck = ["name", "job", "address", "email", "website", "desc"];

  return validateFieldset(callbacks, components, form, fieldsToCheck);
}

function validateItemFieldset(callbacks, components, form, type) {
  const typesFields = {
    degree: ["degreeName", "degreeSchool", "degreePeriod", "degreeDesc"],
    experience: [
      "jobTitle",
      "jobCompany",
      "jobPeriod",
      "jobLocation",
      "jobDesc",
    ],
    skill: ["skillName", "skillDesc"],
  };

  return validateFieldset(callbacks, components, form, typesFields[type]);
}

function validateFieldset(callbacks, components, form, fields) {
  const { elements } = form,
    invalidFields = [];

  let fieldsetIsValid = true;

  for (const field of fields) {
    const fieldIsValid = validateInput(callbacks, components, elements[field]);

    if (fieldIsValid) continue;

    const warningMessage = "Existem campos indevidamente preenchidos";

    callbacks.showWarning(components, warningMessage, "warning");

    fieldsetIsValid = false;

    invalidFields.push(elements[field]);
  }

  if (!fieldsetIsValid) invalidFields[0].focus();

  return fieldsetIsValid;
}

function validateInput(callbacks, components, target) {
  const validityState = callbacks.getValidityState(target);

  callbacks.setFieldValidity(validityState);
  callbacks.setValidityMessage(callbacks, components, validityState);

  return validityState.valid;
}
