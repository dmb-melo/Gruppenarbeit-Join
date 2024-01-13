let submenuIsOpen = false;
let passwordIsVisible = false;
let confirmPasswordIsVisible = false;
let legalInformationLogin = false;
let legalInformationSignup = false;

function doNotClose(event) {
  event.stopPropagation();
}

function initLoading() {
  loadUsers();
  loadUserLoginData();
  loadUserData();
  startAnimation();
  renderLogInContent();
}

function startAnimation() {
  document.querySelector(".animationJoinLogo").classList.add("animated");
  document.querySelector(".animationJoinLogo").classList.remove("dNone");
  document.querySelector(".join-logo").classList.add("animated");
}

function passwordInputVisible() {
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

function confirmPasswordInputVisible() {
  let inputValuePassword = document.getElementById("confirmPasswordInput").value;
  if (inputValuePassword) {
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

function validatePassword() {
  let inputValuePassword = document.getElementById("passwordInput").value;
  let confirmInputValuePassword = document.getElementById("confirmPasswordInput").value;
  if (inputValuePassword != confirmInputValuePassword) {
    document.getElementById("inputFieldConfirmPassword").style = `border: 1px solid rgb(255,128,143) !important;`;
    document.getElementById("textThePasswordNotMatchSignUp").innerHTML = `Ups! your password doesn't match`;
    signUpButton.disabled = true;
  } else {
    document.getElementById("inputFieldConfirmPassword").style = "";
    document.getElementById("textThePasswordNotMatchSignUp").innerHTML = "";
    signUpButton.disabled = false;
  }
}

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

function renderLogInContent() {
  passwordIsVisible = false;
  document.getElementById("contentUserValidation").innerHTML = generateLogInContent();
  document.getElementById("signUpButtonHeadline").classList.remove("d-none");
  document.getElementById("signUpButtonResponsive").classList.remove("d-none");
  automaticCompletionLoginData();
}

function automaticCompletionLoginData() {
  let checkboxRememberMe = document.getElementById("rememberMe");
  if (emailRememberMe.length === 0 && passwordRememberMe.length === 0) {
    checkboxRememberMe.checked = false;
    rememberMeIsSet = false;
  } else {
    document.getElementById("emailInput").value = emailRememberMe;
    document.getElementById("passwordInput").value = passwordRememberMe;
    checkboxRememberMe.checked = true;
    rememberMeIsSet = true;
  }
}

function renderSignUpContent() {
  passwordIsVisible = false;
  document.getElementById("contentUserValidation").innerHTML = generateSignUpContent();
  document.getElementById("signUpButtonHeadline").classList.add("d-none");
  document.getElementById("signUpButtonResponsive").classList.add("d-none");
}

function renderLogInPrivacyPolicyContent() {
  legalInformationLogin = true;
  removeContentLogin();
  renderLogInHeaderAndSidebar();
  privacyPolicyContent();
}

function renderLogInLegalNoticeContent() {
  legalInformationLogin = true;
  removeContentLogin();
  renderLogInHeaderAndSidebar();
  legalNoticeContent();
}

function renderSignupPrivacyPolicyContent() {
  legalInformationSignup = true;
  removeContentLogin();
  renderLogInHeaderAndSidebar();
  privacyPolicyContent();
}

function privacyPolicyContent() {
  document.getElementById("contentUserValidation").innerHTML += generatePrivacyPolicyContent();
}

function legalNoticeContent() {
  document.getElementById("contentUserValidation").innerHTML += generateLegalNoticeContent();
}

function removeContentLogin() {
  document.getElementById("signUpButtonHeadline").classList.add("d-none");
  document.getElementById("loginpageDataProtectionContainer").classList.add("d-none");
  document.getElementById("signUpButtonResponsive").classList.add("d-none");
  document.getElementById("animationJoinLogoContainer").classList.add("d-none");
  document.getElementById("joinLogoContainer").classList.add("d-none");
}

function renderLogInHeaderAndSidebar() {
  document.getElementById("contentUserValidation").innerHTML = generateLogInHeaderAndSidebar();
}

function generateLogInContent() {
  return /*html*/ `<div class="log-in-container">
  <div class="headline-log-in-container">
    <h1 class="headline-log-in">Log in</h1>
    <div class="bottom-line"></div>
  </div>
  <form onsubmit="login(); return false" class="input-log-in" action="">
    <div class="input-field-container">
      <input placeholder="Email" type="email" id="emailInput" name="email" required class="input-field" required/>
      <img src="./assets/img/mail_add_contact.png" alt="mail" />
    </div>
    <div class="input-field-container" id="inputFieldPassword">
    <input oninput="passwordInputVisible()" class="input-field" placeholder="Password" type="password" id="passwordInput" name="password" required/>
    <img onclick="passwordVisible()" id="passwordImg" src="./assets/img/lock.svg" alt="lock" />
  </div>
  <p id="textThePasswordNotMatchLogin"></p>
  <div class="remember-me-container">
    <input onclick="setRememberMe()" type="checkbox" id="rememberMe" class="accept-icon"/>
    <p>Remember me</p>
  </div>
  <div class="submit-log-in-container">
    <button class="sign-up-log-in-button width-log-in-button ">Log in</button>
    <p onclick="guestLogin()" class="guest-log-in-button width-guest-log-in-button">Guest Log in</p>
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
      <input oninput="passwordInputVisible(), validatePassword();" class="input-field" placeholder="Password" type="password" id="passwordInput" name="password" required />
      <img onclick="passwordVisible()" id="passwordImg" src="./assets/img/lock.svg" alt="lock" />
    </div>
    <div id="inputFieldConfirmPassword" class="input-field-container">
      <input oninput="confirmPasswordInputVisible(), validatePassword();" class="input-field" placeholder="Confirm Password" type="password" id="confirmPasswordInput" name="confirmpassword" required />
      <img onclick="confirmPasswordVisible()" id="confirmPasswordImg" src="./assets/img/lock.svg" alt="lock" />
    </div>
    <p id="textThePasswordNotMatchSignUp"></p>
    <div class="accept-privacy-policy-container">
      <input required type="checkbox" id="rememberMe" class="accept-icon"/>
      <p>I accept the<span onclick="renderSignupPrivacyPolicyContent()" class="sign-up-data-protection-link">Privacy Policy</span></p>
    </div>
    <div class="submit-sign-up-container">
      <button id="signUpButton" class="sign-up-log-in-button">Sign up</button>
    </div>
  </form>
</div>`;
}

function generateLogInHeaderAndSidebar() {
  return /*html*/ `
  <header>
  <img class="join-logo-header-login" src="./assets/img/join-logo.svg" alt="join-logo">
  <div class="headline-log-in-mobile">
    <b class="header-headline-login">Kanban Project Management Tool</b>
  </div>
</header>
<div class="box-sizing-login">
  <div class="sidebar-login">
    <div class="sidbarLogo">
      <img src="./assets/img/logo-white.svg" alt="logo" />
    </div>
    <div class="privacy">
     <span onclick="renderSignupPrivacyPolicyContent()" class="dataProtection">Privacy Policy</span>
     <span onclick="renderLogInLegalNoticeContent()" class="dataProtection">Legal Notice</span>
    </div>
  </div>
</div>
`;
}
