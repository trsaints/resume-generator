import DOMElement from "./DOMElement.js";
import Icon from "./Icon.js";

export default class DegreeCard {
  #generate(title, school, period, desc) {
    const degreeCard = new DOMElement("details", ["degree"]),
      degreeTitle = new DOMElement("summary", ["degree__title"]),
      degreeDetails = new DOMElement("ul", ["degree__details"]),
      degreeSchool = new DOMElement("li", ["degree__school"]),
      degreePeriod = new DOMElement("li", ["degree__period"]),
      degreeDesc = new DOMElement("p", ["degree__desc"]),
      degreeOptions = new DOMElement("menu", ["degree__options"]),
      deleteButton = new DOMElement("button", ["delete-button"]);

    degreeTitle.textContent = title;
    degreeSchool.textContent = school;
    degreePeriod.textContent = period;
    degreeDesc.textContent = desc;

    const deleteIcon = new Icon("trash-can");
    const deleteText = document.createTextNode("excluir formação");

    deleteButton.setAttribute("data-action", "deleteDegree");
    deleteButton.appendChild(deleteText);
    deleteButton.appendChild(deleteIcon);

    degreeDetails.appendChild(degreeSchool);
    degreeDetails.appendChild(degreePeriod);
    
    degreeOptions.appendChild(deleteButton);
    
    degreeCard.appendChild(degreeTitle);
    degreeCard.appendChild(degreeDetails);
    degreeCard.appendChild(degreeDesc);
    degreeCard.appendChild(degreeOptions);

    return degreeCard;
  }

  constructor({ title, school, period, desc }) {
    return this.#generate(title, school, period, desc);
  }
}
