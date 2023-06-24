export default class Skill {
  #title = "";
  #desc = "";
  #id = 0;

  get title() {
    return this.#title;
  }

  get desc() {
    return this.#desc;
  }

  get id() {
    return this.#id;
  }

  constructor({ title, desc, id }) {
    this.#title = title;
    this.#desc = desc;
    this.#id = id;
  }
}
