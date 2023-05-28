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

export function addExperience({ callbacks }) {
  const resume = JSON.parse(localStorage.getItem("resume"));
  const { experiences } = resume;

  if (experiences === undefined) resume.experiences = [];

  resume.experiences.push(getExperience({ callbacks }));

  localStorage.setItem("resume", JSON.stringify(resume));

  console.warn("New experience has been added");
}

function getExperience({ callbacks }) {
  const form = callbacks.getElement("form");

  const { jobCompany, jobTitle, jobPeriod, jobDesc } = form.elements;

  const experience = {
    company: jobCompany.value,
    title: jobTitle.value,
    period: jobPeriod.value,
    desc: jobDesc.value
  }

  console.table(experience);

  return experience;
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
