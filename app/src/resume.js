import { renderResume } from "./views/resume_view.js";
import { getElement } from "./views/dom_view.js";
import ResumePanel from "./components/ResumePanel.js";

const dependencies = {
  callbacks: {
    getElement,
  },
  components: {
    ResumePanel,
  },
};

window.addEventListener("load", () => {
  renderResume(dependencies);
});
