export function initialize(deps) {
  window.addEventListener("load", () => init(deps));
}

function init({ callbacks, components }) {
  localStorage.removeItem("resume");

  callbacks.syncFormState({ callbacks });

  setInteractions({ callbacks, components });
}

function setInteractions({ callbacks, components }) {
  const actions = {
    openMenu: ({ dataset }) => callbacks.openMenu(dataset.dialog),
    closeMenu: ({ dataset }) => callbacks.closeMenu(dataset.dialog),
    addItem: ({ dataset }) => {
      const { item } = dataset;
      const itemContent = callbacks.addItem(callbacks, components, item);
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
