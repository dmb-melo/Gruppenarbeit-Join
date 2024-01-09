let users = [];
let rememberMeIsSet;
let emailRememberMe = [];
let passwordRememberMe = [];
let userName = [];
let initials = [];
const STORAGE_TOKEN = "XULVXKXQ87YFSN0Q9PFZSMP577RV8CAJX896XQXQ";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

function login() {
  let email = document.getElementById("emailInput").value;
  let password = document.getElementById("passwordInput").value;
  let user = users.find((u) => u.email == email && u.password == password);
  if (user) {
    let name = user["name"];
    setInitialsOfTheUser(name);
    window.location.href = "./join.html";
    rememberMe();
  } else {
    document.getElementById("inputFieldPassword").style = `border: 1px solid rgb(255,128,143) !important;`;
    document.getElementById("textThePasswordNotMatchLogin").innerHTML = `Ups! your password don't match`;
  }
}

function guestLogin() {
  let name = "Guest";
  setInitialsOfTheUser(name);
  window.location.href = "./join.html";
}

function setInitialsOfTheUser(name) {
  userName = [];
  initials = [];
  userName = name;
  splitNames = name.split(" ");
  if (!splitNames[1]) {
    initials = userName[0].charAt(0).toUpperCase();
  } else {
    initials = splitNames[0].charAt(0).toUpperCase() + splitNames[1].charAt(0).toUpperCase();
  }
  saveUserData();
}

function setRememberMe() {
  if (!rememberMeIsSet) {
    rememberMeIsSet = true;
  } else {
    rememberMeIsSet = false;
  }
}

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

async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, { method: "POST", body: JSON.stringify(payload) }).then((res) => res.json());
}

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

async function loadUsers() {
  try {
    users = JSON.parse(await getItem("users"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

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

function renderRegisteSuccessfully() {
  document.getElementById("registerSuccessfullyContent").innerHTML = generateRegisteSuccessfully();
  renderLogInContent();
  setTimeout(resetRegisteSuccessfully, 2000);
}

function resetRegisteSuccessfully() {
  document.getElementById("registerSuccessfullyContent").innerHTML = "";
}

function resetForm() {
  nameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
  confirmPasswordInput.value = "";
  signUpButton.disabled = false;
}

function saveUserLoginData() {
  let emailRememberMeAtText = JSON.stringify(emailRememberMe);
  let passwordRememberMeAtText = JSON.stringify(passwordRememberMe);
  localStorage.setItem("email", emailRememberMeAtText);
  localStorage.setItem("password", passwordRememberMeAtText);
}

function loadUserLoginData() {
  let emailRememberMeAtText = localStorage.getItem("email");
  let passwordRememberMeAtText = localStorage.getItem("password");
  if (emailRememberMeAtText && passwordRememberMeAtText) {
    emailRememberMe = JSON.parse(emailRememberMeAtText);
    passwordRememberMe = JSON.parse(passwordRememberMeAtText);
  }
}

function saveUserData() {
  let userNameAtText = JSON.stringify(userName);
  let initialsAtText = JSON.stringify(initials);
  localStorage.setItem("userName", userNameAtText);
  localStorage.setItem("initials", initialsAtText);
}

function loadUserData() {
  let userNameAtText = localStorage.getItem("userName");
  let initialsAtText = localStorage.getItem("initials");
  if (userNameAtText && initialsAtText) {
    userName = JSON.parse(userNameAtText);
    initials = JSON.parse(initialsAtText);
  }
}

function generateRegisteSuccessfully() {
  return /*html*/ `
      <div class="container-register-successfully">
        <p class="msg-register-successfully">You Signed Up successfully</p>
      </div>
  `;
}
