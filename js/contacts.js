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
                '#FF7915', '#9227FE', '#3BDBC7', '#FD81FF', '#FFBB2A', '#6E52FF', '#169857', '#6B5E5F',
                '#FF7915'];
let selectedContactIndex = null;

async function renderContacts() {
    await loadContactsFromServer();
    contacts.sort(function(a, b) {
        return a[0].localeCompare(b[0]);
    });
    showContacts();
}

async function setItemContacts(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: "POST", body: JSON.stringify(payload) }).then((res) => res.json());
  }
  
  async function getItemContacts(key) {
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
 
  async function loadContactsFromServer() {
    try {
        contacts = JSON.parse(await getItemContacts("contacts"));
    } catch (e) {
      console.error("Loading error:", e);
    }
  }
  
  async function saveContactsToServer(newContact) {
    contacts.push(newContact);
    await setItemContacts("contacts", JSON.stringify(contacts));
}

function getRandomIndex() {
    let randomIndex = Math.floor(Math.random() * colors.length);
    newColors = colors
    return randomIndex;
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

function selectContact(i, firstname, surname, event){
    document.getElementById('editContact').classList.add('d-none');
    document.getElementById('editContactBackground').classList.add('d-none');
    resetSelectedContact();
    document.getElementById(`contact-info-${i}`).style = "background-color: #293647; color: white";
    selectedContactIndex = i;
    showCard(i, firstname, surname);
    //responsive
    document.getElementById('contact-details').classList.remove('hide-mobile-397px');
    document.getElementById('contact-list').classList.add('hide-mobile-397px');
    document.getElementById('button-add-contact-mobile').style = 'display: none';
    document.getElementById('button-edit-contact-mobile').style = 'display: block';
    fillOnclickDiv(i);
}

function fillOnclickDiv(i){
    document.getElementById('onclickDiv').innerHTML = `
    <img class="image-edit-contact-mobile" src="./assets/img/more_vert.png" onclick="openMiniPopup(${i})">`;
}

function showCard(i, firstname, surname){
    document.getElementById('addContact').classList.add('d-none');
    document.getElementById('addContactBackground').classList.add('d-none');
    document.getElementById('contactCard').classList.remove('d-none');
    document.getElementById('contactCard').classList.add('slide-left');

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
    <div class="editCard" id="editCard" onclick="editContact(${i})"
        onmouseover="hoverEdit(this, true)" onmouseout="hoverEdit(this, false)">
        <img class="logo-mini" src="./assets/img/edit_contacts.png">
        <img class="logo-mini-hover" src="./assets/img/edit2.png">
        <span class="textEdit">Edit</span>
    </div>
    <div class="deleteCard" id="deleteCard" onclick="deleteContact(event, ${i})"
        onmouseover="hoverEdit(this, true)" onmouseout="hoverEdit(this, false)">
        <img class="logo-mini" src="./assets/img/delete_contacts.png">
        <img class="logo-mini-hover" src="./assets/img/delete.png">
        <span class="textEdit">Delete</span>
    </div>`;
}

function hoverEdit(element, isHover) {
    const logoMini = element.querySelector('.logo-mini');
    const logoMiniHover = element.querySelector('.logo-mini-hover');

    if (isHover) {
        logoMini.style.display = 'none';
        logoMiniHover.style.display = 'inline';
    } else {
        logoMini.style.display = 'inline';
        logoMiniHover.style.display = 'none';
    }
}

function hoverCancel(element, isHover) {
    const cancelImgBlack = element.querySelector('.cancel-img-black');
    const cancelImgBlue = element.querySelector('.cancel-img-blue');

    if (isHover) {
        cancelImgBlack.style.display = 'none';
        cancelImgBlue.style.display = 'inline';
    } else {
        cancelImgBlack.style.display = 'inline';
        cancelImgBlue.style.display = 'none';
    }
}

async function createContact(event) {
    event.preventDefault();

    let userName = document.getElementById('1').value;
    let userEmail = document.getElementById('2').value;
    let userPhone = document.getElementById('3').value;

    if (!userName || !userEmail || !userPhone) {
        alert("Please fill out all fields before creating a contact.");
        return;
    }

    // Überprüfen Sie die Validität des Musters für den Namen
    let namePattern = /^[A-Za-z]+\s[A-Za-z]+$/;
    if (!namePattern.test(userName)) {
        alert("Please enter a valid name (first name and last name).");
        userNameInput.focus();
        return;
    }

    let newContact = [userName, userEmail, userPhone];

    // Füge den neuen Kontakt am Ende hinzu
    //contacts.push(newContact);
    await saveContactsToServer(newContact);

    // Sortiere die Kontakte nach dem Hinzufügen des neuen Kontakts
    contacts.sort(function(a, b) {
        return a[0].localeCompare(b[0]);
    });

    renderContacts();
    closeAddContact();

    // Leere die Input-Felder
    document.getElementById('1').value = '';
    document.getElementById('2').value = '';
    document.getElementById('3').value = '';

    // Wähle den neu hinzugefügten Kontakt aus
    let newIndex = contacts.findIndex(contact => contact === newContact);
    selectContact(newIndex, userName[0].toUpperCase(), userName.split(" ")[1].toUpperCase().charAt(0));
    showSuccessMessage();
}

function showSuccessMessage() {
    let successDiv = document.getElementById('success');
    successDiv.classList.add('show');

    setTimeout(() => {
        hideSuccessMessage();
    }, 3000);
}

function hideSuccessMessage() {
    let successDiv = document.getElementById('success');
    successDiv.classList.remove('show');
}

function addNewContact(){
    document.getElementById('contactCard').classList.add('d-none');
    document.getElementById('addContact').classList.remove('d-none');
    document.getElementById('addContactBackground').classList.remove('d-none');
    document.getElementById('addContact').classList.add('slide-left');
    resetSelectedContact();
}

function editContact(i){
    document.getElementById('contactCard').classList.add('d-none');
    document.getElementById('editContact').classList.remove('d-none');
    document.getElementById('editContactBackground').classList.remove('d-none');
    document.getElementById('editContact').classList.add('slide-left');
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
            <button class="deleteButton" onclick="deleteContact(event, ${i})">Delete</button>
            <button class="saveButton" onclick="saveContact(event, ${i})">
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

async function deleteContact(event, i){
    contacts.splice(i, 1);
    await setItemContacts("contacts", JSON.stringify(contacts));
    renderContacts();
    document.getElementById('contactCard').classList.add('d-none');
    selectedContactIndex = null;
    document.getElementById('editContact').classList.add('d-none');
    document.getElementById('editContactBackground').classList.add('d-none');
    event.preventDefault();
}

async function saveContact(event, i) {
    let editedContact = [
        document.getElementById('userNameEdit').value,
        document.getElementById('userEmailEdit').value,
        document.getElementById('userPhoneEdit').value
    ];
 
    //contacts[i] = editedContact;
    //let editContac = [contacts[i][0], contacts[i][1], contacts[i][2]];
    
    contacts.splice(i, 1);
   
    closeEditContact();
    selectContact(i);

    let name = contacts[i][0];
    let firstname = name[0].toUpperCase(); // Ersten Buchstaben extrahieren und in Großbuchstaben umwandeln
    let names = contacts[i][0].split(" ");
    let surname = names[1].toUpperCase().charAt(0);
    let circle = document.getElementById('circleCard'); //undefined
    circle.innerHTML = `<p class="nameId">${firstname}${surname}</p>`;
    let editCircle = document.getElementById('editCircle'); //undefined
    editCircle.innerHTML = `<p class="nameIdEdit">${firstname}${surname}</p>`;
    event.preventDefault();
    await saveContactsToServer(editedContact);
    renderContacts();
}

function closeEditContact(){
    document.getElementById('editContact').classList.add('d-none');
    document.getElementById('contactCard').classList.remove('d-none');
    document.getElementById('editContactBackground').classList.add('d-none');
}

function closeAddContact(){
    //document.getElementById('addContact').classList.remove('slide-left');
    document.getElementById('addContact').classList.add('d-none');
    document.getElementById('contactCard').classList.remove('d-none');
    document.getElementById('addContactBackground').classList.add('d-none');
}

function openMiniPopup(i){
    document.getElementById('mini-popup').style = 'display: block';
    document.getElementById('mini-popup-display').innerHTML =`
    <div class="editCard-mini" id="editCard-mini" onclick="editContact(${i})"
        onmouseover="hoverEdit(this, true)" onmouseout="hoverEdit(this, false)">
        <img class="logo-mini" src="./assets/img/edit_contacts.png">
        <img class="logo-mini-hover" src="./assets/img/edit2.png">
        <span class="textEdit">Edit</span>
    </div>
    <div class="deleteCard-mini" id="deleteCard-mini" onclick="deleteContact(event, ${i})"
        onmouseover="hoverEdit(this, true)" onmouseout="hoverEdit(this, false)">
        <img class="logo-mini" src="./assets/img/delete_contacts.png">
        <img class="logo-mini-hover" src="./assets/img/delete.png">
        <span class="textEdit">Delete</span>
    </div>`;
}

function generate_contactsHtml(){
    return `
    <div class="addContactBackground d-none" id="addContactBackground">
    <div class="addContactPopup d-none" id="addContact">
        <div class="addContactMain">
            <div class="addContactLeft">
                <img class="closeAddContact-mobile" src="./assets/img/close_white.png" onclick="closeAddContact()">
                <img class="addContactLogo hide-mobile-397px" src="./assets/img/logo-white.svg">
                <div class="addContactHeadline">Add contact</div>
                <div class="addContactHeadline2">Tasks are better with a team!</div>
                <div class="line3"></div>
            </div>
            <div class="addContactMiddle">
                <div class="addCircle" id="addCircle">
                    <img class="addCircle-image" src="./assets/img/person.png">
                </div>
            </div>
            <div class="addContactRight">
                    <div class="formDiv">
                        <form id="addContactForm" name="myForm">
                            <div class="close-img-div">
                                <img class="close-img" src="./assets/img/cancel.png" onclick="closeAddContact()">
                            </div>
                            <div class="input">
                                <div class="inputFieldName">
                                    <input class="inputField" id="1" type="text" placeholder="Name"> 
                                    <img class="logo-edit-input" src="./assets/img/person_add_contact.png">
                                </div>
                                <div class="inputFieldName">
                                    <input class="inputField" id="2" type="email"placeholder="Email"> 
                                    <img class="logo-edit-input" src="./assets/img/mail_add_contact.png">
                                </div>
                                <div class="inputFieldName">
                                    <input class="inputField" id="3" type="tel" placeholder="Phone"> 
                                    <img class="logo-edit-input" src="./assets/img/call_add_contact.png">
                                </div>
                            </div>
                            <div class="editButtons">
                                <button class="closeButton  hide-mobile-397px" onclick="closeAddContact()" onmouseover="hoverCancel(this, true)" onmouseout="hoverCancel(this, false)">
                                    <div class="cancel-button-div">
                                        <span class="cancel-text">Cancel</span>
                                        <img class="cancel-img-black" src="./assets/img/cancel.png">
                                        <img class="cancel-img-blue" src="./assets/img/iconoir_cancel-2.png">
                                    </div>
                                </button>
                                <button type="submit" class="createButton" onclick="createContact(event)">
                                    <div class="create-button-div">
                                    <div class="create-text">Create Contact</div>
                                    <div><img class="create-img" src="./assets/img/check.png"></div>
                                </button>
                            </div>
                        </form>
                    </div>
            </div>
        </div>
    </div>
    </div>

    <!--edit contact popup-->
    <div class="editContactBackground d-none" id="editContactBackground">
    <div class="editContactPopup d-none" id="editContact">
        <div class="editContactMain">
            <div class="editContactLeft">
                <img class="closeEditContact-mobile" src="./assets/img/close_white.png" onclick="closeEditContact()">
                <img class="editContactLogo" src="./assets/img/logo-white.svg">
                <div class="editContactHeadline">Edit contact</div>
                <div class="line2"></div>
            </div>
            <div class="editContactMiddle">
                <div class="editCircle" id="editCircle"></div>
            </div>
            <div class="editContactRight">
                <div class="formDiv">
                    <form id="editContactForm" name="myFormEdit">
                        <div class="close-img-div"><img class="close-img" src="./assets/img/cancel.png" onclick="closeEditContact()"></div>
                        <div class="input" id="editInput"></div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>

    <div class="contacts-content">
        <!--contact list-->
        <div class="contact-list" id="contact-list">
            <button class="add-contact hide-mobile-397px" onclick="addNewContact()">
                <div class="add-contact-main">
                    <div>Add new contact</div>
                    <div><img class="add-contact-image" src="./assets/img/person_add.png"></div>
                </div>
            </button>
            <div class="contacts" id="contacts"></div>
        </div>

        <!--contact details-->
        <div class="contact-details hide-mobile-397px" id="contact-details">
            <div class="contact-details-headline">
                <img class="contacts-headline-arrow" src="./assets/img/arrow-left-line.png" onclick="render_contactsHtml()">
                <div class="contacts-headline-h1">Contacts</div>
                <div class="line"></div>
                <div class="headline-h3">Better with a team</div>
                <div class="line4"></div>
            </div>
            <div class="contactCard" id="contactCard">
                <div class="contactTitle">
                    <div class="circleCard d-none" id="circleCard"></div>
                    <div class="contactNameButtons">
                        <div class="nameCard" id="nameCard"></div>  
                        <div class="buttonsCard" id="buttonsCard"></div>
                    </div>
                </div>
                <div class="textCard d-none" id="textCard">Contact Information</div>
                <div class="emailCard" id="emailCard"></div>
                <div class="phoneCard" id="phoneCard"></div>
            </div>
        </div>
        <div class="success d-none" id="success">Contact successfully created</div>
        
        <div class="button-add-contact-mobile" id="button-add-contact-mobile" onclick="addNewContact()">
            <img class="image-add-contact-mobile" src="./assets/img/person_add.png">
        </div>

        <div class="button-edit-contact-mobile" id="button-edit-contact-mobile">
            <div class="onclickDiv" id="onclickDiv">
            </div>
        </div>
        <div class="mini-popup" id="mini-popup">
        <div class="mini-popup-display" id="mini-popup-display">
        </div>
        </div>
    </div>
    `;
}
