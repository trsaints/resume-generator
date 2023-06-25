export default function initialize(deps) {
  window.addEventListener("load", () => init(deps));
}

function init({ callbacks, components, models }) {
  const form = callbacks.getElement("form");

  setInitialState(callbacks, form);
  setClickActions(callbacks, components, models);
  setInputMonitoring(callbacks, form);
  setBaseDataSync(callbacks, form);
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

function setInputMonitoring(callbacks, form) {
  form.addEventListener("input", ({ target }) =>
    callbacks.updateCharacterCount(callbacks, target)
  );
}

function setInitialState(callbacks, form) {
  callbacks.clearActiveResume(form);
  callbacks.resetIds();
  callbacks.clearForm(callbacks);
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
