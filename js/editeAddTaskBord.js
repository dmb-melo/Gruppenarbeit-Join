

let selecetContactsEdit = [];
function editLargCard(taskId) {

  let editCard = document.getElementById('desingLagrCard');
  editCard.style.display = 'flex';
  editCard.style.alignItems = 'center';
  editCard.style.height = '100%';
  document.getElementById('largesCard').classList.add('d-None');

  document.getElementById('addTaskLargeCard').innerHTML = '';
  document.getElementById('addTaskLargeCard').innerHTML = generateAddEditeTask(taskId);

  document.getElementById('addTaskLargeCard').style.display = 'block';
  document.getElementById('addTaskLargeCard').style.width = '525px';
  document.getElementById('addTaskLargeCard').style.overflow = 'scroll';

  edittaskArea(taskId);
  renderEditTask();

}
function findTaskById(taskId) {
  const foundTask = tasks.find(task => task.id === taskId);
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

  document.getElementById('editTitle').value = foundTask.title;
  document.getElementById('editDescription').value = foundTask.description;
  document.getElementById('editDueDate').value = foundTask.dueDate;

  activatePriority(foundTask.priorityID);

  displayAssignedContacts(foundTask.assigned);

  displaySubtasks(foundTask.subtasks);
}


function displayAssignedContacts(assignedContacts) {
  const contactsLargeCard = document.getElementById('editAssignedContacts');

  contactsLargeCard.innerHTML = '';

  assignedContacts.forEach((contact, index) => {
    const name = contact.split(' ');
    const firstnameInitial = name[0].charAt(0).toUpperCase();
    const surnameInitial = name[1] ? name[1].charAt(0).toUpperCase() : '';

    contactsLargeCard.innerHTML += /*html*/ `
      <div class="boardLargContactsAvatar">
        <div class="circle" id="circle-${index}" style="background-color: ${colors[index]}">
          <p class="nameIdList" id="name-id">${firstnameInitial}${surnameInitial}</p>
        </div>
      </div>
    `;
  });
}


function displaySubtasks(subtasks) {
  const subtasksElement = document.getElementById('editSubtasks');

  subtasksElement.innerHTML = '';

  subtasks.forEach(subtask => {

    const subtaskElement = document.createElement('div');
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
  checkboxAddTaskEdit();
  if (selectedPriorityBoard) {
    selectedPriorityIDBoard = selectedPriorityBoard.id;
  }
  
  priorityContentArray.unshift(priorityContentBoard);

  if (foundTask) {
    const editedTask = {
      id: taskId,
      title: document.getElementById('editTitle').value,
      description: document.getElementById('editDescription').value,
      dueDate: document.getElementById('editDueDate').value,
      status: status,
      priorityID: prio, 
      assigned: assigned, 
    };
   tasks = tasks.map(task => (task.id === taskId ? editedTask : task));

    save();
    updateHtml();
  } else {
    console.error('Task with ID ' + taskId + ' not found.');
  }

  closeCard();
  selecetContactsEdit =[];
}

function checkboxAddTaskEdit(){
  let checkboxes = document.querySelectorAll(".inputCheckBox");
  assigned = []; 
  checkboxes.forEach((checkbox, index) => {
  let label = document.querySelector(`.nameContact[for=myCheckbox_${index}]`);
  if (checkbox.checked && label) {
    assigned.push(label.textContent);
  }
});
}

function getStatusTaskId(taskId) {
  for (let i = 0; i < tasks.length; i++) {
    let idOfTaskStatus = tasks[i]["id"];
    if (idOfTaskStatus  === taskId) {
      return tasks[i]["taskStatus"];
    }
  }
}
function getPrioTaskId(taskId) {
  for (let i = 0; i < tasks.length; i++) {
    let idOfTaskPrio = tasks[i]["id"];
    if (idOfTaskPrio  === taskId) {
      return tasks[i]["priorityID"];
    }
  }
}


function hideAssignedBoardEdit(event) {
  if (event.target.id !== "assignedBoard") {
    let list = document.getElementById("listContactEdit");
    let arrow = document.getElementById("arrowAssignedEdit");
    let arrowDrop = document.getElementById("arrow_drop_downHoverAssignedEdit");
    list.classList.toggle("hide");
    arrow.classList.toggle("rotate");
    arrowDrop.classList.toggle("rotate");
  }
  displayAvatarEditBoart(selecetContactsEdit, contacts, colors);
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
    contactNotCheckedEdit(i, liElementEdit, nameElement, labelElementEdit);
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
  const liElementEdit = contactsList.getElementsByTagName("li")[i];
  const nameElementEdit = contactsList.getElementsByTagName("label")[i];
  document.getElementById(`myCheckbox_Edit${i}`).addEventListener("change", function (event) {
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





//   function saveTasksToLocalStorage() {
//     localStorage.setItem('tasks', JSON.stringify(tasks));
// }

// function loadTasksFromLocalStorage() {
//     const storedTasks = localStorage.getItem('tasks');
//     if (storedTasks) {
//         tasks = JSON.parse(storedTasks);
//         // Aktualisiere die HTML-Ansicht, um die geladenen Aufgaben anzuzeigen
//         updateHtml();
//     }
// }

