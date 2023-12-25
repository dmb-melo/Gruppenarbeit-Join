let submenuIsOpen = false;
let passwordIsVisible = false;
let confirmPasswordIsVisible = false;
let rememberMeIsSet = false;

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
  loadUsers();
  startAnimation();
  renderLogInContent();
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
 * @name passwordInputVisible
 */
function passwordInputVisible() {
  let inputValuePassword = document.getElementById("passwordInput").value;
  if (inputValuePassword) {
    validatePassword();
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
 * Updates the image next to the confirmation password input field based on the field's content.
 *
 * When the confirmation password input field is empty, the image is set to a lock symbol.
 * If the field is not empty, the image is changed to a visibility symbol (eye icon).
 * Additionally, logs the current value of the password field to the console.
 *
 * The value of the confirmation password input field is stored in the variable `confirmPasswordInput`.
 *
 * @type {boolean}
 * @description The global variable `confirmPasswordIsVisible` defines whether the password is visible or not
 *
 * @function
 * @name confirmPasswordInputVisible
 */
function confirmPasswordInputVisible() {
  let inputValuePassword = document.getElementById("confirmPasswordInput").value;
  if (inputValuePassword) {
    validatePassword();
    if (!confirmPasswordIsVisible) {
      document.getElementById("confirmPasswordImg").src = "./assets/img/visibility_off.svg";
    } else {
      document.getElementById("confirmPasswordImg").src = "./assets/img/visibility.svg";
    }
  } else {
    document.getElementById("confirmPasswordImg").src = "./assets/img/lock.svg";
    document.getElementById("inputFieldConfirmPassword").style = "";
    document.getElementById("textThePasswordNotMatch").innerHTML = "";
  }
}

/**
 *If the passwords entered do not match, the confirmation password field is surrounded by a red border and a warning text is displayed.
 * @function
 * @name validatePassword
 *
 */
function validatePassword() {
  let inputValuePassword = document.getElementById("passwordInput").value;
  let confirmInputValuePassword = document.getElementById("confirmPasswordInput").value;
  if (inputValuePassword != confirmInputValuePassword) {
    document.getElementById("inputFieldConfirmPassword").style = `border: 1px solid rgb(255,128,143) !important;`;
    document.getElementById("textThePasswordNotMatch").innerHTML = `Ups! your password don't match`;
    signUpButton.disabled = true;
  } else {
    document.getElementById("inputFieldConfirmPassword").style = "";
    document.getElementById("textThePasswordNotMatch").innerHTML = "";
    signUpButton.disabled = false;
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

/**
 *Makes the entered value in the password input field visible and changes the SVG, furthermore the type of the input field is changed
 * @function
 * @name confirmPasswordVisible
 *
 * The value of the confirmation password input field is stored in the variable `inputValuePassword `.
 *
 * @type {boolean}
 * @description The global variable `passwordIsVisible` defines whether the password is visible or not
 */
function confirmPasswordVisible() {
  let x = document.getElementById("confirmPasswordInput");
  let inputValuePassword = document.getElementById("confirmPasswordInput").value;
  if (inputValuePassword) {
    if (x.type === "password") {
      x.type = "text";
      document.getElementById("confirmPasswordImg").src = "./assets/img/visibility.svg";
      confirmPasswordIsVisible = true;
    } else {
      x.type = "password";
      document.getElementById("confirmPasswordImg").src = "./assets/img/visibility_off.svg";
      confirmPasswordIsVisible = false;
    }
  }
}

/**
 * The function changes the SVG based on the state of the field
 * @function
 * @name setRememberMe
 *
 * @type {boolean}
 * @description The global variable rememberMeIsSet defines whether the checkmark is set or not
 */

function setRememberMe() {
  if (!rememberMeIsSet) {
    rememberMeIsSet = true;
  } else {
    rememberMeIsSet = false;
  }
}

/**
 * Renders the login page
 * @function
 * @name renderLogInContent
 * */
function renderLogInContent() {
  document.getElementById("contentUserValidation").innerHTML = generateLogInContent();
  document.getElementById("signUpButtonHeadline").classList.remove("d-none");
}

/**
 * Renders the Sign Up page
 * @function
 * @name renderSignUpContent
 * */
function renderSignUpContent() {
  document.getElementById("contentUserValidation").innerHTML = generateSignUpContent();
  document.getElementById("signUpButtonHeadline").classList.add("d-none");
}

function generateLogInContent() {
  return /*html*/ `<div class="log-in-container">
  <div class="headline-log-in-container">
    <h1 class="headline-log-in">Log in</h1>
    <div class="bottom-line"></div>
  </div>
  <form onsubmit="setLogin() return false" class="input-log-in" action="">
    <div class="input-field-container">
      <input placeholder="Email" type="email" id="emailInput" name="email" required class="input-field" required/>
      <img src="./assets/img/mail_add_contact.png" alt="mail" />
    </div>
    <div class="input-field-container">
    <input oninput="passwordInputVisible()" class="input-field" placeholder="Password" type="password" id="passwordInput" name="password" required/>
    <img onclick="passwordVisible()" id="passwordImg" src="./assets/img/lock.svg" alt="lock" />
  </div>
  <div class="remember-me-container">
    <input onclick="setRememberMe()" type="checkbox" id="rememberMe" class="accept-icon"/>
    <p>Remember me</p>
  </div>
  <div class="submit-log-in-container">
    <button class="sign-up-log-in-button width-log-in-button ">Log in</button>
    <a href="./summary.html" class="guest-log-in-button width-guest-log-in-button">Guest Log in</a>
  </div>
  </form>
</div>`;
}

function generateSignUpContent() {
  return /*html*/ `<div class="sign-up-container">
  <div class="arrow-back-sign-up-container">
    <img onclick="renderLogInContent()" class="arrow-back-sign-up" src="./assets/img/arrow-left-line.svg" alt="arrowback" />
  </div>
  <div class="headline-log-in-container">
    <h1 class="headline-log-in">Sign up</h1>
    <div class="bottom-line"></div>
  </div>
  <form onsubmit="register(); return false" class="input-log-in">
    <div class="input-field-container">
      <input placeholder="Name" type="text" id="nameInput" name="name" required class="input-field" required />
      <img src="./assets/img/person_add_contact.png" alt="mail" />
    </div>
    <div class="input-field-container">
      <input placeholder="Email" type="email" id="emailInput" name="email" required class="input-field" required />
      <img src="./assets/img/mail_add_contact.png" alt="mail" />
    </div>
    <div class="input-field-container">
      <input oninput="passwordInputVisible()" class="input-field" placeholder="Password" type="password" id="passwordInput" name="password" required />
      <img onclick="passwordVisible()" id="passwordImg" src="./assets/img/lock.svg" alt="lock" />
    </div>
    <div id="inputFieldConfirmPassword" class="input-field-container">
      <input oninput="confirmPasswordInputVisible()" class="input-field" placeholder="Confirm Password" type="password" id="confirmPasswordInput" name="confirmpassword" required />
      <img onclick="confirmPasswordVisible()" id="confirmPasswordImg" src="./assets/img/lock.svg" alt="lock" />
    </div>
    <p id="textThePasswordNotMatch"></p>
    <div class="accept-privacy-policy-container">
      <input required type="checkbox" id="rememberMe" class="accept-icon"/>
      <p>I accept the<a href="#" class="sign-up-data-protection-link">Privacy Policy</a></p>
    </div>
    <div class="submit-sign-up-container">
      <button id="signUpButton" class="sign-up-log-in-button">Sign up</button>
    </div>
  </form>
</div>`;
}
