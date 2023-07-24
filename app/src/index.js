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
  renderItem,
  setFieldValidity,
  setValidityMessage,
  unrenderItem,
  updateCharacterCount,
} from "./views/form_view.js";

import DegreeCard from "./components/DegreeCard.js";
import ExperienceCard from "./components/ExperienceCard.js";
import Icon from "./components/Icon.js";
import SkillCard from "./components/SkillCard.js";

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
    getValidityState,
    hideElement,
    openMenu,
    renderItem,
    removeItem,
    resetIds,
    setFieldValidity,
    setValidityMessage,
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
  }
};

initialize(dependencies);
