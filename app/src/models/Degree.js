export default class Degree {
  static latestId = 0;

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

  #setId() {
    this.#id = Degree.latestId;
    Degree.latestId++;
  }

  constructor({ title, school, period, desc }) {
    this.#title = title;
    this.#school = school;
    this.#period = period;
    this.#desc = desc;
    this.#setId();
  }
}
