import DOMElement from "./DOMElement.js";
import Icon from "./Icon.js";

export default class ExperienceCard {
  #generate(title, company, period, desc, id) {
    const experienceCard = new DOMElement("details", ["experience"]),
      experienceContent = this.#generateContent(title, company, period, desc),
      experienceOptions = this.#generateOptions();

    experienceCard.appendChild(experienceContent);
    experienceCard.appendChild(experienceOptions);

    experienceCard.setAttribute("data-element", "experience");
    experienceCard.setAttribute("data-id", id);

    return experienceCard;
  }

  #generateContent(title, company, period, desc) {
    const experienceTitle = new DOMElement("summary", ["experience__title"]),
      experienceDetails = new DOMElement("ul", ["experience__details"]),
      experienceCompany = new DOMElement("li", ["experience__company"]),
      experiencePeriod = new DOMElement("li", ["experience__period"]),
      experienceDesc = new DOMElement("p", ["experience__desc"]);

    const frag = document.createDocumentFragment();

    experienceTitle.textContent = title;
    experienceCompany.textContent = company;
    experiencePeriod.textContent = period;
    experienceDesc.textContent = desc;

    experienceDetails.appendChild(experienceCompany);
    experienceDetails.appendChild(experiencePeriod);

    frag.appendChild(experienceTitle);
    frag.appendChild(experienceDetails);
    frag.appendChild(experienceDesc);

    return frag;
  }

  #generateOptions() {
    const experienceOptions = new DOMElement("menu", ["experience__options"]),
      deleteButton = new DOMElement("button", ["delete-button"]);

    const deleteIcon = new Icon("trash-can");
    const deleteText = document.createTextNode("excluir experiência");

    deleteButton.setAttribute("data-action", "displayConfirmation");
    deleteButton.appendChild(deleteText);
    deleteButton.appendChild(deleteIcon);

    experienceOptions.appendChild(deleteButton);

    return experienceOptions;
  }

  constructor({ title, company, period, desc, id }) {
    return this.#generate(title, company, period, desc, id);
  }
}
