
const STORAGE_TOKEN = 'XULVXKXQ87YFSN0Q9PFZSMP577RV8CAJX896XQXQ';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


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
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
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
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) { 
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}

let users = [];

async function init(){
    loadUsers();
}

/**
 * load the user data and report an error if it is not found on the remote storage
 * @function
 * @name loadUsers
 * @param {string} key - the key to the request
 * @param {string} res - Feedback from the server
 * 
 * */
async function loadUsers(){
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e){
        console.error('Loading error:', e);
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
    await setItem('users', JSON.stringify(users));
    resetForm();
}

/**
 * Reset all input fields and activate the registration button
 * @function
 * @name resetForm
 * 
 * */
function resetForm() { //entsperren den Button und leeren alle Inputfelder
    email.value = '';
    password.value = '';
    passwordInput.value = '';
    confirmPasswordInput.value = '';
    signUpButton.disabled = false;
}