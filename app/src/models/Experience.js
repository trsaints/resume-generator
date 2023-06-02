export default class Experience {
  static latestId = 0;

  #title = "";
  #company = "";
  #period = "";
  #location = "";
  #desc = "";
  #id = 0;

  get title() {
    return this.#title;
  }

  get company() {
    return this.#company;
  }

  get period() {
    return this.#period;
  }

  get location() {
    return this.#location;
  }

  get desc() {
    return this.#desc;
  }

  get id() {
    return this.#id;
  }

  #setId() {
    this.#id = Experience.latestId;
    Experience.latestId++;
  }

  constructor({ title, company, period, location, desc }) {
    this.#title = title;
    this.#company = company;
    this.#period = period;
    this.#location = location;
    this.#desc = desc;
    this.#setId();
  }
}
