export default class Experience {
  static latestId = 0;

  #title = "";
  #company = "";
  #period = "";
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

  constructor({ title, company, period, desc }) {
    this.#title = title;
    this.#company = company;
    this.#period = period;
    this.#desc = desc;
    this.#setId();
  }
}
