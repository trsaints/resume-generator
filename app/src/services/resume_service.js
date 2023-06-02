export function saveFormState({ form }) {
  const data = extractFormData(form);

  console.table(data);

  localStorage.setItem("resume", JSON.stringify(data));
}

function extractFormData(form) {
  const formData = new FormData(form);

  const resume = JSON.parse(localStorage.getItem("resume")) || {};

  for (const [key, value] of formData) {
    resume[key] = value;
  }

  return resume;
}

function getExperience({ callbacks }) {
  const form = callbacks.getElement("form");

  const { jobCompany, jobTitle, jobPeriod, jobLocation, jobDesc } = form.elements;

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

export function syncFormState({ callbacks }) {
  const form = callbacks.getElement("form");
  const { name, job, desc, email, website } = form;

  saveFormState({ form });

  name.addEventListener("focusout", () => saveFormState({ form }));
  job.addEventListener("focusout", () => saveFormState({ form }));
  desc.addEventListener("focusout", () => saveFormState({ form }));
  email.addEventListener("focusout", () => saveFormState({ form }));
  website.addEventListener("focusout", () => saveFormState({ form }));
}

export function addItem(callbacks, components, type) {
  const resume = JSON.parse(localStorage.getItem("resume"));

  if (resume.experiences === undefined) resume.experiences = [];
  else if (resume.degrees === undefined) resume.degrees = [];

  const itemToAdd = getItem(callbacks, components, type);

  if (type === "degree") resume.degrees.push(itemToAdd);
  else if (type === "experience") resume.experiences.push(itemToAdd);

  console.warn(`A new ${type} has been set`);
  console.table(itemToAdd);

  localStorage.setItem("resume", JSON.stringify(resume));

  return itemToAdd;
}

function getItem(callbacks, components, category) {
  const target = {
    degree: () => new components.Degree(getDegree({ callbacks })),
    experience: () => new components.Experience(getExperience({ callbacks })),
  };

  const item = target[category]();

  const result = extractComponent(category, item);

  return result;
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
  };

  return component[type](item);
}

export function removeItem(type, id) {
  const resume = JSON.parse(localStorage.getItem("resume"));

  const typePlural = `${type}s`;

  const target = resume[typePlural].filter((item) => item.id === id);
  const targetIndex = resume[typePlural].indexOf(target);
  resume[typePlural].splice(targetIndex);

  console.warn(`Deleted ${type} of ID ${id}`);

  localStorage.setItem("resume", JSON.stringify(resume));
}
