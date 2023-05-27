export default class Resume {
  #name = "";
  #job = "";
  #description = "";
  #experiences = [];
  #degrees = [];
  #contact = {
    address: "",
    email: "",
    website: "",
  };

  #setExperiences(experiences = []) {
    if (experiences.length < 1) return;
    experiences.forEach((exp) => this.#experiences.push(new Experience(exp)));
  }

  #setDegrees(degrees = []) {
    if (degrees.length < 1) return;
    degrees.forEach((deg) => this.#degrees.push(new Degree(deg)));
  }

  #setContact({ address, email, website = "" }) {
    this.#contact.address = address;
    this.#contact.email = email;

    if (website) this.#contact.website = website;
  }

  constrcutor(data) {
    const { name, desc, experiences, degrees, address, email, website } = data;

    this.#name = name;
    this.#description = desc;

    if (job) this.#job = job;

    this.#setContact({ address, email, website });
    this.#setExperiences(experiences);
    this.#setDegrees(degrees);
  }
}
