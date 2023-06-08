function getElement(element) {
  return document.querySelector(`[data-element="${element}"]`);
}

function getElements(element) {
  return document.querySelectorAll(`[data-element="${element}"]`);
}

function showElement(element) {
  const target = getElement(element);

  if (target.classList.contains("hidden")) {
    target.classList.remove("hidden");

    target.removeAttribute("aria-hidden");
  }
}

function hideElement(element) {
  const target = getElement(element);

  if (target.classList.contains("hidden")) return;

  target.classList.add("hidden");

  target.setAttribute("aria-hidden", true);
}

function clearContent(element) {
  const target = getElement(element);

  while (target.firstChild) target.removeChild(target.firstChild);
}

function showPopup(message) {
  const warnMessage = getElement("warn-message");

  const reset = () => hideElement("popup");
  clearTimeout(reset);

  warnMessage.textContent = message;

  showElement("popup");

  setTimeout(reset, 3000);
}

function openMenu(modal) {
  const target = getElement(modal);
  showElement(modal);
  target.showModal();
}

function closeMenu(modal) {
  const target = getElement(modal);
  hideElement(modal);
  target.close();
}

export {
  getElement,
  getElements,
  showElement,
  hideElement,
  clearContent,
  showPopup,
  openMenu,
  closeMenu,
};
