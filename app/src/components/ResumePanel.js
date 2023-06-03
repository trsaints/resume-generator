import DOMElement from "./DOMElement.js";
import Icon from "./Icon.js";
export default class ResumePanel {
  #generate(name, job, desc, address, email, website, experiences, degrees) {
    const resumePanel = document.createDocumentFragment(),
      resumeHeader = this.#generateHeader(
        name,
        job,
        desc,
        address,
        email,
        website
      ),
      resumeMainContent = this.#generateMainContent(experiences, degrees);

    resumePanel.appendChild(resumeHeader);
    resumePanel.appendChild(resumeMainContent);

    return resumePanel;
  }

  #generatePersonalInfo(name, job, desc) {
    const aboutPanel = new DOMElement("section", ["about"]),
      aboutTitle = new DOMElement("h2", ["about__title"]),
      aboutJob = new DOMElement("p", ["about__job"]),
      aboutDesc = new DOMElement("p", ["about__desc"]);

    const jobIcon = new Icon("screwdriver-wrench");

    aboutTitle.textContent = name;
    aboutJob.textContent = job;
    aboutDesc.textContent = desc;

    aboutJob.appendChild(jobIcon);

    aboutPanel.appendChild(aboutTitle);
    aboutPanel.appendChild(aboutJob);
    aboutPanel.appendChild(aboutDesc);

    return aboutPanel;
  }

  #generateContactInfo(address, email, website) {
    const infoPanel = new DOMElement("section", ["info"]),
      infoTitle = new DOMElement("h2", ["info__title"]),
      infoData = new DOMElement("address", ["info__data"]),
      infoAddress = new DOMElement("p", ["info__address"]),
      infoMedia = new DOMElement("p", ["info__media"]),
      infoEmail = new DOMElement("a", ["info__email"]),
      infoWebPage = new DOMElement("a", ["info__web-page"]);

    const userIcon = new Icon("user"),
      locationIcon = new Icon("location-dot");

    infoTitle.textContent = "contato";
    infoAddress.textContent = address;
    infoEmail.textContent = email;
    infoWebPage.textContent = website;

    infoWebPage.setAttribute("href", website);
    infoEmail.setAttribute("href", `mailto:${email}`);

    infoTitle.appendChild(userIcon);
    infoAddress.appendChild(locationIcon);

    infoMedia.appendChild(infoEmail);
    infoMedia.appendChild(new DOMElement("br"));
    infoMedia.appendChild(infoWebPage);

    infoData.appendChild(infoAddress);
    infoData.appendChild(infoMedia);

    infoPanel.appendChild(infoTitle);
    infoPanel.appendChild(infoData);

    return infoPanel;
  }

  #generateExperience({ title, company, period, location, desc }) {
    const experiencePanel = new DOMElement("li", ["experience"]),
      experienceDetails = new DOMElement("details", ["experience__details"]),
      experienceTitle = new DOMElement("summary", ["experience__title"]),
      experienceInfo = new DOMElement("ul", ["experience__info"]),
      experienceCompany = new DOMElement("li", ["experience__company"]),
      experienceDate = new DOMElement("li", ["experience__date"]),
      experienceLocation = new DOMElement("li", ["experience__location"]),
      experienceTask = new DOMElement("p", ["experience__desc"]);

    const summaryIcon = new Icon("angles-down"),
      companyIcon = new Icon("building"),
      periodIcon = new Icon("calendar-days"),
      locationIcon = new Icon("location-dot");

    experienceTitle.textContent = title;
    experienceCompany.textContent = company;
    experienceDate.textContent = period;
    experienceLocation.textContent = location;
    experienceTask.textContent = desc;

    experienceTitle.appendChild(summaryIcon);
    experienceCompany.appendChild(companyIcon);
    experienceDate.appendChild(periodIcon);
    experienceLocation.appendChild(locationIcon);

    experienceInfo.appendChild(experienceCompany);
    experienceInfo.appendChild(experienceDate);
    experienceInfo.appendChild(experienceLocation);

    experienceDetails.appendChild(experienceTitle);
    experienceDetails.appendChild(experienceInfo);
    experienceDetails.appendChild(experienceTask);

    experiencePanel.appendChild(experienceDetails);

    return experiencePanel;
  }

  #generateDegree({ title, school, period, desc }) {
    const degreePanel = new DOMElement("li", ["degree"]),
      degreeDetails = new DOMElement("details", ["degree__details"]),
      degreeTitle = new DOMElement("summary", ["degree__title"]),
      degreeInfo = new DOMElement("ul", ["degree__info"]),
      degreeSchool = new DOMElement("li", ["degree__school"]),
      degreeDate = new DOMElement("li", ["degree__date"]),
      degreeTask = new DOMElement("p", ["degree__desc"]);

    const summaryIcon = new Icon("angles-down"),
      schoolIcon = new Icon("school"),
      periodIcon = new Icon("calendar-days");

    degreeTitle.textContent = title;
    degreeSchool.textContent = school;
    degreeDate.textContent = period;
    degreeTask.textContent = desc;

    degreeTitle.appendChild(summaryIcon);
    degreeSchool.appendChild(schoolIcon);
    degreeDate.appendChild(periodIcon);

    degreeInfo.appendChild(degreeSchool);
    degreeInfo.appendChild(degreeDate);

    degreeDetails.appendChild(degreeTitle);
    degreeDetails.appendChild(degreeInfo);
    degreeDetails.appendChild(degreeTask);

    degreePanel.appendChild(degreeDetails);

    return degreePanel;
  }

  #generateExperiences(experiences = []) {
    const experiencesPanel = new DOMElement("section", ["experiences"]),
      experiencesTitle = new DOMElement("h2", ["experiences__title"]),
      experiencesList = new DOMElement("ul", ["experiences__list"]);

    const experienceIcon = new Icon("business-time");

    if (experiences.length > 0)
      experiences.forEach((exp) =>
        experiencesList.appendChild(this.#generateExperience(exp))
      );

    experiencesTitle.textContent = "experiência";
    experiencesTitle.appendChild(experienceIcon);

    experiencesPanel.appendChild(experiencesTitle);
    experiencesPanel.appendChild(experiencesList);

    return experiencesPanel;
  }

  #generateDegrees(degrees = []) {
    const degreesPanel = new DOMElement("section", ["degrees"]),
      degreesTitle = new DOMElement("h2", ["degrees__title"]),
      degreesList = new DOMElement("ul", ["degrees__list"]);

    const graduationIcon = new Icon("graduation-cap");

    if (degrees.length > 0)
      degrees.forEach((deg) =>
        degreesList.appendChild(this.#generateDegree(deg))
      );

    degreesTitle.textContent = "formação";
    degreesTitle.appendChild(graduationIcon);

    degreesPanel.appendChild(degreesTitle);
    degreesPanel.appendChild(degreesList);

    return degreesPanel;
  }

  #generateHeader(name, job, desc, address, email, website) {
    const header = new DOMElement("header", ["header"]);
    const headerTitle = new DOMElement("h1", ["header__title", "sr-only"]);
    const aboutPanel = this.#generatePersonalInfo(name, job, desc);
    const contactPanel = this.#generateContactInfo(address, email, website);

    headerTitle.textContent = "currículo";

    header.appendChild(headerTitle);
    header.appendChild(aboutPanel);
    header.appendChild(contactPanel);

    return header;
  }

  #generateMainContent(experiences, degrees) {
    const mainPanel = new DOMElement("main", ["main"]),
      experiencesPanel = this.#generateExperiences(experiences),
      degreesPanel = this.#generateDegrees(degrees);

    mainPanel.appendChild(experiencesPanel);
    mainPanel.appendChild(degreesPanel);

    return mainPanel;
  }

  constructor({
    name,
    job,
    desc,
    address,
    email,
    website,
    experiences,
    degrees,
  }) {
    return this.#generate(
      name,
      job,
      desc,
      address,
      email,
      website,
      experiences,
      degrees
    );
  }
}
