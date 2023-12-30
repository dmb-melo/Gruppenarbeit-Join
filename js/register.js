let users = [];
let rememberMeIsSet;
let emailRememberMe = [];
let passwordRememberMe = [];
let userName = [];
let initials = [];
const STORAGE_TOKEN = "XULVXKXQ87YFSN0Q9PFZSMP577RV8CAJX896XQXQ";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

/**
 * Validation of user data. If the user and password are correct, they are forwarded to summary. If password or user do not match, the user is informed.
 * @function
 * @name login
 * */
function login() {
  let email = document.getElementById("emailInput").value;
  let password = document.getElementById("passwordInput").value;
  let user = users.find((u) => u.email == email && u.password == password);
  if (user) {
    let name = user["name"];
    setInitialsOfTheUser(name);
    window.location.href = "./summary.html";
    rememberMe();
  } else {
    document.getElementById("inputFieldPassword").style = `border: 1px solid rgb(255,128,143) !important;`;
    document.getElementById("textThePasswordNotMatchLogin").innerHTML = `Ups! your password don't match`;
  }
}

function guestLogin() {
  let name = "Guest";
  setInitialsOfTheUser(name);
  window.location.href = "./summary.html";
}

/**
 * Validation of user data. If the user and password are correct, they are forwarded to summary. If password or user do not match, the user is informed.
 * @function
 * @name setInitialsOfTheUser
 *
 * @param {string} user  - User data that matches the login data entered.
 * @param {string} userName  - User name.
 * @param {string} initials - Initials from User name.
 * */
function setInitialsOfTheUser(name) {
  userName = [];
  initials = [];
  userName = name;
  splitNames = name.split(" ");
  if (!splitNames[1]) {
    initials  = userName[0].charAt(0).toUpperCase();
    
  } else {
    initials = splitNames[0].charAt(0).toUpperCase() + splitNames[1].charAt(0).toUpperCase();
  }
  saveUserData();
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
 * The function changes the SVG based on the state of the field
 * @function
 * @name rememberMe
 *
 * @type {boolean}
 * @description The global variable rememberMeIsSet defines whether the checkmark is set or not
 */
function rememberMe() {
  let email = document.getElementById("emailInput").value;
  let password = document.getElementById("passwordInput").value;
  emailRememberMe = [];
  passwordRememberMe = [];
  if (rememberMeIsSet) {
    emailRememberMe.push(email);
    passwordRememberMe.push(password);
  }
  saveUserLoginData();
}

/**
 * Saving the data on the server
 * @function
 * @name setItem
 * @param {string} key - the key to the request
 * @param {string} value - the value of the request
 * @param {string} res - Feedback from the server
 * */
async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, { method: "POST", body: JSON.stringify(payload) }).then((res) => res.json());
}

/**
 * Download data from the server
 * @function
 * @name getItem
 * @param {string} key - the key to the request
 * @param {string} res - Feedback from the server
 *
 * */
async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      if (res.data) {
        return res.data.value;
      }
      throw `Could not find data with key "${key}".`;
    });
}

/**
 * load the user data and report an error if it is not found on the remote storage
 * @function
 * @name loadUsers
 * @param {string} key - the key to the request
 * @param {string} res - Feedback from the server
 *
 * */
async function loadUsers() {
  try {
    users = JSON.parse(await getItem("users"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

/**
 * Registration and saving of user data
 * @function
 * @name register
 * @param {string} name - Name from the input field
 * @param {string} email - E-mail from the input field
 * @param {string} password - Password from the input field
 *
 * */
async function register() {
  signUpButton.disabled = true;
  users.push({
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  });
  await setItem("users", JSON.stringify(users));
  resetForm();
  renderRegisteSuccessfully();
}

/**
 * generates a pop-up window when registration is successful
 * @function
 * @name renderRegisteSuccessfully
 *
 * */
function renderRegisteSuccessfully() {
  document.getElementById("registerSuccessfullyContent").innerHTML = generateRegisteSuccessfully();
  renderLogInContent();
  setTimeout(resetRegisteSuccessfully, 2000);
}
/**
 * Resets the pop-up window after successful registration
 * @function
 * @name resetRegisteSuccessfully
 *
 * */
function resetRegisteSuccessfully() {
  document.getElementById("registerSuccessfullyContent").innerHTML = "";
}

/**
 * Reset all input fields and activate the registration button
 * @function
 * @name resetForm
 *
 * */
function resetForm() {
  nameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
  confirmPasswordInput.value = "";
  signUpButton.disabled = false;
}

/**
 * Saves the data from the local storage.
 * @function
 * @name saveUserLoginData
 *
 * @param {string} emailRememberMe - Saved e-mail in the local storage
 * @param {string} passwordRememberMe - Saved password in the local storage
 * */
function saveUserLoginData() {
  let emailRememberMeAtText = JSON.stringify(emailRememberMe);
  let passwordRememberMeAtText = JSON.stringify(passwordRememberMe);
  localStorage.setItem("email", emailRememberMeAtText);
  localStorage.setItem("password", passwordRememberMeAtText);
}

/**
 * Loads the data from the local storage.
 * @function
 * @name loadUserLoginData
 *
 * @param {string} emailRememberMe - Load e-mail from local storage
 * @param {string} passwordRememberMe - Load password from local storage
 * */
function loadUserLoginData() {
  let emailRememberMeAtText = localStorage.getItem("email");
  let passwordRememberMeAtText = localStorage.getItem("password");
  if (emailRememberMeAtText && passwordRememberMeAtText) {
    emailRememberMe = JSON.parse(emailRememberMeAtText);
    passwordRememberMe = JSON.parse(passwordRememberMeAtText);
  }
}

/**
 * Saves the data from the local storage.
 * @function
 * @name saveUserData
 *
 * @param {string} userName - Saved name in the local storage
 * @param {string} initials - Saved initials in the local storage
 * */
function saveUserData() {
  let userNameAtText = JSON.stringify(userName);
  let initialsAtText = JSON.stringify(initials);
  localStorage.setItem("userName", userNameAtText);
  localStorage.setItem("initials", initialsAtText);
}

/**
 * Loads the data from the local storage.
 * @function
 * @name loadUserLoginData
 *
 * @param {string} userName  - Load name local storage
 * @param {string} initials - Load initials from local storage
 * */
function loadUserData() {
  let userNameAtText = localStorage.getItem("userName");
  let initialsAtText = localStorage.getItem("initials");
  if (userNameAtText && initialsAtText) {
    userName = JSON.parse(userNameAtText);
    initials = JSON.parse(initialsAtText);
  }
}

/**
 * Generates the HTML content of the pop-up window if you have been successfully registered
 * @function
 * @name generateRegisteSuccessfully
 *
 * */
function generateRegisteSuccessfully() {
  return /*html*/ `
      <div class="container-register-successfully">
        <p class="msg-register-successfully">You Signed Up successfully</p>
      </div>
  `;
}
