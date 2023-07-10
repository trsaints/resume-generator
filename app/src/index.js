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
  getValidityState,
  removeItem,
  resetIds,
} from "./services/form_service.js";

import {
  clearForm,
  displayConfirmation,
  displayInputValidity,
  renderItem,
  setFieldValidity,
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
    displayInputValidity,
    getBaseData,
    getElement,
    getElements,
    getValidityState,
    hideElement,
    openMenu,
    renderItem,
    removeItem,
    resetIds,
    setFieldValidity,
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
