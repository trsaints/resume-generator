export function initialize(deps) {
  init(deps);
}

function init({ callbacks, components }) {
  const form = callbacks.getElement("form");

  const actions = {
    generate: () => callbacks.generateResume({ components, form }),
    setExperience: () => callbacks.showModal("experiences"),
    setDegree: () => callbacks.showModal("degrees"),
    cancel: ({ dataset }) => callbacks.closeModal(dataset.cancel),
  };

  form.addEventListener("submit", (e) => e.preventDefault());

  document.addEventListener("click", ({ target }) => {
    const { action } = target.dataset;

    if (actions[action]) actions[action](target);
  });
}
