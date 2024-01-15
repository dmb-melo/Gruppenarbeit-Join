let title = []; 
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
let taskStatus = [];
let selectedPriorityContent = "";


function addTaskInit() {
  load();
  selectedPriorityContent = localStorage.getItem("selectedPriorityContent");
  renderTask();
}

function renderTask() {
  let contactsList = document.getElementById("contactList");
  contactsList.innerHTML = "";
  sortContacts();
  for (let i = 0; i < contacts.length; i++) {
    renderContactsAddTask(i, contactsList);
  }
  document.getElementById("searchContacts").addEventListener("keyup", handleContactSearch);
  changeColour('priorityMedium');
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
  let firstname = name.split(" ")[0][0].toUpperCase();
  let surname = name.split(" ")[1][0].toUpperCase(); 
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
  if (!selectedContacts.includes(i)) {
    selectedContacts.push(i);
  }
  displayAvatar(selectedContacts, contacts, colors);
  liElement.classList.add("contactListSelected");
  nameElement.classList.add("nameContactWhite");
  labelElement.style.setProperty("background-image", "url('')");
}

function contactNotChecked(i, liElement, nameElement, labelElement) {
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

function displayAvatar(selectedContacts, contacts, colors) {
  let contactAvatar = document.getElementById("contactAvatar");
  contactAvatar.innerHTML = ""; 
  for (let i = 0; i < selectedContacts.length; i++) {
    let selectedIndex = selectedContacts[i];
    let contact = contacts[selectedIndex];
    let name = contact[0];
    let firstname = name.split(" ")[0][0].toUpperCase();
    let surname = name.split(" ")[1][0].toUpperCase();
    let currentContactContent = generateAvatarAddTask(selectedIndex, contact, firstname, surname);
    contactAvatar.innerHTML += currentContactContent;
  }
}

function clearContactAvatar() {
  let contactAvatar = document.getElementById("contactAvatar");
  contactAvatar.innerHTML = ""; 
}

function clearAllSelections() {
  const checkboxes = document.querySelectorAll(".inputCheckBox");
  const labels = document.querySelectorAll(".nameContact");
  checkboxes.forEach((checkbox, index) => {
    checkbox.checked = false;
    const liElement = checkbox.closest("li");
    if (liElement) {
      liElement.classList.remove("contactListSelected");
    }
    labels[index].classList.remove("nameContactWhite");
    labels[index].style.setProperty("background-image", "none");
  });
}
 
function addTask(){
  switchColorpriorityContent();
 
    let titleValue = document.getElementById("title").value;
    document.getElementById("title").value = "";
    title.unshift(titleValue);
    let descriptionValue = document.getElementById("description").value;
    document.getElementById("description").value = "";
    description.unshift(descriptionValue);
    let dueDateValue = document.getElementById("dueDate").value;
    document.getElementById("dueDate").value = "";
    dueDate.unshift(dueDateValue);

    checkboxAddTask();

    let selectedPriority = document.querySelector(".priorityUrgent-active, .priorityMedium-active, .priorityLow-active");
    let priorityContent = selectedPriority ? selectedPriority.innerHTML : "";
    let selectedPriorityID = "";
        if (selectedPriority) {
            selectedPriorityID = selectedPriority.id;
            
        }

    let categoryElement = document.getElementById("taskCategory");
    let categoryValue = categoryElement ? categoryElement.textContent : "Select a task category";
  
    if (!checkRequiredFields(titleValue, dueDateValue, categoryValue)) {
      return; 
    }

    priorityContentArray.unshift(priorityContent);

    currentId++;
   let newTask = {
        id: currentId,
        title: titleValue,
        description: descriptionValue,
        dueDate: dueDateValue,
        assigned: assigned,
        priorityContent: priorityContent,
        priorityID: selectedPriorityID,
        subtasks: subtasks.slice(),
        taskStatus :'todo',
        category: category
    };  
   
    subT.unshift(subtasks.slice()); 
    tasks.unshift(newTask); 
    localStorage.setItem("selectedPriorityContent", priorityContent);

  document.getElementById("categorySelect").textContent = "Select a task category";
    subtasks = []; 
    
    save();
    renderTask();
    clearContactAvatar();
    clearPrioActiveClass();
    taskSuccess();
    updateSubtasksDisplay();
    clearAllSelections();
    resetPriorityTextColors();
    
    category = [];
    selectedContacts = [];
   
}

function switchColorpriorityContent() {
  let selectedPriority = document.querySelector(".priorityUrgent-active, .priorityMedium-active, .priorityLow-active");
 
  if (selectedPriority) {
    priorityID = selectedPriority.id;
  }
  if (priorityID === "priorityUrgent") {
  document.getElementById('textUrgent').style.color = "black";
  }
  if (priorityID === "priorityMedium") {
    document.getElementById('textMedium').style.color = "black";
  }
  if (priorityID === "priorityLow") {
  document.getElementById('textLow').style.color = "black";
  }
}


function checkboxAddTask(){
    let checkboxes = document.querySelectorAll(".inputCheckBox");
    assigned = []; 
    checkboxes.forEach((checkbox, index) => {
    let label = document.querySelector(`.nameContact[for=myCheckbox_${index}]`);
    if (checkbox.checked && label) {
      assigned.push(label.textContent);
    }
  });
}

function clearTask() {
  subtasks = [];
  selectedContacts = [];
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("dueDate").value = "";
  document.getElementById("inputSubtasks").value = "";
  removeBorderColorAndHideIndicator("titleFieldRequired");
  removeBorderColorAndHideIndicator("dueDateFieldRequired");
  let categoryFrame74 = document.getElementById("categoryFrame_74");
  categoryFrame74.style.border = ""; 
  let allSubtasksDiv = document.getElementById("allSubtasks");
  allSubtasksDiv.innerHTML = "";
  document.getElementById("taskCategory").value = "";
  clearContactAvatar();
  clearAllSelections();
  clearPrioActiveClass();
  clearTaskCategory();
  resetPriorityTextColors();  
}

function save() {
  localStorage.setItem("taskStatus", JSON.stringify(taskStatus));
  localStorage.setItem("currentId", JSON.stringify(currentId));
  localStorage.setItem("title", JSON.stringify(title));
  localStorage.setItem("description", JSON.stringify(description));
  localStorage.setItem("assigned", JSON.stringify(assigned));
  localStorage.setItem("dueDate", JSON.stringify(dueDate));
  localStorage.setItem("priorityContentArray", JSON.stringify(priorityContentArray));
  localStorage.setItem("subtasks", JSON.stringify(subtasks));
  localStorage.setItem("tasks", JSON.stringify(tasks)); 
  localStorage.setItem("category", JSON.stringify(category));
  localStorage.setItem("subT", JSON.stringify(subT));
}

function load() {
  let taskStautsAsText = localStorage.getItem("taskStatus");
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

  if (taskStautsAsText && idAsText && titleAsText && descriptionAsText && assignedAsText && dueDateAsText && priorityContentArrayText && subtaskAsText && subTAsText && categoryAsText) {
    taskStatus = JSON.parse(taskStautsAsText);
    currentId = JSON.parse(idAsText);
    title = JSON.parse(titleAsText);
    description = JSON.parse(descriptionAsText);
    assigned = JSON.parse(assignedAsText);
    dueDate = JSON.parse(dueDateAsText);
    priorityContentArray = JSON.parse(priorityContentArrayText);
    subtasks = JSON.parse(subtaskAsText);
    tasks = JSON.parse(tasksAsText) || [];
    subT = JSON.parse(subTAsText) || [];
    category = JSON.parse(categoryAsText) || [];
  }
}

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

function clearPrioActiveClass() {
  removePrioActiveClass("priorityUrgent"); 
  removePrioActiveClass("priorityMedium"); 
  removePrioActiveClass("priorityLow"); 
  removeImgPrioActive("priorityUrgent");
  removeImgPrioActive("priorityMedium");
  removeImgPrioActive("priorityLow");
}

function changeColour(divID) {
  const selected = document.getElementById(divID);
  if (!selected) return;

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

      // Reset text color to default (black) only if it exists
      let textElement = prio.querySelector(`.text${prio.id.slice(8)}`);
      if (textElement) {
        textElement.style.color = "";
      }
    }
  }

  // Toggle active class for the selected priority
  selected.classList.toggle(`${divID}-active`);
  let selectedImgPaths = document.querySelectorAll(`.img-${divID}`);
  selectedImgPaths.forEach((path) => {
    path.classList.toggle("imgPrio-active");
  });

  // Set text color to white for the selected priority
  let selectedTextElement = selected.querySelector(`.text${divID.slice(8)}`);
  if (selectedTextElement) {
    const isCurrentlyActive = selected.classList.contains(`${divID}-active`);
    const previousActivePriority = priorities.find((prio) => prio.classList.contains(`${prio.id}-active`));

    // Check if the previous active priority is different from the current one
    if (previousActivePriority && previousActivePriority !== selected) {
      let previousTextElement = previousActivePriority.querySelector(`.text${previousActivePriority.id.slice(8)}`);
      if (previousTextElement) {
        previousTextElement.style.color = ""; // Reset text color to default (black)
      }
    }
    selectedTextElement.style.color = isCurrentlyActive ? "white" : "";
  }
}

function removePriorityStyles(prio) {
  prio.classList.remove(`${prio.id}-active`);
  toggleImgPrioActive(prio.id);

  const textElement = prio.querySelector(`.text${prio.id.slice(8)}`);
  if (textElement) {
    textElement.removeAttribute('style');
  }
}

function toggleImgPrioActive(divID) {
  const imgPaths = document.querySelectorAll(`.img-${divID}`);
  imgPaths.forEach(path => {
    path.classList.toggle("imgPrio-active");
  });
}

function updateTextElementColor(textElement, isCurrentlyActive) {
  textElement.style.color = isCurrentlyActive ? "white" : "";
}

function resetPriorityTextColors() {
  const urgent = document.getElementById("priorityUrgent");
  const medium = document.getElementById("priorityMedium");
  const low = document.getElementById("priorityLow");

  resetTextColor(urgent);
  resetTextColor(medium);
  resetTextColor(low);
}

function resetTextColor(prio) {
  if (prio) {
    let textElement = prio.querySelector(`.text${prio.id.slice(8)}`);
    if (textElement) {
      textElement.style.color = "";
    }
  }
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

function clearTaskCategory() {
  document.getElementById("categorySelect").textContent = "Select a task category";
}

function selectCategory(clickedElement) {
  let selectText = clickedElement.querySelector("p").getAttribute("value");
  let taskCategory = document.getElementById("taskCategory");
  let categoryFrame74 = document.getElementById("categoryFrame_74");
  categoryFrame74.style.border = ""; 
  if (selectText !== "Select a task category") {
    category = [];
    category.unshift(selectText);
    category.push(categorySelect);
    save(); 
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

function addSubtasks() {
  const subtaskInput = document.getElementById("inputSubtasks").value;
  document.getElementById("inputSubtasks").value = "";
  subtasks.unshift(subtaskInput);
  console.log(subtaskInput);
  updateSubtasksDisplay();
  save();
  hideVectorAndImgCheck();
}

function updateSubtasksDisplay() {
  const allSubtasksDiv = document.getElementById("allSubtasks");
  allSubtasksDiv.innerHTML = "";
  if (subtasks.length === 0) {
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
  subtaskItemDiv.addEventListener("dblclick", function () {
    handleEditClick(subtaskItemDiv, subtaskText);
  });
  return subtaskItemDiv; 
}

function createIconsContainer(subtaskItemDiv, subtaskText, index){
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

function handleCheckClick(subtaskItemDiv, iconsContainer, subtaskText) {
  if (!subtaskItemDiv || !iconsContainer || !subtaskText) {
    return;
  }
  const editInput = subtaskItemDiv.querySelector("input");
  if (editInput) {
    const newText = editInput.value.trim(); 
    if (newText !== "") {
      const updatedSubtaskText = document.createElement("li");
      updatedSubtaskText.innerText = newText;
      subtasks[subtasks.indexOf(subtaskText)] = newText; 
      save();
      const newIconsContainer = createIconsContainer(subtaskItemDiv, newText, subtasks.indexOf(newText));
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

async function handleTaskClick(event) {
  if (event) {
    event.preventDefault();
  }
  let titleValue = document.getElementById("title").value;
  let categoryValue = document.getElementById("categorySelect").textContent;
  let dueDateValue = document.getElementById("dueDate").value;
  if (!checkRequiredFields(titleValue, dueDateValue, categoryValue)) {
    return 
  }
  await addTask();
  setTimeout(async function () {
    await renderBoardHTML(); 
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

function handleInput(inputElement) {
  const elementId = inputElement.id;
  if (elementId === "title") {
    removeBorderColorAndHideIndicator("titleFieldRequired");
  } else if (elementId === "taskCategory") {
    removeBorderColorAndHideIndicator("taskCategory");
  } else if (elementId === "dueDate") {
    removeBorderColorAndHideIndicator("dueDateFieldRequired");
  }
}

function checkRequiredFields(titleValue, dueDateValue, categoryValue) {
  if (!titleValue || !titleValue.trim()) {
    changeBorderColorAndDisplayField(".title_frame14", "#titleFieldRequired");
    hideFieldIndicatorsExcept("#titleFieldRequired");
    return false;
  }
  if (!dueDateValue || !dueDateValue.trim()) {
    changeBorderColorAndDisplayField(".dueDate_frame14", "#dueDateFieldRequired");
    hideFieldIndicatorsExcept("#dueDateFieldRequired");
    return false;
  }
  if (!categoryValue || !categoryValue.trim() || categoryValue === "Select a task category") {
    changeBorderColorAndDisplayField(".categoryFrame_74");
    return false;
  }
  return true;
}

function removeBorderColorAndHideIndicator(fieldId) {
  const fieldIndicator = document.getElementById(fieldId);
  const frameSelector = getFrameSelector(fieldId);
  if (frameSelector) {
    const frame = document.querySelector(frameSelector);
    if (frame) {
      frame.style.border = ""; 
    }
  }
  if (fieldIndicator) {
    fieldIndicator.style.display = "none"; 
  }
}

function getFrameSelector(fieldId) {
  switch (fieldId) {
    case "titleFieldRequired":
      return ".title_frame14";
    case "dueDateFieldRequired":
      return ".dueDate_frame14";
    default:
      return "";
  }
}

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
  }
  else if (element.classList.contains("categoryFrame_74")) {
    changeBorderColorAndDisplayField(".categoryFrame_74");
  }
}

function changeBorderColorAndDisplayField(frameSelector, fieldIndicatorSelector) {
  const frame = document.querySelector(frameSelector);
  const fieldIndicator = document.querySelector(fieldIndicatorSelector);
  if (frame) {
    frame.style.border = "1px solid #FF8190"; 
  }
  if (fieldIndicator) {
    fieldIndicator.style.display = "block";
  }
}

function hideFieldIndicatorsExcept(exceptSelector) {
  const allIndicators = document.querySelectorAll("#titleFieldRequired, #dueDateFieldRequired");
  allIndicators.forEach((indicator) => {
    if (indicator !== document.querySelector(exceptSelector)) {
      indicator.style.display = "none";
    }
  });
}


