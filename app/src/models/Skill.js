export default class Skill {
  static latestId = 0;

  #title = "";
  #desc = "";
  #id = "";

  #setId() {
    this.#id = Skill.latestId;
    Skill.latestId++;
  }

  get title() {
    return this.#title;
  }

  get desc() {
    return this.#desc;
  }

  get id() {
    return this.#id;
  }

  constructor({ title, desc }) {
    this.#title = title;
    this.#desc = desc;
    this.#setId();
  }
}
