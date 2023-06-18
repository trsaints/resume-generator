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

    const detailIcon = new Icon("angles-right");

    const frag = document.createDocumentFragment();

    skillDesc.textContent = desc;

    skillTitle.appendChild(detailIcon);
    skillTitle.appendChild(document.createTextNode(title));

    frag.appendChild(skillTitle);
    frag.appendChild(skillDetails);
    frag.appendChild(skillDesc);

    return frag;
  }

  #generateOptions() {
    const skillOptions = new DOMElement("menu", ["skill__options"]),
      deleteButton = new DOMElement("button", ["delete-button"]);

    const deleteIcon = new Icon("trash-can");
    const deleteSpan = new DOMElement("span", ["sr-only"]);
    deleteSpan.textContent = "excluir";

    deleteButton.setAttribute("data-action", "displayConfirmation");
    deleteButton.setAttribute("type", "button");
    deleteButton.appendChild(deleteSpan);
    deleteButton.appendChild(deleteIcon);
    
    skillOptions.appendChild(deleteButton);

    return skillOptions;
  }

  constructor({ title, desc, id }) {
    return this.#generate(title, desc, id);
  }
}
