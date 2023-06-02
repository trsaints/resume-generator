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

import {
  addItem,
  saveFormState,
  syncFormState,
  removeItem,
} from "./services/resume_service.js";

import {
  renderItem,
  displayConfirmation,
  unrenderItem,
} from "./views/resume_view.js";

import ExperienceCard from "./components/ExperienceCard.js";
import DegreeCard from "./components/DegreeCard.js";
import Experience from "./models/Experience.js";
import Degree from "./models/Degree.js";

const dependencies = {
  callbacks: {
    closeMenu,
    getElement,
    getElements,
    clearContent,
    hideElement,
    showElement,
    addItem,
    renderItem,
    removeItem,
    showPopup,
    saveFormState,
    openMenu,
    syncFormState,
    displayConfirmation,
    unrenderItem,
  },
  components: {
    ExperienceCard,
    DegreeCard,
    Experience,
    Degree,
  },
};

window.addEventListener("load", () => initialize(dependencies));
