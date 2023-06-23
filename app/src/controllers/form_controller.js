export function initialize(deps) {
  window.addEventListener("load", () => init(deps));
}

function init({ callbacks, components, models }) {
  const form = callbacks.getElement("form");

  setInitialState(callbacks, form);
  setClickActions(callbacks, components, models);
  setInputMonitoring(callbacks, form);
  setBaseDataSync(callbacks, form);
}

function setClickActions(callbacks, components, models) {
  const actions = {
    openMenu: ({ dataset }) => callbacks.openMenu(dataset.dialog),
    closeMenu: ({ dataset }) => callbacks.closeMenu(dataset.dialog),
    addItem: ({ dataset }) => {
      const { item } = dataset;
      const itemContent = callbacks.addItem(callbacks, models, item);
      callbacks.closeMenu(`${item}-form`);
      callbacks.renderItem(callbacks, components, item, itemContent);
    },
    displayConfirmation: (target) => {
      callbacks.displayConfirmation(callbacks, target);
    },
    removeItem: (target) => {
      const modal = target.closest("[data-item]");
      const { item } = modal.dataset;
      const [type, id] = item.split("-");
      callbacks.removeItem(type, id);
      callbacks.closeMenu(`${type}s-confirmation`);
      callbacks.unrenderItem(callbacks, type, id);
    },
  };

  document.addEventListener("click", ({ target }) => {
    const { action } = target.dataset;

    if (actions[action]) actions[action](target);
  });
}

function setInputMonitoring(callbacks, form) {
  form.addEventListener("input", ({ target }) => {
    callbacks.updateCharacterCount(callbacks, target);
  });
}

function setInitialState(callbacks, form) {
  localStorage.removeItem("resume");

  const baseData = callbacks.getBaseData(form);

  localStorage.setItem("resume", JSON.stringify(baseData));

  callbacks.clearForm(callbacks);

  console.warn("Initial state has been set: active resume has been cleared");
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
