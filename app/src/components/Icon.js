import DOMElement from "./DOMElement.js";

export default class Icon {
  #generate(name = null) {
    if (!name) throw new Error("Icon name not specified");

    const icon = new DOMElement("i", ["fa-solid", `fa-${name}`]);

    icon.setAttribute("aria-hidden", true);

    return icon;
  }

  constructor(name) {
    return this.#generate(name);
  }
}
