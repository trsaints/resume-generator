function getBaseData(form) {
  const baseData = new FormData(form);

  const resume = JSON.parse(localStorage.getItem("resume")) || {};

  for (const [key, value] of baseData) resume[key] = value;

  return resume;
}

function addItem(callbacks, components, type) {
  const resume = JSON.parse(localStorage.getItem("resume"));

  const types = `${type}s`;

  if (resume[types] === undefined) resume[types] = [];

  const itemToAdd = createItem(callbacks, components, type);

  resume[types].push(itemToAdd);

  localStorage.setItem("resume", JSON.stringify(resume));

  console.warn(`A new ${type} has been set`);

  return itemToAdd;
}

function removeItem(type, id) {
  const resume = JSON.parse(localStorage.getItem("resume"));

  const types = `${type}s`;

  const itemToRemove = resume[types].filter((item) => item.id === id);
  const itemIndex = resume[types].indexOf(itemToRemove);
  resume[types].splice(itemIndex);

  console.warn(`Deleted ${type} of ID ${id}`);

  localStorage.setItem("resume", JSON.stringify(resume));
}

function createItem(callbacks, models, category) {
  const items = {
    degree: () => new models.Degree(getDegree(callbacks)),
    experience: () => new models.Experience(getExperience(callbacks)),
    skill: () => new models.Skill(getSkill(callbacks)),
  };

  const item = items[category]();
  const result = createGenericItem(category, item);

  return result;
}

function getExperience(callbacks) {
  const form = callbacks.getElement("form");

  const { jobCompany, jobTitle, jobPeriod, jobLocation, jobDesc } =
    form.elements;

  const exp = {
    title: jobTitle.value,
    company: jobCompany.value,
    period: jobPeriod.value,
    location: jobLocation.value,
    desc: jobDesc.value,
  };

  return exp;
}

function getDegree(callbacks) {
  const form = callbacks.getElement("form");

  const { degreeSchool, degreeName, degreePeriod, degreeDesc } = form.elements;

  const deg = {
    title: degreeName.value,
    school: degreeSchool.value,
    period: degreePeriod.value,
    desc: degreeDesc.value,
  };

  return deg;
}

function getSkill(callbacks) {
  const form = callbacks.getElement("form");

  const { skillName, skillDesc } = form.elements;

  const skill = {
    title: skillName.value,
    desc: skillDesc.value,
  };

  return skill;
}

function createGenericItem(type, item) {
  const component = {
    degree: ({ title, school, period, desc, id }) => {
      const obj = {
        title: title,
        school: school,
        period: period,
        desc: desc,
        id: id,
      };

      return obj;
    },

    experience: ({ title, company, period, location, desc, id }) => {
      const obj = {
        title: title,
        company: company,
        period: period,
        location: location,
        desc: desc,
        id: id,
      };

      return obj;
    },

    skill: ({ title, desc, id }) => {
      const obj = {
        title: title,
        desc: desc,
        id: id,
      };

      return obj;
    },
  };

  return component[type](item);
}

export { addItem, removeItem, getBaseData };
