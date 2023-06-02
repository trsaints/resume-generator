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
  removeItem,
  saveFormState,
  syncFormState,
} from "./services/resume_service.js";

import {
  displayConfirmation,
  renderItem,
  unrenderItem,
} from "./views/resume_view.js";

import DegreeCard from "./components/DegreeCard.js";
import ExperienceCard from "./components/ExperienceCard.js";
import Degree from "./models/Degree.js";
import Experience from "./models/Experience.js";

const dependencies = {
  callbacks: {
    addItem,
    clearContent,
    closeMenu,
    displayConfirmation,
    getElement,
    getElements,
    hideElement,
    openMenu,
    renderItem,
    removeItem,
    showElement,
    showPopup,
    saveFormState,
    syncFormState,
    unrenderItem,
  },
  components: {
    DegreeCard,
    ExperienceCard,
    Degree,
    Experience,
  },
};

window.addEventListener("load", () => initialize(dependencies));
