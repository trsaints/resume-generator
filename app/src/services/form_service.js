function getBaseData(form) {
  const baseData = new FormData(form),
    resume = JSON.parse(localStorage.getItem("resume")) || {};

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
    ],
    typePatternMessage = {
      email: "Um endereço de email: seu_endereco@dominio.subdominio",
      url: "Uma URL válida, por exemplo: https://example.com/",
      text: `Conter entre ${minLength} e ${maxLength} caracteres, não conter caracteres especiais (como !, @, #, etc.)`,
    },
    validationMessages = {
      patternMismatch: `Este campo deve conter o seguinte padrão: ${typePatternMessage[inputType]}`,
      tooLong: `Este campo deve conter, no máximo, ${maxLength} caracteres.`,
      tooShort: `Este campo precisa de, no mínimo, ${minLength} caracteres.`,
      typeMismatch: `Este campo deve conter o seguinte padrão: ${typePatternMessage[inputType]}`,
      valueMissing: "É obrigatório preencher este campo.",
    };

  for (let i in validationTypes) {
    const type = validationTypes[i],
      isInvalid = target.validity[type];

    if (isInvalid)
      return {
        valid: false,
        validityMessage: validationMessages[type],
        validationType: validationTypes[i],
        validationTarget: target,
      };
  }

  return { valid: true, validityMessage: "", validationTarget: target };
}

function addItem(callbacks, type) {
  const resume = JSON.parse(localStorage.getItem("resume")),
    types = `${type}s`;

  if (resume[types] === undefined) resume[types] = [];

  const itemToAdd = createItem(callbacks, type);

  resume[types].push(itemToAdd);

  localStorage.setItem("resume", JSON.stringify(resume));
  console.warn(`A new ${type} has been set`);

  return itemToAdd;
}

function createItem(callbacks, type) {
  const form = callbacks.getElement("form"),
    { elements } = form;

  const items = {
    experience: (id) => getExperience(elements, id),
    degree: (id) => getDegree(elements, id),
    skill: (id) => getSkill(elements, id),
  };

  const types = `${type}s`,
    latestIds = JSON.parse(localStorage.getItem("latest-ids")),
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

function getExperience(elements, id) {
  const { jobCompany, jobTitle, jobPeriod, jobLocation, jobDesc } = elements,
    exp = {
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
  const { degreeSchool, degreeName, degreePeriod, degreeDesc } = elements,
    deg = {
      title: degreeName.value,
      school: degreeSchool.value,
      period: degreePeriod.value,
      desc: degreeDesc.value,
      id: id,
    };

  return deg;
}

function getSkill(elements, id) {
  const { skillName, skillDesc } = elements,
    skill = {
      title: skillName.value,
      desc: skillDesc.value,
      id: id,
    };

  return skill;
}

function removeItem(type, id) {
  const resume = JSON.parse(localStorage.getItem("resume"));

  const types = `${type}s`,
    itemToRemove = resume[types].filter((item) => item.id === id),
    itemIndex = resume[types].indexOf(itemToRemove);

  resume[types].splice(itemIndex);

  localStorage.setItem("resume", JSON.stringify(resume));
  console.warn(`Deleted ${type} of ID ${id}`);
}

function clearActiveResume(form) {
  localStorage.removeItem("resume");

  const baseData = getBaseData(form);

  localStorage.setItem("resume", JSON.stringify(baseData));
  console.warn("Initial state has been set: form has been cleared");
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
