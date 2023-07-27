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
  const warnMessage = getElement("warn-message"),
    { classList } = warnMessage;

  const statusClasses = ["fail", "success", "warning"],
    statusIcons = {
      success: "circle-check",
      fail: "circle-xmark",
      warning: "circle-exclamation",
    },
    warnStatus = statusIcons[status];

  const resetStatus = () => {
      hideElement("warn-message");
      clearContent("warn-message");

      statusClasses.forEach(removeStatus);
    },
    setStatus = () => {
      warnMessage.appendChild(document.createTextNode(message));
      warnMessage.appendChild(new components.Icon(warnStatus));
      classList.add(status);

      showElement("warn-message");
    },
    removeStatus = (selector) => {
      if (classList.contains(selector)) classList.remove(selector);
    };

  resetStatus();

  setStatus();

  setTimeout(resetStatus, 3000);
  clearTimeout(resetStatus);
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
