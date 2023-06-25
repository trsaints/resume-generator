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

function showWarning(components, message, status) {
  const warnMessage = getElement("warn-message");
  clearContent("warn-message");

  const statusIcons = {
    success: "circle-check",
    fail: "circle-xmark",
    warning: "circle-exclamation",
  };

  const warnStatus = statusIcons[status];

  const reset = () => {
    hideElement("warn-message");
    clearContent("warn-message");
    
    warnMessage.classList.remove(status);
  };

  clearTimeout(reset);

  warnMessage.appendChild(new components.Icon(warnStatus));
  warnMessage.appendChild(document.createTextNode(message));
  warnMessage.classList.add(status);

  showElement("warn-message");

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
  showWarning,
  openMenu,
  closeMenu,
};
