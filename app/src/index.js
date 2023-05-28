import { initialize } from "./controller/controller.js";
import {
  clearContent,
  closeMenu,
  getElement,
  getElements,
  hideElement,
  openMenu,
  showElement,
  showPopup,
} from "./views/dom_view.js";

import { saveFormState, syncFormState, addExperience } from "./services/resume_service.js";

const dependencies = {
  callbacks: {
    addExperience,
    closeMenu,
    getElement,
    getElements,
    clearContent,
    hideElement,
    showElement,
    showPopup,
    saveFormState,
    openMenu,
    syncFormState,
  },
  components: {
  },
};

initialize(dependencies);
