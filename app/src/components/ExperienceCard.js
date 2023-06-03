import DOMElement from "./DOMElement.js";
import Icon from "./Icon.js";

export default class ExperienceCard {
  #generate(title, company, period, location, desc, id) {
    const experienceCard = new DOMElement("details", ["experience"]),
      experienceContent = this.#generateContent(title, company, period, location, desc),
      experienceOptions = this.#generateOptions();

    experienceCard.appendChild(experienceContent);
    experienceCard.appendChild(experienceOptions);

    experienceCard.setAttribute("data-element", "experience");
    experienceCard.setAttribute("data-id", id);

    return experienceCard;
  }

  #generateContent(title, company, period, location, desc) {
    const experienceTitle = new DOMElement("summary", ["experience__title"]),
      experienceDetails = new DOMElement("ul", ["experience__details"]),
      experienceCompany = new DOMElement("li", ["experience__company"]),
      experienceLocation = new DOMElement("li", ["experience__location"]),
      experiencePeriod = new DOMElement("li", ["experience__period"]),
      experienceDesc = new DOMElement("p", ["experience__desc"]);

    const frag = document.createDocumentFragment();

    experienceTitle.textContent = title;
    experienceCompany.textContent = company;
    experiencePeriod.textContent = period;
    experienceLocation.textContent = location;
    experienceDesc.textContent = desc;

    experienceDetails.appendChild(experienceCompany);
    experienceDetails.appendChild(experiencePeriod);
    experienceDetails.appendChild(experienceLocation);

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
    deleteButton.setAttribute("type", "button");
    deleteButton.appendChild(deleteText);
    deleteButton.appendChild(deleteIcon);

    experienceOptions.appendChild(deleteButton);

    return experienceOptions;
  }

  constructor({ title, company, period, location, desc, id }) {
    return this.#generate(title, company, period, location, desc, id);
  }
}
