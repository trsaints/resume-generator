import ResumePage from "./components/ResumePage.js";
import initialize from "./controllers/resume_controller.js";
import { getElement, getElements } from "./views/dom_view.js";
import { printResume, renderResume, setTitle } from "./views/resume_view.js";

const dependencies = {
  callbacks: {
    getElement,
    getElements,
    printResume,
    renderResume,
    setTitle
  },
  components: {
    ResumePage,
  },
};

initialize(dependencies);
