function init() {
    includeHTML()
}

/**
 * This function opens and closes the submenu and the closeSubmenu() function must be added to the body
 *
 */

let submenuIsOpen = false;

function showSubmenu() {
  if (!submenuIsOpen) {
    document.getElementById("submenu").classList.add("show-submenu");
    submenuIsOpen = true;
  } else {
    closeSubmenu();
  }
}

function closeSubmenu() {
  if (submenuIsOpen === true) {
    document.getElementById("submenu").classList.remove("show-submenu");
    submenuIsOpen = false;
  }
}

function doNotClose(event) {
  event.stopPropagation();
}
