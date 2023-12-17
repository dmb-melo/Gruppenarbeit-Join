/**
 * This function opens and closes the submenu and the closeSubmenu() function must be added to the body
 * @function
 * @name showSubmenu
 *
 * @type {boolean}
 * @description submenuIsOpen specifies whether the submenu is open or closed. With the value false, we define the submenu as closed
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

/**
 *This function prevents the submenu from being closed if the submenu is clicked on
 *
 * @function
 * @name doNotClose
 */
function doNotClose(event) {
  event.stopPropagation();
}

/**
 *Animation of the join logo when the start page is loaded
 *
 * @function
 * @name startAnimation
 */
function initLoading() {
  startAnimation();
}
function startAnimation() {
  document.querySelector(".animationJoinLogo").classList.add("animated");
  document.querySelector(".animationJoinLogo").classList.remove("dNone");
  document.querySelector(".join-logo").classList.add("animated");
}

/**
 * Updates the image next to the password input field based on the field's content.
 *
 * When the password input field is empty, the image is set to a lock symbol.
 * If the field is not empty, the image is changed to a visibility symbol (eye icon).
 * Additionally, logs the current value of the password field to the console.
 *
 * The value of the password input field is stored in the variable `inputValuePassword `.
 *
 * @type {boolean}
 * @description The global variable `passwordIsVisible` defines whether the password is visible or not
 *
 * @function
 * @name passwordInputLogIn
 */
let passwordIsVisible = false;
function passwordInputLogIn() {
  let inputValuePassword = document.getElementById("passwordInput").value;
  if (inputValuePassword) {
    if (!passwordIsVisible) {
      document.getElementById("passwordImg").src = "./assets/img/visibility_off.svg";
    } else {
      document.getElementById("passwordImg").src = "./assets/img/visibility.svg";
    }
  } else {
    document.getElementById("passwordImg").src = "./assets/img/lock.svg";
  }
}

/**
 *Makes the entered value in the password input field visible and changes the SVG, furthermore the type of the input field is changed
 * @function
 * @name passwordVisible
 *
 * The value of the password input field is stored in the variable `inputValuePassword `.
 *
 * @type {boolean}
 * @description The global variable `passwordIsVisible` defines whether the password is visible or not
 */
function passwordVisible() {
  let x = document.getElementById("passwordInput");
  let inputValuePassword = document.getElementById("passwordInput").value;
  if (inputValuePassword) {
    if (x.type === "password") {
      x.type = "text";
      document.getElementById("passwordImg").src = "./assets/img/visibility.svg";
      passwordIsVisible = true;
    } else {
      x.type = "password";
      document.getElementById("passwordImg").src = "./assets/img/visibility_off.svg";
      passwordIsVisible = false;
    }
  }
}
