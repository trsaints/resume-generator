import { renderResume, printResume, setTitle } from "./views/resume_view.js";
import { getElement, getElements } from "./views/dom_view.js";
import ResumePanel from "./components/ResumePanel.js";
import initialize from "./controllers/resume_controller.js";

const dependencies = {
  callbacks: {
    getElement,
    getElements,
    printResume,
    renderResume,
    setTitle
  },
  components: {
    ResumePanel,
  },
};

initialize(dependencies);
