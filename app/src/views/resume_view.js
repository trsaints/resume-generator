export function renderExperience({ callbacks, components, exp }) {
  const panel = callbacks.getElement("experiences-list");
  const experienceCard = new components.ExperienceCard(exp);

  panel.appendChild(experienceCard);
}

export function renderDegree({ callbacks, components, deg }) {
  const panel = callbacks.getElement("degrees-list");
  const degreeCard = new components.DegreeCard(deg);

  panel.appendChild(degreeCard);
}
