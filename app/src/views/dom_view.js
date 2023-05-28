export function getElement(element) {
  return document.querySelector(`[data-element="${element}"]`);
}
export function getElements(element) {
  return document.querySelectorAll(`[data-element="${element}"]`);
}

export function showElement(element) {
  const target = getElement(element);

  if (target.classList.contains("hidden")) {
    target.classList.remove("hidden");

    target.removeAttribute("aria-hidden");
  }
}

export function hideElement(element) {
  const target = getElement(element);

  if (!target.classList.contains("hidden")) {
    target.classList.add("hidden");

    target.setAttribute("aria-hidden", true);
  }
}

export function clearContent(element) {
  const target = getElement(element);

  while (target.firstChild) target.removeChild(target.firstChild);
}

export function showPopup(message) {
  const warnMessage = getElement("warn-message");

  const reset = () => hideElement("popup");
  clearTimeout(reset);

  warnMessage.textContent = message;

  showElement("popup");

  setTimeout(reset, 3000);
}

export function openMenu(modal) {
  const target = getElement(modal);
  showElement(modal);
  target.showModal();
}

export function closeMenu(modal) {
  const target = getElement(modal);
  hideElement(modal);
  target.close();
}
