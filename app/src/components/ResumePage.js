import DOMElement from "./DOMElement.js";
import Icon from "./Icon.js";

export default class ResumePage {
  #generate(resume) {
    const resumePanel = document.createDocumentFragment(),
      resumeHeader = this.#generateHeader(resume),
      resumeMainContent = this.#generateMainContent(resume);

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
    const experienceDetails = new DOMElement("details", [
        "experience",
      ]),
      experienceTitle = new DOMElement("summary", ["experience__title"]),
      experienceInfo = new DOMElement("ul", ["experience__info"]),
      experienceCompany = new DOMElement("li", ["experience__company"]),
      experienceDate = new DOMElement("li", ["experience__date"]),
      experienceLocation = new DOMElement("li", ["experience__location"]),
      experienceTask = new DOMElement("p", ["experience__desc"]);

    const summaryIcon = new Icon("angles-right"),
      companyIcon = new Icon("building"),
      periodIcon = new Icon("calendar-days"),
      locationIcon = new Icon("location-dot");

    experienceTitle.appendChild(summaryIcon);
    experienceTitle.appendChild(document.createTextNode(title));

    experienceCompany.textContent = company;
    experienceDate.textContent = period;
    experienceLocation.textContent = location;
    experienceTask.textContent = desc;

    experienceCompany.appendChild(companyIcon);
    experienceDate.appendChild(periodIcon);
    experienceLocation.appendChild(locationIcon);

    experienceInfo.appendChild(experienceCompany);
    experienceInfo.appendChild(experienceDate);
    experienceInfo.appendChild(experienceLocation);

    experienceDetails.appendChild(experienceTitle);
    experienceDetails.appendChild(experienceInfo);
    experienceDetails.appendChild(experienceTask);

    experienceDetails.setAttribute("data-element", "detail");

    return experienceDetails;
  }

  #generateDegree({ title, school, period, desc }) {
    const degreeDetails = new DOMElement("details", ["degree"]),
      degreeTitle = new DOMElement("summary", ["degree__title"]),
      degreeInfo = new DOMElement("ul", ["degree__info"]),
      degreeSchool = new DOMElement("li", ["degree__school"]),
      degreeDate = new DOMElement("li", ["degree__date"]),
      degreeTask = new DOMElement("p", ["degree__desc"]);

    const summaryIcon = new Icon("angles-right"),
      schoolIcon = new Icon("school"),
      periodIcon = new Icon("calendar-days");

    degreeTitle.appendChild(summaryIcon);
    degreeTitle.appendChild(document.createTextNode(title));

    degreeSchool.textContent = school;
    degreeDate.textContent = period;
    degreeTask.textContent = desc;

    degreeSchool.appendChild(schoolIcon);
    degreeDate.appendChild(periodIcon);

    degreeInfo.appendChild(degreeSchool);
    degreeInfo.appendChild(degreeDate);

    degreeDetails.appendChild(degreeTitle);
    degreeDetails.appendChild(degreeInfo);
    degreeDetails.appendChild(degreeTask);

    degreeDetails.setAttribute("data-element", "detail");

    return degreeDetails;
  }

  #generateSkill({ title, desc }) {
    const skillDetails = new DOMElement("details", ["skill"]),
      skillTitle = new DOMElement("summary", ["skill__title"]),
      skillTask = new DOMElement("p", ["skill__desc"]);

    const summaryIcon = new Icon("angles-right");

    skillTitle.appendChild(summaryIcon);
    skillTitle.appendChild(document.createTextNode(title));

    skillTask.textContent = desc;

    skillDetails.appendChild(skillTitle);
    skillDetails.appendChild(skillTask);

    skillDetails.setAttribute("data-element", "detail");

    return skillDetails;
  }

  #generateExperiences(experiences = []) {
    const experiencesPanel = new DOMElement("section", ["experiences"]),
      experiencesTitle = new DOMElement("h2", ["experiences__title"]),
      experiencesList = new DOMElement("div", ["experiences__list"]);

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
      degreesList = new DOMElement("div", ["degrees__list"]);

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

  #generateSkills(skills = []) {
    const skillsPanel = new DOMElement("section", ["skills"]),
      skillsTitle = new DOMElement("h2", ["skills__title"]),
      skillsList = new DOMElement("div", ["skills__list"]);

    const tagsIcon = new Icon("tags");

    if (skills.length > 0)
      skills.forEach((skill) =>
        skillsList.appendChild(this.#generateSkill(skill))
      );

    skillsTitle.textContent = "competências";
    skillsTitle.appendChild(tagsIcon);

    skillsPanel.appendChild(skillsTitle);
    skillsPanel.appendChild(skillsList);

    return skillsPanel;
  }

  #generateHeader({ name, job, desc, address, email, website }) {
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

  #generateMainContent({ experiences, degrees, skills }) {
    const mainPanel = new DOMElement("main", ["main"]),
      experiencesPanel = this.#generateExperiences(experiences),
      degreesPanel = this.#generateDegrees(degrees),
      skillsPanel = this.#generateSkills(skills);

    mainPanel.appendChild(experiencesPanel);
    mainPanel.appendChild(degreesPanel);
    mainPanel.appendChild(skillsPanel);

    return mainPanel;
  }

  constructor(resume) {
    return this.#generate(resume);
  }
}
