import { initialize } from "./controllers/form_controller.js";

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
  saveBaseFormState,
  syncFormState,
} from "./services/form_service.js";

import {
  displayConfirmation,
  renderItem,
  unrenderItem,
} from "./views/form_view.js";

import DegreeCard from "./components/DegreeCard.js";
import ExperienceCard from "./components/ExperienceCard.js";
import SkillCard from "./components/SkillCard.js";
import Degree from "./models/Degree.js";
import Experience from "./models/Experience.js";
import Skill from "./models/Skill.js";

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
    saveBaseFormState,
    syncFormState,
    unrenderItem,
  },
  components: {
    DegreeCard,
    ExperienceCard,
    SkillCard,
    Degree,
    Experience,
    Skill,
  },
};

initialize(dependencies);
