let title = []; // Move it outside the window.onload function
let description = [];
let assigned = [];
let selectedContacts = [];
let dueDate = [];
let prio = [];
let category = [];
let subtasks = [];
let subT = [];
let tasks = [];
let priorityContentArray = [];
let currentId = 0;
let newStatus = [];
let selectedPriorityContent = "";

function addTaskInit() {
  load();
  selectedPriorityContent = localStorage.getItem("selectedPriorityContent");
  renderTask();
}

function renderTask() {
  let contactsList = document.getElementById("contactList");
  contactsList.innerHTML = "";
  // Sort the contacts array alphabetically based on the first name
  sortContacts();
  // Iterate through sorted contacts and create list elements
  for (let i = 0; i < contacts.length; i++) {
    renderContactsAddTask(i, contactsList);
  }
  document.getElementById("searchContacts").addEventListener("keyup", handleContactSearch);
}

function sortContacts() {
  contacts.sort((a, b) => {
    let nameA = a[0].toUpperCase();
    let nameB = b[0].toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
}

function renderContactsAddTask(i, contactsList) {
  let contact = contacts[i];
  let name = contact[0];
  let firstname = name.split(" ")[0][0].toUpperCase(); // First name's first letter in uppercase
  let surname = name.split(" ")[1][0].toUpperCase(); // Last name's first letter in uppercase
  let contactElement = document.createElement("li");
  contactElement.classList.add("contactList");
  contactElement.innerHTML = generateContactsAddTask(name, firstname, surname, i);
  contactsList.appendChild(contactElement);
  const liElement = contactsList.getElementsByTagName("li")[i];
  const nameElement = contactsList.getElementsByTagName("label")[i];
  document.getElementById(`myCheckbox_${i}`).addEventListener("change", function (event) {
  const labelElement = document.querySelectorAll(".nameContact")[i];
  validationContactsChecked(i, liElement, nameElement, labelElement, event);
  });
}

function validationContactsChecked(i, liElement, nameElement, labelElement, event) {
    if (event.target.checked) {
        contactChecked(i, liElement, nameElement, labelElement);
      } else {
        contactNotChecked(i, liElement, nameElement, labelElement);
      }
}

function contactChecked(i, liElement, nameElement, labelElement) {
  // Add the selected contact to the array if not already added
  if (!selectedContacts.includes(i)) {
    selectedContacts.push(i);
  }
  // Call displayAvatar to show the selected contacts' avatars
  displayAvatar(selectedContacts, contacts, colors);
  liElement.classList.add("contactListSelected");
  nameElement.classList.add("nameContactWhite");
  labelElement.style.setProperty("background-image", "url('')");
}

function contactNotChecked(i, liElement, nameElement, labelElement) {
  // Remove the unselected contact from the array
  let index = selectedContacts.indexOf(i);
  if (index > -1) {
    selectedContacts.splice(index, 1);
  }
  liElement.classList.remove("contactListSelected");
  nameElement.classList.remove("nameContactWhite");
  labelElement.style.setProperty("background-image", "url('')");
}

function handleContactSearch() {
  let input = document.getElementById("searchContacts");
  let filter = input.value.toUpperCase();
  let contacts = document.getElementsByClassName("contactList");
  // Loop through all contact list elements and hide/show based on the search input
  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    let nameElement = contact.getElementsByClassName("nameContact")[0];
    let txtValue = nameElement.textContent || nameElement.innerText;
    // Check if the contact name contains the search filter
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      contact.style.display = ""; // Show the matching contact
    } else {
      contact.style.display = "none"; // Hide non-matching contacts
    }
  }
}

function displayAvatar(selectedContacts, contacts, colors) {
  let contactAvatar = document.getElementById("contactAvatar");
  contactAvatar.innerHTML = ""; // Clear previous content
  // Iterate through the selected contacts and append their avatars
  for (let i = 0; i < selectedContacts.length; i++) {
    let selectedIndex = selectedContacts[i];
    let contact = contacts[selectedIndex];
    let name = contact[0];
    let firstname = name.split(" ")[0][0].toUpperCase();
    let surname = name.split(" ")[1][0].toUpperCase();
    // Create the avatar element for the selected contact
    let currentContactContent = generateAvatarAddTask(selectedIndex, contact, firstname, surname);
    // Append the avatar to the contactAvatar element
    contactAvatar.innerHTML += currentContactContent;
  }
}

function clearContactAvatar() {
  let contactAvatar = document.getElementById("contactAvatar");
  contactAvatar.innerHTML = ""; // Clear avatars
}

function clearAllSelections() {
  // Iterate through all checkboxes and labels
  const checkboxes = document.querySelectorAll(".inputCheckBox");
  const labels = document.querySelectorAll(".nameContact");

  checkboxes.forEach((checkbox, index) => {
    checkbox.checked = false; // Deselect the checkbox

    // Remove 'contactListSelected' class from the corresponding li element
    const liElement = checkbox.closest("li");
    if (liElement) {
      liElement.classList.remove("contactListSelected");
    }

    // Remove any additional classes or styles related to selection
    labels[index].classList.remove("nameContactWhite");
    // Clear any additional styles set for the background image
    labels[index].style.setProperty("background-image", "none");
  });
}

function addTask() {
  let titleValue = document.getElementById("title").value;
  document.getElementById("title").value = "";
  title.unshift("titleValue");

  let descriptionValue = document.getElementById("description").value;
  document.getElementById("description").value = "";
  description.unshift(descriptionValue);

  let dueDateValue = document.getElementById("dueDate").value;
  document.getElementById("dueDate").value = "";
  dueDate.unshift(dueDateValue);

  let checkboxes = document.querySelectorAll(".inputCheckBox");
  assigned = []; // Clear the array to store only the currently checked labels

  checkboxes.forEach((checkbox, index) => {
    let label = document.querySelector(`.nameContact[for=myCheckbox_${index}]`);
    if (checkbox.checked && label) {
      assigned.push(label.textContent);
    }
  });

  let selectedPriority = document.querySelector(".priorityUrgent-active, .priorityMedium-active, .priorityLow-active");
  let priorityContent = selectedPriority ? selectedPriority.innerHTML : "";
  let selectedPriorityID = ""; // Initialize selectedPriorityID variable
  title.unshift(titleValue);

  if (selectedPriority) {
    selectedPriorityID = selectedPriority.id; // Get the ID of the selected priority
  }

  priorityContentArray.unshift(priorityContent); // Store the priorityContent in the array
  currentId++;

  // Erstelle einen neuen Task mit einer leeren subtasks-Liste
  let newTask = {
    id: currentId,
    title: titleValue,
    description: descriptionValue,
    dueDate: dueDateValue,
    assigned: assigned,
    priorityContent: priorityContent,
    priorityID: selectedPriorityID,
    subtasks: subtasks.slice(),
  };

  subT.unshift(subtasks.slice()); // Store a copy of subtasks in subT
  tasks.unshift(newTask); // Store the task object in the tasks array

  localStorage.setItem("selectedPriorityContent", priorityContent);
  document.getElementById("categorySelect").textContent = "Select a task category";
  subtasks = []; // Reset subtasks array to empty
  save();

  renderTask();
  clearContactAvatar();
  changeColour(selectedPriorityID);
  clearPrioActiveClass();
  taskSuccess();
  updateSubtasksDisplay();
  clearAllSelections();
  // saveTasksUser();
}

function clearTask() {
  subtasks = [];

  // Clear input values in render function
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("dueDate").value = "";
  document.getElementById("inputSubtasks").value = "";

  removeBorderColorAndHideIndicator("titleFieldRequired");
  removeBorderColorAndHideIndicator("descriptionFieldRequired");
  removeBorderColorAndHideIndicator("dueDateFieldRequired");

  let allSubtasksDiv = document.getElementById("allSubtasks");
  allSubtasksDiv.innerHTML = "";
  document.getElementById("taskCategory").value = "";

  clearContactAvatar();
  clearAllSelections();
  clearPrioActiveClass();
  clearTaskCategory();
}

function save() {
  localStorage.setItem("currentId", JSON.stringify(currentId));
  localStorage.setItem("title", JSON.stringify(title));
  localStorage.setItem("description", JSON.stringify(description));
  localStorage.setItem("assigned", JSON.stringify(assigned));
  localStorage.setItem("dueDate", JSON.stringify(dueDate));
  localStorage.setItem("priorityContentArray", JSON.stringify(priorityContentArray));
  localStorage.setItem("subtasks", JSON.stringify(subtasks));
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Store tasks array in localStorage
  localStorage.setItem("category", JSON.stringify(category));
  localStorage.setItem("subT", JSON.stringify(subT));
}

function load() {
  let idAsText = localStorage.getItem("currentId");
  let titleAsText = localStorage.getItem("title");
  let descriptionAsText = localStorage.getItem("description");
  let assignedAsText = localStorage.getItem("assigned");
  let dueDateAsText = localStorage.getItem("dueDate");
  let priorityContentArrayText = localStorage.getItem("priorityContentArray");
  let subtaskAsText = localStorage.getItem("subtasks");
  let tasksAsText = localStorage.getItem("tasks");
  let categoryAsText = localStorage.getItem("category");
  let subTAsText = localStorage.getItem("subT");

  if (idAsText && titleAsText && descriptionAsText && assignedAsText && dueDateAsText && priorityContentArrayText && subtaskAsText && subTAsText && categoryAsText) {
    currentId = JSON.parse(idAsText);
    title = JSON.parse(titleAsText);
    description = JSON.parse(descriptionAsText);
    assigned = JSON.parse(assignedAsText);
    dueDate = JSON.parse(dueDateAsText);
    priorityContentArray = JSON.parse(priorityContentArrayText);
    subtasks = JSON.parse(subtaskAsText);
    tasks = JSON.parse(tasksAsText) || []; // Load tasks array or initialize as empty array
    subT = JSON.parse(subTAsText) || [];
    category = JSON.parse(categoryAsText) || [];
  }
}

//assigned to

function hideAssigned(event) {
  if (event.target.id !== "assigned") {
    let list = document.getElementById("listContact");
    let arrow = document.getElementById("arrowAssigned");
    let arrowDrop = document.getElementById("arrow_drop_downHoverAssigned");

    list.classList.toggle("hide");
    arrow.classList.toggle("rotate");
    arrowDrop.classList.toggle("rotate");
  }
  displayAvatar(selectedContacts, contacts, colors);
}

//priority

function clearPrioActiveClass() {
  removePrioActiveClass("priorityUrgent"); // Replace 'priorityUrgent' with the desired ID
  removePrioActiveClass("priorityMedium"); // Replace 'priorityMedium' with the desired ID
  removePrioActiveClass("priorityLow"); // Replace 'priorityLow' with the desired ID
  removeImgPrioActive("priorityUrgent");
  removeImgPrioActive("priorityMedium");
  removeImgPrioActive("priorityLow");
}

function changeColour(divID) {
  const selected = document.getElementById(divID);
  if (!selected) return; // Exit function if element with given ID is not found

  const urgent = document.getElementById("priorityUrgent");
  const medium = document.getElementById("priorityMedium");
  const low = document.getElementById("priorityLow");
  let priorities = [urgent, medium, low];
  for (let i = 0; i < priorities.length; i++) {
    let prio = priorities[i];
    if (prio && prio !== selected) {
      prio.classList.remove(`${prio.id}-active`);
      let imgPaths = document.querySelectorAll(`.img-${prio.id}`);
      imgPaths.forEach((path) => {
        path.classList.remove("imgPrio-active");
      });
    }
  }
  selected.classList.toggle(`${divID}-active`);
  let selectedImgPaths = document.querySelectorAll(`.img-${divID}`);
  selectedImgPaths.forEach((path) => {
    path.classList.toggle("imgPrio-active");
  });
}

function removePrioActiveClass(divID) {
  const prio = document.getElementById(divID);
  if (prio) {
    prio.classList.remove(`${divID}-active`);
  }
}

function removeImgPrioActive(divID) {
  const imgPaths = document.querySelectorAll(`.img-${divID}`);
  imgPaths.forEach((path) => {
    path.classList.remove("imgPrio-active");
  });
}

//category
function clearTaskCategory() {
  document.getElementById("categorySelect").textContent = "Select a task category";
}

function selectCategory(clickedElement) {
  let selectText = clickedElement.querySelector("p").getAttribute("value");
  let taskCategory = document.getElementById("taskCategory");

  if (selectText !== "Select a task category") {
    category.unshift(selectText);
    category.push(categorySelect);
    save(); // Save the updated category array to localStorage

    // Update the text content of the taskCategory element
    taskCategory.querySelector("p").textContent = selectText;
  }
}

function hide(event) {
  if (event.target.id !== "inputSubtasks") {
    let list = document.getElementById("list");
    let arrow = document.getElementById("arrow");
    let arrow_drop_downHover = document.getElementById("arrow_drop_downHover");

    list.classList.toggle("hide");
    arrow.classList.toggle("rotate");
    arrow_drop_downHover.classList.toggle("rotate");
  }
}

//subtasks

function addSubtasks() {
  const subtaskInput = document.getElementById("inputSubtasks").value;
  document.getElementById("inputSubtasks").value = "";
  subtasks.unshift(subtaskInput);

  updateSubtasksDisplay();
  save();
  hideVectorAndImgCheck();
  handleCheckClick();
}

function updateSubtasksDisplay() {
  const allSubtasksDiv = document.getElementById("allSubtasks");

  allSubtasksDiv.innerHTML = "";

  if (subtasks.length === 0) {
    //brauche ich das??
  } else {
    subtasks.forEach((subtask, index) => {
      const subtaskItemDiv = createSubtaskItem(subtask);
      const iconsContainer = createIconsContainer(subtaskItemDiv, subtask, index);

      subtaskItemDiv.appendChild(iconsContainer);
      allSubtasksDiv.appendChild(subtaskItemDiv);
    });
  }
}

function createSubtaskItem(subtaskText) {
  const subtaskItemDiv = document.createElement("div");
  subtaskItemDiv.classList.add("subtaskItem");

  const subtaskItemText = document.createElement("li");
  subtaskItemText.innerText = subtaskText;
  subtaskItemDiv.appendChild(subtaskItemText);

  return subtaskItemDiv;
}

function createIconsContainer(subtaskItemDiv, subtaskText, index) {
  const iconsContainer = document.createElement("div");
  iconsContainer.classList.add("iconsContainer");

  const editImg = createImage("./assets/img/edit_task.png", "edit");
  iconsContainer.appendChild(editImg);

  const vector = createImage("./assets/img/vector.png", "vector");
  iconsContainer.appendChild(vector);

  const deleteImg = createImage("./assets/img/delete_contacts.png", "delete");
  iconsContainer.appendChild(deleteImg);
  deleteImg.addEventListener("click", () => handleDeleteClick(subtaskItemDiv, index));

  editImg.addEventListener("click", () => handleEditClick(subtaskItemDiv, subtaskText));
  return iconsContainer;
}

function createImage(src, className) {
  const img = document.createElement("img");
  img.classList.add(className);
  img.src = src;
  return img;
}

function createIconsContainerWhenEdit(subtaskItemDiv, subtaskText, index) {
  const iconsContainerWhenEdit = document.createElement("div");
  iconsContainerWhenEdit.classList.add("iconsContainer");

  const deleteImg = createImage("./assets/img/delete_contacts.png", "delete");
  deleteImg.classList.add("delete");
  iconsContainerWhenEdit.appendChild(deleteImg);
  deleteImg.addEventListener("click", () => handleDeleteClick(subtaskItemDiv, index));

  const vector = createImage("./assets/img/vector.png", "vector");
  iconsContainerWhenEdit.appendChild(vector);

  const check = createImage("./assets/img/done.png", "subtaskCheck");
  check.classList.add("subtasksCheck");
  iconsContainerWhenEdit.appendChild(check);

  check.addEventListener("click", () => handleCheckClick(subtaskItemDiv, iconsContainerWhenEdit, subtaskText));

  return iconsContainerWhenEdit;
}

function handleDeleteClick(subtaskItemDiv, index) {
  subtasks.splice(index, 1);
  subtaskItemDiv.remove();
  save();
}

function handleEditClick(subtaskItemDiv, subtaskText) {
  if (!subtaskItemDiv || !subtaskText) {
    return;
  }

  const subtaskItemText = subtaskItemDiv.querySelector("li");

  if (subtaskItemText) {
    const currentText = subtaskItemText.innerText;

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = currentText;
    editInput.style.outline = "none";
    editInput.style.border = "none";

    subtaskItemDiv.replaceChild(editInput, subtaskItemText);

    subtaskItemDiv.style.backgroundColor = "white";

    editInput.focus();

    editInput.addEventListener("blur", function () {
      let newText = editInput.value.trim();

      if (newText !== "") {
        subtaskItemText.innerText = newText;
        subtasks[subtasks.indexOf(subtaskText)] = newText;
        save();
      } else {
        editInput.value = currentText;
      }
    });

    editInput.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        editInput.blur();
      }
    });

    const iconsContainer = createIconsContainerWhenEdit(subtaskItemDiv, subtaskText, subtasks.indexOf(subtaskText));
    subtaskItemDiv.replaceChild(iconsContainer, subtaskItemDiv.lastChild); // Replace iconsContainerWhenEdit with regular iconsContainer
  }
}

function handleCheckClick(subtaskItemDiv, iconsContainer, subtaskText) {
  if (!subtaskItemDiv || !iconsContainer || !subtaskText) {
    return;
  }

  const editInput = subtaskItemDiv.querySelector("input"); // Find the existing input element

  if (editInput) {
    const newText = editInput.value.trim(); // Get the edited text from the input

    if (newText !== "") {
      const updatedSubtaskText = document.createElement("li"); // Create a new <li> element
      updatedSubtaskText.innerText = newText;

      subtasks[subtasks.indexOf(subtaskText)] = newText; // Update the subtasks array
      save();

      // Create a new icons container
      const newIconsContainer = createIconsContainer(subtaskItemDiv, newText, subtasks.indexOf(newText));

      // Replace the input and icons container with the updated <li> and icons
      subtaskItemDiv.innerHTML = "";
      subtaskItemDiv.appendChild(updatedSubtaskText);
      subtaskItemDiv.appendChild(newIconsContainer);
    }
  }

  subtaskItemDiv.style.backgroundColor = "";
}

function hideVectorAndImgCheck() {
  let vectorAndImgCheck = document.getElementById("vectorAndImgCheck");
  let imgPlus = document.getElementById("addSubtasksPlus");
  let imgPlusContainer = document.getElementById("imgPlusContainer");
  if (vectorAndImgCheck && imgPlus) {
    vectorAndImgCheck.classList.toggle("d-none");
    imgPlus.classList.toggle("d-none");
    imgPlusContainer.classList.toggle("d-none");
  }
}

//task_success

async function handleTaskClick(event) {
  // Prevent the default behavior of the anchor tag
  event.preventDefault();

  // Call addTask function which triggers taskSuccess
  await addTask(); // Hier await hinzugefügt

  // Redirect to the board page after a delay (e.g., 1500 milliseconds)
  setTimeout(async function () {
    await renderBoardHTML(); // Hier await hinzugefügt
  }, 1500);
}

async function renderBoardHTML() {
  document.getElementById("contentJoin").innerHTML = await generateBoardHTML();
  await boardInit();
  window.location.href = "./board.html";
}

function taskSuccess() {
  const success = document.getElementById("task_succes");
  success.classList.remove("d-none");

  setTimeout(function () {
    document.getElementById("task_succes").classList.add("d-none");
  }, 1500);
}

//required inputs

function handleInput(inputElement) {
  const elementId = inputElement.id;
  if (elementId === "title") {
    removeBorderColorAndHideIndicator("titleFieldRequired");
  } else if (elementId === "description") {
    removeBorderColorAndHideIndicator("descriptionFieldRequired");
  } else if (elementId === "dueDate") {
    removeBorderColorAndHideIndicator("dueDateFieldRequired");
  }
}

function removeBorderColorAndHideIndicator(fieldId) {
  const fieldIndicator = document.getElementById(fieldId);

  // Remove border color and hide the respective field indicator
  const frameSelector = getFrameSelector(fieldId);
  const frame = document.querySelector(frameSelector);

  if (frame) {
    frame.style.border = ""; // Remove border color
  }

  if (fieldIndicator) {
    fieldIndicator.style.display = "none"; // Hide the specified field indicator
  }
}

function getFrameSelector(fieldId) {
  switch (fieldId) {
    case "titleFieldRequired":
      return ".title_frame14";
    case "descriptionFieldRequired":
      return ".frame17";
    case "dueDateFieldRequired":
      return ".dueDate_frame14";
    default:
      return "";
  }
}

//hide the specific indicator
function hideFieldIndicator(selector) {
  const fieldIndicator = document.querySelector(selector);
  if (fieldIndicator) {
    fieldIndicator.style.display = "none";
  }
}

function required(element) {
  if (element.classList.contains("frame211")) {
    changeBorderColorAndDisplayField(".dueDate_frame14", "#dueDateFieldRequired");
    hideFieldIndicatorsExcept("#dueDateFieldRequired");
  } else if (element.classList.contains("frame203")) {
    changeBorderColorAndDisplayField(".title_frame14", "#titleFieldRequired");
    hideFieldIndicatorsExcept("#titleFieldRequired");
  } else if (element.classList.contains("frame207")) {
    changeBorderColorAndDisplayField(".frame17", "#descriptionFieldRequired");
    hideFieldIndicatorsExcept("#descriptionFieldRequired");
  }
}

function changeBorderColorAndDisplayField(frameSelector, fieldIndicatorSelector) {
  const frame = document.querySelector(frameSelector);
  const fieldIndicator = document.querySelector(fieldIndicatorSelector);

  if (frame) {
    frame.style.border = "1px solid #FF8190"; // Change border color
  }

  if (fieldIndicator) {
    fieldIndicator.style.display = "block"; // Show the specified field indicator
  }
}

// Hide all field indicators except the specified one
function hideFieldIndicatorsExcept(exceptSelector) {
  const allIndicators = document.querySelectorAll("#titleFieldRequired, #descriptionFieldRequired, #dueDateFieldRequired");
  allIndicators.forEach((indicator) => {
    if (indicator !== document.querySelector(exceptSelector)) {
      indicator.style.display = "none";
    }
  });
}
