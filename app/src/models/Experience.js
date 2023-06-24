export default class Experience {
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

  constructor({ title, company, period, location, desc, id }) {
    this.#title = title;
    this.#company = company;
    this.#period = period;
    this.#location = location;
    this.#desc = desc;
    this.#id = id;
  }
}
