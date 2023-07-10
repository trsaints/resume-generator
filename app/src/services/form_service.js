function getBaseData(form) {
  const baseData = new FormData(form);

  const resume = JSON.parse(localStorage.getItem("resume")) || {};

  for (const [key, value] of baseData) resume[key] = value;

  return resume;
}

function getValidityState(target) {
  const minLength = target.getAttribute("minlength") | 0,
    maxLength = target.getAttribute("maxlength") | 0,
    inputType = target.getAttribute("type");

  const validationTypes = [
    "patternMismatch",
    "tooLong",
    "tooShort",
    "typeMismatch",
    "valueMissing",
  ];

  const typePatternMessage = {
    email: "Um endereço de email: seu_endereco@dominio.subdominio",
    url: "Uma URL válida, por exemplo: https://example.com/",
    text: `Conter entre ${minLength} e ${maxLength} caracteres, não conter caracteres especiais (como !, @, #, etc.)`,
  };

  const validationMessages = {
    patternMismatch: `Este campo deve conter o seguinte padrão: ${typePatternMessage[inputType]}`,
    tooLong: `Este campo deve conter, no máximo, ${maxLength} caracteres.`,
    tooShort: `Este campo precisa de, no mínimo, ${minLength} caracteres.`,
    typeMismatch: `Este campo deve conter o seguinte padrão: ${typePatternMessage[inputType]}`,
    valueMissing: "É obrigatório preencher este campo.",
  };

  for (let i in validationTypes) {
    let type = validationTypes[i];

    let isInvalid = target.validity[type];

    if (isInvalid)
      return {
        valid: false,
        validityMessage: validationMessages[type],
        validationType: validationTypes[i],
      };
  }

  return { valid: true, validityMessage: "" };
}

function addItem(callbacks, type) {
  const resume = JSON.parse(localStorage.getItem("resume"));

  const types = `${type}s`;

  if (resume[types] === undefined) resume[types] = [];

  const itemToAdd = createItem(callbacks, type);
  resume[types].push(itemToAdd);

  localStorage.setItem("resume", JSON.stringify(resume));
  console.warn(`A new ${type} has been set`);

  return itemToAdd;
}

function createItem(callbacks, type) {
  const items = {
    degree: (id) => getItem(callbacks, "degree", id),
    experience: (id) => getItem(callbacks, "experience", id),
    skill: (id) => getItem(callbacks, "skill", id),
  };

  const types = `${type}s`;

  const latestIds = JSON.parse(localStorage.getItem("latest-ids")),
    id = latestIds[types],
    itemToCreate = items[type](id);

  updateLatestId(type);

  return itemToCreate;
}

function updateLatestId(type) {
  const latestIds = JSON.parse(localStorage.getItem("latest-ids")),
    types = `${type}s`;

  latestIds[types]++;

  localStorage.setItem("latest-ids", JSON.stringify(latestIds));
}

function getItem(callbacks, type, id) {
  const form = callbacks.getElement("form"),
    { elements } = form;

  const items = {
    experience: () => getExperience(elements, id),
    degree: () => getDegree(elements, id),
    skill: () => getSkill(elements, id),
  };

  return items[type](id);
}

function getExperience(elements, id) {
  const { jobCompany, jobTitle, jobPeriod, jobLocation, jobDesc } = elements;

  const exp = {
    title: jobTitle.value,
    company: jobCompany.value,
    period: jobPeriod.value,
    location: jobLocation.value,
    desc: jobDesc.value,
    id: id,
  };

  return exp;
}

function getDegree(elements, id) {
  const { degreeSchool, degreeName, degreePeriod, degreeDesc } = elements;

  const deg = {
    title: degreeName.value,
    school: degreeSchool.value,
    period: degreePeriod.value,
    desc: degreeDesc.value,
    id: id,
  };

  return deg;
}

function getSkill(elements, id) {
  const { skillName, skillDesc } = elements;

  const skill = {
    title: skillName.value,
    desc: skillDesc.value,
    id: id,
  };

  return skill;
}

function removeItem(type, id) {
  const resume = JSON.parse(localStorage.getItem("resume"));

  const types = `${type}s`;

  const itemToRemove = resume[types].filter((item) => item.id === id);
  const itemIndex = resume[types].indexOf(itemToRemove);
  resume[types].splice(itemIndex);

  localStorage.setItem("resume", JSON.stringify(resume));
  console.warn(`Deleted ${type} of ID ${id}`);
}

function clearActiveResume(form) {
  localStorage.removeItem("resume");

  const baseData = getBaseData(form);

  localStorage.setItem("resume", JSON.stringify(baseData));
  console.warn("Initial state has been set: active resume has been cleared");
}

function resetIds() {
  localStorage.removeItem("latest-ids");

  const latestIds = {
    degrees: 0,
    experiences: 0,
    skills: 0,
  };

  localStorage.setItem("latest-ids", JSON.stringify(latestIds));
}

export {
  addItem,
  clearActiveResume,
  getBaseData,
  getValidityState,
  removeItem,
  resetIds,
};
