import DOMElement from "./DOMElement.js";
import Icon from "./Icon.js";

export default class DegreeCard {
  #generate(title, school, period, desc, id) {
    const degreeCard = new DOMElement("details", ["degree"]),
      degreeContent = this.#generateContent(title, school, period, desc),
      degreeOptions = this.#generateOptions();

    degreeCard.appendChild(degreeContent);
    degreeCard.appendChild(degreeOptions);

    degreeCard.setAttribute("data-element", "degree");
    degreeCard.setAttribute("data-id", id);

    return degreeCard;
  }

  #generateContent(title, school, period, desc) {
    const degreeTitle = new DOMElement("summary", ["degree__title"]),
      degreeDetails = new DOMElement("ul", ["degree__details"]),
      degreeSchool = new DOMElement("li", ["degree__school"]),
      degreePeriod = new DOMElement("li", ["degree__period"]),
      degreeDesc = new DOMElement("p", ["degree__desc"]);

    const detailIcon = new Icon("angles-right"),
      schoolIcon = new Icon("school"),
      periodIcon = new Icon("calendar-days");

    const frag = document.createDocumentFragment();

    degreeSchool.textContent = school;
    degreePeriod.textContent = period;
    degreeDesc.textContent = desc;

    degreeTitle.appendChild(detailIcon);
    degreeTitle.appendChild(document.createTextNode(title));
    degreeSchool.appendChild(schoolIcon);
    degreePeriod.appendChild(periodIcon);

    degreeDetails.appendChild(degreeSchool);
    degreeDetails.appendChild(degreePeriod);

    frag.appendChild(degreeTitle);
    frag.appendChild(degreeDetails);
    frag.appendChild(degreeDesc);

    return frag;
  }

  #generateOptions() {
    const degreeOptions = new DOMElement("menu", ["degree__options"]),
      deleteButton = new DOMElement("button", ["delete-button"]);

    const deleteIcon = new Icon("trash-can");
    const deleteSpan = new DOMElement("span", ["sr-only"]);
    deleteSpan.textContent = "excluir";

    deleteButton.setAttribute("data-action", "displayConfirmation");
    deleteButton.setAttribute("type", "button");
    deleteButton.appendChild(deleteSpan);
    deleteButton.appendChild(deleteIcon);

    degreeOptions.appendChild(deleteButton);

    return degreeOptions;
  }

  constructor({ title, school, period, desc, id }) {
    return this.#generate(title, school, period, desc, id);
  }
}
