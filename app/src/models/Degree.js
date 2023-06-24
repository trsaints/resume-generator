export default class Degree {
  #title = "";
  #school = "";
  #period = "";
  #desc = "";
  #id = 0;

  get title() {
    return this.#title;
  }

  get school() {
    return this.#school;
  }

  get period() {
    return this.#period;
  }

  get desc() {
    return this.#desc;
  }
  
  get id() {
    return this.#id;
  }

  constructor({ title, school, period, desc, id }) {
    this.#title = title;
    this.#school = school;
    this.#period = period;
    this.#desc = desc;
    this.#id = id;
  }
}
