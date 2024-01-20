let title = [];
let description = [];
let assigned = [];
let selectedContacts = [];
let dueDate = [];
let prio = [];
let category = [];
let subtasks = [];
let subT = [];
let tasks = [
  {
    assigned: ["Anja Schulz", "Tatjana Wolf"],
    category: ["Technical Task"],
    description: "Define CSS naming conventions and structure...",
    dueDate: "2024-02-09",
    id: 1,
    priorityContent:
      '\n<div class="textUrgent" id="textUrgent" style="color: white;">Urgent</div>\n<svg class="img-priorityUrgentSize" xmlns="http://www.w3.org/2000/svg" width="21" height="16" viewBox="0 0 21 16">\n<g clip-path="url(#clip0_114904_5525)">\n<path class="img-priorityUrgent imgPrio-active" d="M19.6528 15.2547C19.4182 15.2551 19.1896 15.1803 19.0007 15.0412L10.7487 8.958L2.49663 15.0412C2.38078 15.1267 2.24919 15.1887 2.10939 15.2234C1.96959 15.2582 1.82431 15.2651 1.68184 15.2437C1.53937 15.2223 1.40251 15.1732 1.27906 15.099C1.15562 15.0247 1.04801 14.927 0.96238 14.8112C0.876751 14.6954 0.814779 14.5639 0.780002 14.4243C0.745226 14.2846 0.738325 14.1394 0.759696 13.997C0.802855 13.7095 0.958545 13.4509 1.19252 13.2781L10.0966 6.70761C10.2853 6.56802 10.5139 6.49268 10.7487 6.49268C10.9835 6.49268 11.212 6.56802 11.4007 6.70761L20.3048 13.2781C20.4908 13.415 20.6286 13.6071 20.6988 13.827C20.7689 14.0469 20.7678 14.2833 20.6955 14.5025C20.6232 14.7216 20.4834 14.9124 20.2962 15.0475C20.1089 15.1826 19.8837 15.2551 19.6528 15.2547Z" fill="#FF3D00"></path>\n<path class="img-priorityUrgent imgPrio-active" d="M19.6528 9.50568C19.4182 9.50609 19.1896 9.43124 19.0007 9.29214L10.7487 3.20898L2.49663 9.29214C2.26266 9.46495 1.96957 9.5378 1.68184 9.49468C1.39412 9.45155 1.13532 9.29597 0.962385 9.06218C0.789449 8.82838 0.716541 8.53551 0.7597 8.24799C0.802859 7.96048 0.95855 7.70187 1.19252 7.52906L10.0966 0.958588C10.2853 0.818997 10.5139 0.743652 10.7487 0.743652C10.9835 0.743652 11.212 0.818997 11.4007 0.958588L20.3048 7.52906C20.4908 7.66598 20.6286 7.85809 20.6988 8.07797C20.769 8.29785 20.7678 8.53426 20.6955 8.75344C20.6232 8.97262 20.4834 9.16338 20.2962 9.29847C20.1089 9.43356 19.8837 9.50608 19.6528 9.50568Z" fill="#FF3D00"></path>\n</g>\n<defs>\n<clipPath id="clip0_114904_5525">\n<rect width="20" height="14.5098" transform="translate(0.748535 0.745117)"></rect>\n</clipPath>\n</defs>\n</svg>\n',
    priorityID: "priorityUrgent",
    subtasks: ["Supplement documentation", "Save on git"],
    taskStatus: "done",
    title: "CSS Architecture Planning",
  },
  {
    assigned: ["Anja Schulz", "Emmanuel Mauer", "Eva Fischer"],
    category: ["Technical Task"],
    description: "Create reusable HTML base templates...",
    dueDate: "2024-02-07",
    id: 2,
    priorityContent:
      '\n<div class="textLow" id="textLow" style="color: white;">Low</div>\n<svg xmlns="http://www.w3.org/2000/svg" width="21" height="16" viewBox="0 0 21 16">\n<path class="img-priorityLow imgPrio-active" d="M10.8555 9.69779C10.6209 9.69819 10.3923 9.62335 10.2035 9.48427L1.30038 2.91453C1.18454 2.82898 1.0867 2.72146 1.01245 2.59812C0.938193 2.47478 0.888977 2.33803 0.867609 2.19569C0.824455 1.90821 0.897354 1.61537 1.07027 1.3816C1.24319 1.14782 1.50196 0.992265 1.78965 0.949143C2.07734 0.906021 2.3704 0.978866 2.60434 1.15165L10.8555 7.23414L19.1066 1.15165C19.2224 1.0661 19.354 1.00418 19.4938 0.969432C19.6336 0.934685 19.7788 0.927791 19.9213 0.949143C20.0637 0.970495 20.2006 1.01967 20.324 1.09388C20.4474 1.16808 20.555 1.26584 20.6407 1.3816C20.7263 1.49735 20.7883 1.62882 20.823 1.7685C20.8578 1.90818 20.8647 2.05334 20.8433 2.19569C20.822 2.33803 20.7727 2.47478 20.6985 2.59812C20.6242 2.72146 20.5264 2.82898 20.4106 2.91453L11.5075 9.48427C11.3186 9.62335 11.0901 9.69819 10.8555 9.69779Z" fill="#7AE229"></path>\n<path class="img-priorityLow imgPrio-active" d="M10.8555 15.4463C10.6209 15.4467 10.3923 15.3719 10.2035 15.2328L1.30038 8.66307C1.06644 8.49028 0.910763 8.2317 0.867609 7.94422C0.824455 7.65674 0.897354 7.3639 1.07027 7.13013C1.24319 6.89636 1.50196 6.7408 1.78965 6.69768C2.07734 6.65456 2.3704 6.7274 2.60434 6.90019L10.8555 12.9827L19.1066 6.90019C19.3405 6.7274 19.6336 6.65456 19.9213 6.69768C20.209 6.7408 20.4678 6.89636 20.6407 7.13013C20.8136 7.3639 20.8865 7.65674 20.8433 7.94422C20.8002 8.2317 20.6445 8.49028 20.4106 8.66307L11.5075 15.2328C11.3186 15.3719 11.0901 15.4467 10.8555 15.4463Z" fill="#7AE229"></path>\n</svg>\n',
    priorityID: "priorityLow",
    subtasks: [],
    taskStatus: "awaitFeedback",
    title: "HTML Base Template Creation",
  },
];
let priorityContentArray = [];
let currentId = 3;
let taskStatus = [];
let selectedPriorityContent = "";
let preselectedCategory = "Medium";
let statusFromUser;

function addTaskInit() {
  load();
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
  changeColour(getCategoryPriorityColor(preselectedCategory), preselectedCategory);
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
  clearInputAndDisplayContacts();
}

function clearInputAndDisplayContacts() {
  let input = document.getElementById("searchContacts");
  input.value = "";
  setTimeout(function () {
    displayAllContacts();
  }, 100);
}

function displayAllContacts() {
  let contacts = document.getElementsByClassName("contactList");
  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    contact.style.display = "";
  }
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

function addTask() {
  if (!statusFromUser) {
    statusFromUser = "todo";
  }
  setContentOfInputFieldFromTask();
  switchColorpriorityContent();
  document.getElementById("categorySelect").textContent = "Select a task category";
  subtasks = [];
  save();
  renderTask();
  clearAddTask();
}

function clearAddTask() {
  clearContactAvatar();
  clearPrioActiveClass();
  removePrioActiveClass();
  taskSuccess();
  updateSubtasksDisplay();
  clearAllSelections();
  resetPriorityTextColors();
  category = [];
  selectedContacts = [];
  statusFromUser = "todo";
}

function setContentOfInputFieldFromTask() {
  let titleValue = generateTitle();
  let descriptionValue = generateDescription();
  let dueDateValue = generateDate();
  checkboxAddTask();
  let selectedPriority = document.querySelector(".priorityUrgent-active, .priorityMedium-active, .priorityLow-active");
  let priorityContent = selectedPriority ? selectedPriority.innerHTML : "";
  let selectedPriorityID = "";
  if (selectedPriority) {
    selectedPriorityID = selectedPriority.id;
  }
  priorityContentArray.unshift(priorityContent);
  generateNewTaskContent(currentId, titleValue, titleValue, descriptionValue, dueDateValue, assigned, priorityContent, selectedPriorityID, subtasks, statusFromUser, category);
  localStorage.setItem("selectedPriorityContent", priorityContent);
}

function generateTitle() {
  let titleValue = document.getElementById("title").value;
  document.getElementById("title").value = "";
  title.unshift(titleValue);
  return titleValue;
}

function generateDescription() {
  let descriptionValue = document.getElementById("description").value;
  document.getElementById("description").value = "";
  description.unshift(descriptionValue);
  return descriptionValue;
}

function generateDate() {
  let dueDateValue = document.getElementById("dueDate").value;
  document.getElementById("dueDate").value = "";
  dueDate.unshift(dueDateValue);
  return dueDateValue;
}

function generateNewTaskContent(currentId, titleValue, titleValue, descriptionValue, dueDateValue, assigned, priorityContent, selectedPriorityID, subtasks, statusFromUser, category) {
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
    taskStatus: statusFromUser,
    category: category,
  };
  subT.unshift(subtasks.slice());
  tasks.unshift(newTask);
}

function switchColorpriorityContent() {
  let selectedPriority = document.querySelector(".priorityUrgent-active, .priorityMedium-active, .priorityLow-active");

  if (selectedPriority) {
    priorityID = selectedPriority.id;
  }
  if (priorityID === "priorityUrgent") {
    document.getElementById("textUrgent").style.color = "black";
  }
  if (priorityID === "priorityMedium") {
    document.getElementById("textMedium").style.color = "black";
  }
  if (priorityID === "priorityLow") {
    document.getElementById("textLow").style.color = "black";
  }
}

function checkboxAddTask() {
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
  clearTaskValues();
  removeBorderColorAndHideIndicator("titleFieldRequired");
  removeBorderColorAndHideIndicator("dueDateFieldRequired");
  clearContactAvatar();
  clearAllSelections();
  clearPrioActiveClass();
  removePrioActiveClass();
  clearTaskCategory();
  resetPriorityTextColors();
  hideAssigned();
  changeColour(getCategoryPriorityColor(preselectedCategory), preselectedCategory);
}

function clearTaskValues() {
  let categoryFrame74 = document.getElementById("categoryFrame_74");
  categoryFrame74.style.border = "";
  let allSubtasksDiv = document.getElementById("allSubtasks");
  allSubtasksDiv.innerHTML = "";
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("dueDate").value = "";
  document.getElementById("inputSubtasks").value = "";
  document.getElementById("taskCategory").value = "";
  document.getElementById("searchContacts").value = "";
}

function getCategoryPriorityColor(category) {
  switch (category) {
    case "Urgent":
      return "priorityUrgent";
    case "Medium":
      return "priorityMedium";
    case "Low":
      return "priorityLow";
    default:
      return "priorityMedium";
  }
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
  setToVariable(taskStautsAsText, idAsText, titleAsText, descriptionAsText, assignedAsText, dueDateAsText, priorityContentArrayText, subtaskAsText, tasksAsText, categoryAsText, subTAsText);
}

function setToVariable(taskStautsAsText, idAsText, titleAsText, descriptionAsText, assignedAsText, dueDateAsText, priorityContentArrayText, subtaskAsText, tasksAsText, categoryAsText, subTAsText) {
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
  let list = document.getElementById("listContact");
  let arrow = document.getElementById("arrowAssigned");
  let arrowDrop = document.getElementById("arrow_drop_downHoverAssigned");
  if (event && event.target && event.target.id !== "assigned") {
    list.classList.toggle("hide");
    arrow.classList.toggle("rotate");
    arrowDrop.classList.toggle("rotate");
  } else {
    list.classList.add("hide");
    arrow.classList.remove("rotate");
    arrowDrop.classList.remove("rotate");
  }
  displayAvatar(selectedContacts, contacts, colors);
}

// Function to close the listContact if clicked outside
document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function (event) {
    let listContact = document.getElementById("listContact");
    let assignedElement = document.getElementById("assigned");
    let isClickInsideList = listContact && listContact.contains(event.target);
    let isClickOnAssigned = assignedElement && assignedElement.contains(event.target);
    let arrow = document.getElementById("arrowAssigned");
    let arrowDrop = document.getElementById("arrow_drop_downHoverAssigned");
    if (!isClickInsideList && listContact && listContact.offsetParent !== null && !isClickOnAssigned) {
      listContact.classList.add("hide");
      arrow.classList.remove("rotate");
      arrowDrop.classList.remove("rotate");
    }
  });
});

function toggleListContact() {
  let listContact = document.getElementById("listContact");
  let arrow = document.getElementById("arrowAssigned");
  let arrowDrop = document.getElementById("arrow_drop_downHoverAssigned");
  listContact.classList.toggle("hide");
  arrow.classList.toggle("rotate");
  arrowDrop.classList.toggle("rotate");
  displayAvatar(selectedContacts, contacts, colors);
}

function hideListContact() {
  let listContact = document.getElementById("listContact");
  let arrow = document.getElementById("arrowAssigned");
  let arrowDrop = document.getElementById("arrow_drop_downHoverAssigned");
  listContact.classList.add("hide");
  arrow.classList.remove("rotate");
  arrowDrop.classList.remove("rotate");
  displayAvatar(selectedContacts, contacts, colors);
}

function getCategoryForPriority(priority) {
  switch (priority) {
    case "priorityUrgent":
      return "Urgent";
    case "priorityMedium":
      return "Medium";
    case "priorityLow":
      return "Low";
    default:
      return "";
  }
}

function clearPrioActiveClass() {
  const priorityElements = document.querySelectorAll(".priority");
  priorityElements.forEach((priority) => {
    if (!priority.classList.contains("priorityActive")) {
      priority.classList.remove("active");
    }
  });
}

let selectedPriority = null;

function changeColour(divID) {
  const selected = document.getElementById(divID);
  if (selected === selectedPriority) return;
  resetPreviousPriority(selected);
  activateSelectedPriority(selected);
  updatePriorityElements(divID);
}

function resetPreviousPriority(selected) {
  if (selectedPriority) {
    selectedPriority.classList.remove("active");
    selectedPriority.style.color = "";
  }
}

function activateSelectedPriority(selected) {
  selected.classList.add("active");
  selected.style.color = "white";
  selectedPriority = selected;
}

function updatePriorityElements(divID) {
  const priorities = ["priorityUrgent", "priorityMedium", "priorityLow"];
  for (const priorityID of priorities) {
    const priorityElement = document.getElementById(priorityID);
    if (priorityElement && priorityElement !== selectedPriority) {
      resetPriorityStyles(priorityElement);
    }
  }
  toggleSelectedPriorityStyles(divID);
}

function resetPriorityStyles(priorityElement) {
  priorityElement.classList.remove(`${priorityElement.id}-active`);
  const imgPaths = document.querySelectorAll(`.img-${priorityElement.id}`);
  imgPaths.forEach((path) => {
    path.classList.remove("imgPrio-active");
  });
  const textElement = priorityElement.querySelector(`.text${priorityElement.id.slice(8)}`);
  if (textElement) {
    textElement.style.color = "";
  }
}

function toggleSelectedPriorityStyles(divID) {
  const selected = document.getElementById(divID);
  selected.classList.toggle(`${divID}-active`);
  const selectedImgPaths = document.querySelectorAll(`.img-${divID}`);
  selectedImgPaths.forEach((path) => {
    path.classList.toggle("imgPrio-active");
  });
  const selectedTextElement = selected.querySelector(`.text${divID.slice(8)}`);
  if (selectedTextElement) {
    const isCurrentlyActive = selected.classList.contains(`${divID}-active`);
    const previousActivePriority = document.querySelector(`.${selectedPriority.id}-active`);
    if (previousActivePriority && previousActivePriority !== selected) {
      const previousTextElement = previousActivePriority.querySelector(`.text${previousActivePriority.id.slice(8)}`);
      if (previousTextElement) {
        previousTextElement.style.color = "";
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
    textElement.removeAttribute("style");
  }
}

function toggleImgPrioActive(divID) {
  const imgPaths = document.querySelectorAll(`.img-${divID}`);
  imgPaths.forEach((path) => {
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
    startEditing(subtaskItemDiv, subtaskItemText, subtaskText);
  }
}

function startEditing(subtaskItemDiv, subtaskItemText, subtaskText) {
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
    finishEditing(editInput, subtaskItemText, subtaskText);
  });
  editInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      editInput.blur();
    }
  });
  const iconsContainer = createIconsContainerWhenEdit(subtaskItemDiv, subtaskText, subtasks.indexOf(subtaskText));
  subtaskItemDiv.replaceChild(iconsContainer, subtaskItemDiv.lastChild);
}

function finishEditing(editInput, subtaskItemText, subtaskText) {
  let newText = editInput.value.trim();

  if (newText !== "") {
    subtaskItemText.innerText = newText;
    subtasks[subtasks.indexOf(subtaskText)] = newText;
    save();
  } else {
    editInput.value = subtaskItemText.innerText;
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
    return;
  }
  await addTask();
  setTimeout(async function () {
    await renderBoardHTML();
  }, 1500);

  let selectedPriority = document.querySelector(".priorityUrgent-active, .priorityMedium-active, .priorityLow-active");
  if (selectedPriority) {
    preselectedCategory = getCategoryForPriority(selectedPriority.id);
  }
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
  } else if (element.classList.contains("categoryFrame_74")) {
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
