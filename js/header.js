let = submenuIsOpen = false;
/**
 * This function opens and closes the submenu and the closeSubmenu() function must be added to the body
 * @function
 * @name showSubmenu
 *
 * @type {boolean}
 * @description submenuIsOpen specifies whether the submenu is open or closed. With the value false, we define the submenu as closed
 */
function showSubmenu() {
    if (!submenuIsOpen) {
      document.getElementById("submenu").classList.add("show-submenu");
      document.getElementById("arrowBackLegalHelpPrivacy").classList.add("d-none");
      submenuIsOpen = true;
    } else {
      closeSubmenu();
    }
  }
  
  function closeSubmenu() {
    if (submenuIsOpen === true) {
      document.getElementById("submenu").classList.remove("show-submenu");
      document.getElementById("arrowBackLegalHelpPrivacy").classList.remove("d-none");
      submenuIsOpen = false;
    }
  }

  function setInitialsInTheHeader() {
    document.getElementById("initialsUserHeader").innerHTML = initials;
  }

  function loadHelp() {
    document.getElementById('contentJoin').innerHTML = generateHelpContent();
    document.getElementById('helpIcon').classList.add('d-none');
  }
