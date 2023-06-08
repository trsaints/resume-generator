export default function initialize(deps) {
  window.addEventListener("load", () => init(deps));
}

function init({ callbacks, components }) {
  const resume = callbacks.renderResume({ callbacks, components });
  callbacks.setTitle(resume.name);

  setInteractions({ callbacks })
}

function setInteractions({ callbacks }) {
  const actions = {
    printResume: () => callbacks.printResume({ callbacks }),
  };

  document.addEventListener("click", ({ target }) => {
    const { action } = target.dataset;

    if (actions[action]) actions[action](target);
  });
}
