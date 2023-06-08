function syncFormState({ callbacks }) {
  const form = callbacks.getElement("form");
  const { name, job, desc, email, website } = form;

  saveBaseFormState({ form });

  name.addEventListener("focusout", () => saveBaseFormState({ form }));
  job.addEventListener("focusout", () => saveBaseFormState({ form }));
  desc.addEventListener("focusout", () => saveBaseFormState({ form }));
  email.addEventListener("focusout", () => saveBaseFormState({ form }));
  website.addEventListener("focusout", () => saveBaseFormState({ form }));
}

function saveBaseFormState({ form }) {
  const data = extractBaseFormData(form);

  console.table(data);

  localStorage.setItem("resume", JSON.stringify(data));
}

function extractBaseFormData(form) {
  const formData = new FormData(form);

  const resume = JSON.parse(localStorage.getItem("resume")) || {};

  for (const [key, value] of formData) {
    resume[key] = value;
  }

  return resume;
}

function addItem(callbacks, components, type) {
  const resume = JSON.parse(localStorage.getItem("resume"));

  if (resume[`${type}s`] === undefined) resume[`${type}s`] = [];

  const itemToAdd = getItem(callbacks, components, type);

  resume[`${type}s`].push(itemToAdd);

  console.warn(`A new ${type} has been set`);
  console.table(itemToAdd);

  localStorage.setItem("resume", JSON.stringify(resume));

  return itemToAdd;
}

function getItem(callbacks, components, category) {
  const target = {
    degree: () => new components.Degree(getDegree({ callbacks })),
    experience: () => new components.Experience(getExperience({ callbacks })),
    skill: () => new components.Skill(getSkill({ callbacks })),
  };

  const item = target[category]();

  const result = extractComponent(category, item);

  return result;
}

function getExperience({ callbacks }) {
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

function getDegree({ callbacks }) {
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

function getSkill({ callbacks }) {
  const form = callbacks.getElement("form");

  const { skillName, skillDesc } = form.elements;

  const skill = {
    title: skillName.value,
    desc: skillDesc.value,
  };

  return skill;
}

function extractComponent(type, item) {
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

function removeItem(type, id) {
  const resume = JSON.parse(localStorage.getItem("resume"));

  const typePlural = `${type}s`;

  const target = resume[typePlural].filter((item) => item.id === id);
  const targetIndex = resume[typePlural].indexOf(target);
  resume[typePlural].splice(targetIndex);

  console.warn(`Deleted ${type} of ID ${id}`);

  localStorage.setItem("resume", JSON.stringify(resume));
}

export { syncFormState, saveBaseFormState, addItem, removeItem };
