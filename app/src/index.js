import initialize from "./controllers/form_controller.js";

import {
  clearContent,
  closeMenu,
  getElement,
  getElements,
  hideElement,
  openMenu,
  showElement,
  showWarning,
} from "./views/dom_view.js";

import {
  addItem,
  clearActiveResume,
  getBaseData,
  removeItem,
  resetIds,
} from "./services/resume_service.js";

import {
  clearForm,
  displayConfirmation,
  renderItem,
  unrenderItem,
  updateCharacterCount,
} from "./views/form_view.js";

import DegreeCard from "./components/DegreeCard.js";
import ExperienceCard from "./components/ExperienceCard.js";
import Icon from "./components/Icon.js";
import SkillCard from "./components/SkillCard.js";
import Degree from "./models/Degree.js";
import Experience from "./models/Experience.js";
import Skill from "./models/Skill.js";

const dependencies = {
  callbacks: {
    addItem,
    clearActiveResume,
    clearContent,
    clearForm,
    closeMenu,
    displayConfirmation,
    getBaseData,
    getElement,
    getElements,
    hideElement,
    openMenu,
    renderItem,
    removeItem,
    resetIds,
    showElement,
    showWarning,
    unrenderItem,
    updateCharacterCount,
  },
  components: {
    DegreeCard,
    ExperienceCard,
    SkillCard,
    Icon,
  },
  models: {
    Degree,
    Experience,
    Skill,
  },
};

initialize(dependencies);
