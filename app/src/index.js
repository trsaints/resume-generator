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
  addExperience,
  addDegree,
  saveFormState,
  syncFormState,
} from "./services/resume_service.js";

import { renderDegree, renderExperience } from "./views/resume_view.js";

import ExperienceCard from "./components/ExperienceCard.js";
import DegreeCard from "./components/DegreeCard.js";

const dependencies = {
  callbacks: {
    addExperience,
    addDegree,
    closeMenu,
    getElement,
    getElements,
    clearContent,
    hideElement,
    showElement,
    renderDegree, 
    renderExperience,
    showPopup,
    saveFormState,
    openMenu,
    syncFormState,
  },
  components: {
    ExperienceCard,
    DegreeCard,
  },
};

initialize(dependencies);
