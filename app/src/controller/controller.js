export function initialize(deps) {
  init(deps);
}

function init({ callbacks, components }) {
  localStorage.removeItem("resume");

  const form = callbacks.getElement("form");

  callbacks.syncFormState({ callbacks });

  form.addEventListener("submit", (e) => e.preventDefault());

  setInteractions({ callbacks, components });
}

function setInteractions({ callbacks, components }) {
  const actions = {
    generateResume: () => {},
    openMenu: ({ dataset }) => callbacks.openMenu(dataset.dialog),
    closeMenu: ({ dataset }) => callbacks.closeMenu(dataset.dialog),
    addExperience: () => {
      callbacks.addExperience({ callbacks });
      callbacks.closeMenu("experiences");
    },
    addDegree: () => {
      callbacks.addDegree({ callbacks });
      callbacks.closeMenu("degrees");
    },
  };

  document.addEventListener("click", ({ target }) => {
    const { action } = target.dataset;

    if (actions[action]) actions[action](target);
  });
}
