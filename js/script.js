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
  }
}

function doNotClose(event) {
  event.stopPropagation();
}

function initLoading() {
  startAnimation();
}
function startAnimation() {
  // Animation immer starten
  document.querySelector('.animationJoinLogo').classList.add('animated');
  document.querySelector('.animationJoinLogo').classList.remove('dNone');
  document.querySelector('.join-logo').classList.add('animated');
}
