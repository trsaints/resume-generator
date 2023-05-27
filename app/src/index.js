import { initialize } from "./controller/controller.js";
import Resume from "./models/Resume.js";
import { generateResume } from "./services/resume_service.js";
import {
  clearContent,
  closeModal,
  getElement,
  getElements,
  hideElement,
  showElement,
  showPopup,
  showModal
} from "./views/dom_view.js";
const dependencies = {
  callbacks: {
    closeModal,
    getElement,
    getElements,
    clearContent,
    hideElement,
    showElement,
    showPopup,
    generateResume,
    showModal
  },
  components: {
    Resume,
  },
};

initialize(dependencies);
