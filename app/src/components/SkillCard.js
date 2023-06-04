import DOMElement from "./DOMElement.js";
import Icon from "./Icon.js";

export default class SkillCard {
  #generate(title, desc, id) {
    const skillCard = new DOMElement("details", ["skill"]),
      skillContent = this.#generateContent(title, desc),
      skillOptions = this.#generateOptions();

    skillCard.appendChild(skillContent);
    skillCard.appendChild(skillOptions);

    skillCard.setAttribute("data-element", "skill");
    skillCard.setAttribute("data-id", id);

    return skillCard;
  }

  #generateContent(title, desc) {
    const skillTitle = new DOMElement("summary", ["skill__title"]),
      skillDetails = new DOMElement("ul", ["skill__details"]),
      skillDesc = new DOMElement("p", ["skill__desc"]);

    const detailIcon = new Icon("angles-down");

    const frag = document.createDocumentFragment();

    skillTitle.textContent = title;
    skillDesc.textContent = desc;

    skillTitle.appendChild(detailIcon);

    frag.appendChild(skillTitle);
    frag.appendChild(skillDetails);
    frag.appendChild(skillDesc);

    return frag;
  }

  #generateOptions() {
    const skillOptions = new DOMElement("menu", ["skill__options"]),
      deleteButton = new DOMElement("button", ["delete-button"]);

    const deleteIcon = new Icon("trash-can");
    const deleteText = document.createTextNode("excluir habilidade");

    deleteButton.setAttribute("data-action", "displayConfirmation");
    deleteButton.setAttribute("type", "button");
    deleteButton.appendChild(deleteText);
    deleteButton.appendChild(deleteIcon);

    skillOptions.appendChild(deleteButton);

    return skillOptions;
  }

  constructor({ title, desc, id }) {
    return this.#generate(title, desc, id);
  }
}
