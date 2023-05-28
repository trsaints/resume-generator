import DOMElement from "./DOMElement.js";
import Icon from "./Icon.js";

export default class ExperienceCard {
  #generate(title, company, period, desc) {
    const experienceCard = new DOMElement("details", ["experience"]),
      experienceTitle = new DOMElement("summary", ["experience__title"]),
      experienceDetails = new DOMElement("ul", ["experience__details"]),
      experienceCompany = new DOMElement("li", ["experience__company"]),
      experiencePeriod = new DOMElement("li", ["experience__period"]),
      experienceDesc = new DOMElement("p", ["experience__desc"]),
      experienceOptions = new DOMElement("menu", ["experience__options"]),
      deleteButton = new DOMElement("button", ["delete-button"]);

    experienceTitle.textContent = title;
    experienceCompany.textContent = company;
    experiencePeriod.textContent = period;
    experienceDesc.textContent = desc;

    const deleteIcon = new Icon("trash-can");
    const deleteText = document.createTextNode("excluir experiência");

    deleteButton.setAttribute("data-action", "deleteExperience");
    deleteButton.appendChild(deleteText);
    deleteButton.appendChild(deleteIcon);

    experienceDetails.appendChild(experienceCompany);
    experienceDetails.appendChild(experiencePeriod);

    experienceOptions.appendChild(deleteButton);

    experienceCard.appendChild(experienceTitle);
    experienceCard.appendChild(experienceDetails);
    experienceCard.appendChild(experienceDesc);
    experienceCard.appendChild(experienceOptions);

    return experienceCard;
  }

  constructor({ title, company, period, desc }) {
    return this.#generate(title, company, period, desc);
  }
}
