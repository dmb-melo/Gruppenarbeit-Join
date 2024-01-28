function showSubmenu() {
  if (!submenuIsOpen) {
    document.getElementById("submenu").style = "display: block";
    document.getElementById("submenu").classList.add("show-submenu");
    submenuIsOpen = true;
  } else {
    closeSubmenu();
  }
}

function closeSubmenu() {
  if (submenuIsOpen === true) {
    document.getElementById("submenu").classList.remove("show-submenu");
    document.getElementById("submenu").style = "display: none";
    submenuIsOpen = false;
  }
}

function setInitialsInTheHeader() {
  document.getElementById("initialsUserHeader").innerHTML = initials;
}

function loadHelp() {
  document.getElementById("contentJoin").innerHTML = generateHelpContent();
  document.getElementById("helpIcon").classList.add("d-none");
}
