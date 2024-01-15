
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
                        <form id="addContactForm" name="myForm" onsubmit="createContact(event)">
                            <div class="close-img-div">
                                <img class="close-img" src="./assets/img/cancel.png" onclick="closeAddContact()">
                            </div>
                            <div class="input">
                                <div class="inputFieldName">
                                    <input class="inputField" id="1" type="text" placeholder="Name" required> 
                                    <img class="logo-edit-input" src="./assets/img/person_add_contact.png">
                                </div>
                                <div class="inputFieldName">
                                    <input class="inputField" id="2" type="email"placeholder="Email" required> 
                                    <img class="logo-edit-input" src="./assets/img/mail_add_contact.png">
                                </div>
                                <div class="inputFieldName">
                                    <input class="inputField" id="3" type="number" placeholder="Phone" required> 
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
                                <button type="submit" class="createButton" onsubmit="createContact(event)">
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
        <div class="success-2" id="success-2">Contact successfully created</div>

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
