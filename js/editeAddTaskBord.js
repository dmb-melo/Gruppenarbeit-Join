let selecetContactsEdit = [];
let assignedMenuOpen = false;
let oldAssigned = [];

function editLargCard(taskId) {
  let editCard = document.getElementById("desingLagrCard");
  editCard.style.display = "flex";
  editCard.style.alignItems = "center";
  editCard.style.height = "80%";
  document.getElementById("largesCard").classList.add("d-None");
  document.getElementById("addTaskLargeCard").innerHTML = "";
  document.getElementById("addTaskLargeCard").innerHTML = generateAddEditeTask(taskId);
  document.getElementById("addTaskLargeCard").style.display = "block";
  document.getElementById("addTaskLargeCard").style.width = "525px";
  document.getElementById("addTaskLargeCard").style.overflow = "scroll";
  edittaskArea(taskId);
  renderEditTask();
  saveUneditedAssigned(taskId);
}

function findTaskById(taskId) {
  const foundTask = tasks.find((task) => task.id === taskId);
  return foundTask;
}

function activatePriority(priorityID) {
  const priorityElement = document.getElementById(priorityID);
  if (priorityElement) {
    priorityElement.classList.add(`${priorityID}-active`);

    let imgPaths = document.querySelectorAll(`.img-${priorityID}`);
    imgPaths.forEach((path) => {
      path.classList.add("imgPrio-active");
    });
  }
}

function edittaskArea(taskId) {
  const foundTask = findTaskById(taskId);

  document.getElementById("editTitle").value = foundTask.title;
  document.getElementById("editDescription").value = foundTask.description;
  document.getElementById("editDueDate").value = foundTask.dueDate;

  activatePriority(foundTask.priorityID);

  displayAssignedContacts(foundTask.assigned);

  displaySubtasks(foundTask.subtasks);
}

function displayAssignedContacts(assignedContacts) {
  const contactsLargeCard = document.getElementById("editAssignedContacts");

  assignedContacts.forEach((contact, index) => {
    const name = contact.split(" ");
    const firstnameInitial = name[0].charAt(0).toUpperCase();
    const surnameInitial = name[1] ? name[1].charAt(0).toUpperCase() : "";

    const newContactElement = document.createElement("div");
    newContactElement.classList.add("boardLargContactsAvatar");
    newContactElement.innerHTML = /*html*/ `
      <div class="circle" id="circle-${index}" style="background-color: ${colors[index]}">
        <p class="nameIdList" id="name-id">${firstnameInitial}${surnameInitial}</p>
      </div>
    `;

    contactsLargeCard.appendChild(newContactElement);
  });
}

function displaySubtasks(subtasks) {
  const subtasksElement = document.getElementById("editSubtasks");

  subtasksElement.innerHTML = "";

  subtasks.forEach((subtask) => {
    const subtaskElement = document.createElement("div");
    subtaskElement.classList.add("subtaskItem");
    subtaskElement.textContent = subtask;
    subtasksElement.appendChild(subtaskElement);
  });
}

function saveEditTaskBoard(taskId) {
  const foundTask = findTaskById(taskId);
  let status = getStatusTaskId(taskId);
  let prio = getPrioTaskId(taskId);
  let selectedPriorityBoard = document.querySelector(".priorityUrgent-active, .priorityMedium-active, .priorityLow-active");
  let priorityContentBoard = selectedPriorityBoard ? selectedPriorityBoard.innerHTML : "";
  let selectedPriorityIDBoard = "";
  let category = defineCategory(taskId);
  if (selectedPriorityBoard) {
    selectedPriorityIDBoard = selectedPriorityBoard.id;
  }
  checkboxAddTaskEdit();
  priorityContentArray.unshift(priorityContentBoard);
  if (!assigned.length) {
    assigned.unshift(oldAssigned);
  }
  if (foundTask) {
    const editedTask = {
      id: taskId,
      title: document.getElementById("editTitle").value,
      description: document.getElementById("editDescription").value,
      dueDate: document.getElementById("editDueDate").value,
      taskStatus: status,
      priorityContent: priorityContentBoard,
      priorityID: selectedPriorityIDBoard,
      assigned: assigned,
      category: category,
      subtasks: subtasks.slice(),
    };
    tasks = tasks.map((task) => (task.id === taskId ? editedTask : task));

    save();
  } else {
    console.error("Task with ID " + taskId + " not found.");
  }
  localStorage.setItem("selectedPriorityContent", priorityContentBoard);
  load();
  updateHtml();
  renderSmallContats();
  closeCard();
  assignedMenuOpen = false;
}

function defineAssigned(taskId) {
  let index = validateIndexFromTask(taskId);
  let assigned = tasks[index]["assigned"];
  return assigned;
}

function defineCategory(taskId) {
  let index = validateIndexFromTask(taskId);
  let category = tasks[index]["category"];
  return category;
}

function addSubtasksEdit() {
  const subtaskInput = document.getElementById("inputSubtasksEdit").value;
  document.getElementById("inputSubtasksEdit").value = "";
  subtasks.unshift(subtaskInput);
  console.log(subtasks);
  updateSubtasksDisplayEdit();
  save();
}
function updateSubtasksDisplayEdit() {
  const allSubtasksDiv = document.getElementById("editSubtasks");

  allSubtasksDiv.innerHTML = "";

  if (subtasks.length === 0) {
    //brauche ich das??
    allSubtasksDiv.innerHTML = "No subtasks available.";
  } else {
    subtasks.forEach((subtask, index) => {
      const subtaskItemDiv = createSubtaskItemEdit(subtask);
      const iconsContainer = createIconsContainer(subtaskItemDiv, subtask, index);
      subtaskItemDiv.appendChild(iconsContainer);
      allSubtasksDiv.appendChild(subtaskItemDiv);
    });
  }
}

function createSubtaskItemEdit(subtaskText) {
  const subtaskItemDiv = document.createElement("div");
  subtaskItemDiv.classList.add("subtaskItem");
  subtaskItemDiv.classList.add("hoverEditClass");

  const subtaskItemText = document.createElement("li");
  subtaskItemText.innerText = subtaskText;
  subtaskItemDiv.appendChild(subtaskItemText);

  return subtaskItemDiv;
}

function createIconsContainer(subtaskItemDiv, subtaskText, index) {
  const iconsContainer = document.createElement("div");
  iconsContainer.classList.add("iconsContainer");
  const editImg = createImage("./assets/img/edit_task.png", "editSubTask");
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
    subtaskItemDiv.replaceChild(iconsContainer, subtaskItemDiv.lastChild);
  }
}

function checkboxAddTaskEdit() {
  let checkboxes = document.querySelectorAll(".inputCheckBox");
  assigned = [];
  checkboxes.forEach((checkbox, index) => {
    let label = document.querySelector(`.nameContact[for=myCheckbox_Edit${index}]`);
    if (checkbox.checked && label) {
      assigned.push(label.textContent);
    }
  });
  console.log("Assigned Contacts:", assigned);
}

function getStatusTaskId(taskId) {
  for (let i = 0; i < tasks.length; i++) {
    let idOfTaskStatus = tasks[i]["id"];
    if (idOfTaskStatus === taskId) {
      return tasks[i]["taskStatus"];
    }
  }
}

function getPrioTaskId(taskId) {
  for (let i = 0; i < tasks.length; i++) {
    let idOfTaskPrio = tasks[i]["id"];
    if (idOfTaskPrio === taskId) {
      return tasks[i]["priorityID"];
    }
  }
}

function hideAssignedBoardEdit(event, taskId) {
  if (event.target.id !== "assignedBoard") {
    let list = document.getElementById("listContactEdit");
    let arrow = document.getElementById("arrowAssignedEdit");
    let arrowDrop = document.getElementById("arrow_drop_downHoverAssignedEdit");
    list.classList.toggle("hide");
    arrow.classList.toggle("rotate");
    arrowDrop.classList.toggle("rotate");
  }
  displayAvatarEditBoart(selecetContactsEdit, contacts, colors);
  if (!assignedMenuOpen) {
    validateAssignedContacts(taskId);
  }
  assignedMenuOpen = true;
}

function displayAvatarEditBoart(selecetContactsEdit, contacts, colors) {
  let contactAvatarEdit = document.getElementById("contactAvatarEditBoard");
  contactAvatarEdit.innerHTML = "";
  for (let i = 0; i < selecetContactsEdit.length; i++) {
    let selectedIndexBoar = selecetContactsEdit[i];
    let contact = contacts[selectedIndexBoar];
    let name = contact[0];
    let firstnameBoard = name.split(" ")[0][0].toUpperCase();
    let surnameBoard = name.split(" ")[1][0].toUpperCase();
    let currentContactContentBoard = generateAvatarAddTaskBoard(selectedIndexBoar, contact, firstnameBoard, surnameBoard);
    contactAvatarEdit.innerHTML += currentContactContentBoard;
  }
}

function contactCheckedEdit(i, liElementEdit, nameElementEdit, labelElementEdit) {
  if (!selecetContactsEdit.includes(i)) {
    selecetContactsEdit.push(i);
  }
  displayAvatarEditBoart(selecetContactsEdit, contacts, colors);
  liElementEdit.classList.add("contactListSelected");
  nameElementEdit.classList.add("nameContactWhite");
  labelElementEdit.style.setProperty("background-image", "url('')");
}

function contactNotCheckedEdit(i, liElementEdit, nameElementEdit, labelElementEdit) {
  let index = selecetContactsEdit.indexOf(i);
  if (index > -1) {
    selecetContactsEdit.splice(index, 1);
  }
  liElementEdit.classList.remove("contactListSelected");
  nameElementEdit.classList.remove("nameContactWhite");
  labelElementEdit.style.setProperty("background-image", "url('')");
}

function validationContactsCheckedEdit(i, liElementEdit, nameElementEdit, labelElementEdit, event) {
  if (event.target.checked) {
    contactCheckedEdit(i, liElementEdit, nameElementEdit, labelElementEdit);
  } else {
    contactNotCheckedEdit(i, liElementEdit, nameElementEdit, labelElementEdit);
  }
}

function renderContactsAddTaskBoard(i, contactsList) {
  let contact = contacts[i];
  let nameEdit = contact[0];
  let firstnameBoard = nameEdit.split(" ")[0][0].toUpperCase();
  let surnameBoard = nameEdit.split(" ")[1][0].toUpperCase();
  let contactElement = document.createElement("li");
  contactElement.classList.add("contactList");
  contactElement.innerHTML = generateContactsAddTaskBoard(nameEdit, firstnameBoard, surnameBoard, i);
  contactsList.appendChild(contactElement);
  addCheckboxChangeListener(i, contactsList);
}

function addCheckboxChangeListener(i, contactsList) {
  const liElementEdit = contactsList.getElementsByTagName("li")[i];
  const nameElementEdit = contactsList.getElementsByTagName("label")[i];
  const checkboxEdit = document.getElementById(`myCheckbox_Edit${i}`);

  checkboxEdit.addEventListener("change", function (event) {
    const labelElementEdit = document.querySelectorAll(".nameContact")[i];
    validationContactsCheckedEdit(i, liElementEdit, nameElementEdit, labelElementEdit, event);
  });
}

function sortContactsBoard() {
  contacts.sort((a, b) => {
    let nameA = a[0].toUpperCase();
    let nameB = b[0].toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
}
function renderEditTask() {
  let contactsList = document.getElementById("contactListBoard");
  contactsList.innerHTML = "";
  sortContacts();
  for (let i = 0; i < contacts.length; i++) {
    renderContactsAddTaskBoard(i, contactsList);
  }
  document.getElementById("searchContactsBoard").addEventListener("keyup", handleContactSearchEdit);
}

function handleContactSearchEdit() {
  let input = document.getElementById("searchContactsBoard");
  let filter = input.value.toUpperCase();
  let contacts = document.getElementsByClassName("contactListBoard");
  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    let nameElement = contact.getElementsByClassName("nameContact")[0];
    let txtValue = nameElement.textContent || nameElement.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      contact.style.display = "";
    } else {
      contact.style.display = "none";
    }
  }
}

function hideVectorAndImgCheckEdit() {
  let vectorAndImgCheck = document.getElementById("vectorAndImgCheckEdit");
  let imgPlus = document.getElementById("addSubtasksPlusEdit");
  let imgPlusContainer = document.getElementById("imgPlusContainerEdit");
  if (vectorAndImgCheck && imgPlus) {
    vectorAndImgCheck.classList.toggle("d-none");
    imgPlus.classList.toggle("d-none");
    imgPlusContainer.classList.toggle("d-none");
  }
}

function addSubtasksEdit() {
  const subtaskInput = document.getElementById("inputSubtasksEdit").value;
  document.getElementById("inputSubtasksEdit").value = "";
  subtasks.unshift(subtaskInput);
  console.log(subtaskInput);
  updateSubtasksDisplayEdit();
  save();
  hideVectorAndImgCheckEdit();
}

function validateAssignedContacts(taskId) {
  selecetContactsEdit = [];
  let index = validateIndexFromTask(taskId);
  let task = tasks[index];
  let assignedCardEdited = task["assigned"];
  for (let i = 0; i < assignedCardEdited.length; i++) {
    let contactCardEdited = assignedCardEdited[i];
    for (let c = 0; c < contacts.length; c++) {
      const contactFromArray = contacts[c][0];
      if (contactFromArray === contactCardEdited) {
        setCheckedToAssigned(c);
      }
    }
  }
}

function setCheckedToAssigned(c) {
  let contactsList = document.getElementById("contactListBoard");
  const liElement = contactsList.getElementsByTagName("li")[c];
  const nameElement = contactsList.getElementsByTagName("label")[c];
  const labelElement = document.querySelectorAll(".nameContact")[c];
  contactCheckedEdit(c, liElement, nameElement, labelElement);
  document.getElementById(`myCheckbox_Edit${c}`).checked = true;
}

function validateIndexFromTask(taskId) {
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    let id = task["id"];
    if (id === taskId) {
      return i;
    }
  }
}

function saveUneditedAssigned(taskId) {
  oldAssigned = [];
  let index = validateIndexFromTask(taskId);
  let task = tasks[index];
  let assignedArray = task["assigned"];
  debugger;
  for (let i = 0; i < assignedArray.lengt; i++) {
    let assigned = assignedArray[i];
    oldAssigned.push(assigned);
  }
  
}
