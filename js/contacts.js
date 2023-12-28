let contacts = [
    ["Marcel Bauer", "bauer@gmail.com", "+49 8625 946 38 2"],
    ["Anton Mayer", "antom@gmail.com", "+49 1111 111 11 1"],
    ["Anja Schulz", "schulz@hotmail.com", "+49 2222 222 22 2"],
    ["Benedikt Ziegler", "benedikt@gmail.com", "+49 3333 333 33 3"],
    ["David Eisenberg", "davidberg@gmail.com", "+49 1283 297 48 9"],
    ["Eva Fischer", "eva@gmail.com", "+49 2825 594 86 7"],
    ["Emmanuel Mauer", "emmanuelma@gmail.com", "+49 5890 487 38 4"],
    ["Tatjana Wolf", "wolf@gmail.com", "+49 7362 836 98 1"]
];
const colors = ['#9227FE', '#3BDBC7', '#FD81FF', '#FFBB2A', '#6E52FF', '#169857', '#6B5E5F',
                '#FF7915'];
let selectedContactIndex = null;

async function renderContacts(){
    contacts.sort();
    showContacts();
}

function showContacts() {
    let contactsdiv = document.getElementById('contacts');
    contactsdiv.innerHTML = '';
    let currentLetter = '';

    for (let i = 0; i < contacts.length; i++) {
        let name = contacts[i][0];
        let firstname = name[0].toUpperCase(); // Ersten Buchstaben extrahieren und in Großbuchstaben umwandeln

        let names = contacts[i][0].split(" ");
        let surname = names[1].toUpperCase().charAt(0);


        // Wenn der Anfangsbuchstabe sich ändert, neue Gruppe anzeigen
        if (firstname !== currentLetter) {
            contactsdiv.innerHTML += `<div class="group-header">${firstname}</div><hr>`;
            currentLetter = firstname;
        }

        contactsdiv.innerHTML += `
            <div class="contact-info" id="contact-info-${i}" onclick="selectContact(${i},'${firstname}','${surname}')">
                <div class="contact-info-left">
                    <div class="circle" id="circle-${i}" style="background-color: ${colors[i]}"><p class="nameIdList" id="name-id">${firstname}${surname}</p></div>
                </div>
                <div class="contact-info-right">
                    <div class="contact-info-name" id="contact-info-name-${i}">
                        ${name}
                    </div>
                    <div class="contact-info-mail" id="contact-info-mail-${i}">
                        ${contacts[i][1]}
                    </div>
                </div>
            </div>`;
    }
}


function resetSelectedContact() {
    if (selectedContactIndex !== null) {
        document.getElementById(`contact-info-${selectedContactIndex}`).style = "";
        selectedContactIndex = null;
    }
}

function selectContact(i, firstname, surname){
    resetSelectedContact();
    document.getElementById(`contact-info-${i}`).style = "background-color: #293647; color: white";
    selectedContactIndex = i;
    showCard(i, firstname, surname);
}

function showCard(i, firstname, surname){
    document.getElementById('contactCard').classList.remove('d-none');
    let name = document.getElementById('nameCard').innerHTML = `${contacts[i][0]}`;
    let email = document.getElementById('emailCard').innerHTML = `<div class="head-info"> Email </div><div class="main-info-mail">${contacts[i][1]}</div>`;
    let phone = document.getElementById('phoneCard').innerHTML = `<div class="head-info"> Phone </div><div class="main-info"> ${contacts[i][2]}</div>`;

    let circle = document.getElementById('circleCard');
    circle.innerHTML = `<p class="nameId">${firstname}${surname}</p>`;
    circle.style = `background-color: ${colors[i]};`;

    let editCircle = document.getElementById('editCircle');
    editCircle.innerHTML = `<p class="nameIdEdit">${firstname}${surname}</p>`;
    editCircle.style = `background-color: ${colors[i]};`;

    document.getElementById('textCard').classList.remove('d-none');
    document.getElementById('circleCard').classList.remove('d-none');

    document.getElementById('buttonsCard').innerHTML = `                            
    <div class="editCard" id="editCard" onclick="editContact(${i})">
        <img class="logo-mini" src="./assets/img/edit_contacts.png">
        Edit
    </div>
    <div class="deleteCard" id="deleteCard" onclick="deleteContact(${i})">
        <img class="logo-mini" src="./assets/img/delete_contacts.png">
        Delete  
    </div>`;
}


function closeAddContact(){
    document.getElementById('addContact').classList.add('d-none');
}

function createContact(){
        let userName = document.getElementById('userName').value;
        let userEmail = document.getElementById('userEmail').value;
        let userPhone = document.getElementById('userPhone').value;
        contacts.push([userName, userEmail, userPhone]);
        renderContacts();
        closeAddContact();
}
    
function addNewContact(){
    document.getElementById('addContact').classList.remove('d-none');
}

function editContact(i){
    document.getElementById('editContact').classList.remove('d-none');
    document.getElementById('editInput').innerHTML = `
        <div class="inputFieldName">
            <input class="inputField" type="text" id="userNameEdit"> 
            <img class="logo-edit-input" src="./assets/img/person_add_contact.png">
        </div>
        <div class="inputFieldName">
            <input class="inputField" type="email" id="userEmailEdit"> 
            <img class="logo-edit-input" src="./assets/img/mail_add_contact.png">
        </div>
        <div class="inputFieldName">
            <input class="inputField" type="tel" id="userPhoneEdit"> 
            <img class="logo-edit-input" src="./assets/img/call_add_contact.png">
        </div>
        <div class="editButtons">
            <button class="deleteButton" onclick="deleteContact(${i})">Delete</button>
            <button class="saveButton" onclick="saveContact(${i})">
                <div class="save-button-div">
                <div class="save-text">Save</div>
                <div><img class="save-check-img" src="./assets/img/check.png"></div>
            </button>
        </div>
    `;
    document.getElementById('userNameEdit').value = `${contacts[i][0]}`;
    document.getElementById('userEmailEdit').value = `${contacts[i][1]}`;
    document.getElementById('userPhoneEdit').value = `${contacts[i][2]}`;
}

function deleteContact(i){
    contacts.splice(i, 1);
    renderContacts();
    document.getElementById('contactCard').classList.add('d-none');
    selectedContactIndex = null;
    console.log(contacts);
}

function saveContact(i){
    contacts[i][0] = document.getElementById('userNameEdit').value;
    contacts[i][1] = document.getElementById('userEmailEdit').value;
    contacts[i][2] = document.getElementById('userPhoneEdit').value;
    renderContacts();
    closeEditContact();
    selectContact(i);
}

function closeEditContact(){
    document.getElementById('editContact').classList.add('d-none');
}

