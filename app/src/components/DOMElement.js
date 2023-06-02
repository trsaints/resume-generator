export default class DOMElement {
  #generate(element, selectors = []) {
    const domElement = document.createElement(element);

    if (selectors.length > 0)
      selectors.forEach((selector) => domElement.classList.add(selector));

    return domElement;
  }

  constructor(element, selectors) {
    return this.#generate(element, selectors);
  }
}
