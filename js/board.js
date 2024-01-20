let draggedElementId;
let stateOfTask = [];
let subtaskLevel = [];

function renderBoardHTML() {
  load();
  loadStateOfSubTask();
  loadLevelOfSubtask();
  document.getElementById("contentJoin").innerHTML = ``;
  document.getElementById("contentJoin").innerHTML = generateBoardHTML();
  boardInit();
  removeStyleSidebar();
  addTextColor();
  document.getElementById("sidebarCategoryBorard").classList.add("sidebarCategoryLinkActive");
  renderProgressbar();
}

function boardInit() {
  updateHtml();
  renderSmallContats();
}

function filterTasksByStatus(taskStatus) {
  return tasks.filter((t) => t["taskStatus"] === taskStatus);
}

function updateHtmlForStatus(taskStatus, elementId) {
  const tasksByStatus = filterTasksByStatus(taskStatus);
  const element = document.getElementById(elementId);

  // Leere die bestehenden Inhalte im HTML-Element
  element.innerHTML = "";

  if (tasksByStatus.length === 0) {
    // Wenn keine Aufgaben vorhanden sind, zeige eine Nachricht an
    element.innerHTML = '<p class="noTask">Keine Aufgaben vorhanden</p>';
  } else {
    // Füge die Aufgabenkarten hinzu
    for (let i = 0; i < tasksByStatus.length; i++) {
      const task = tasksByStatus[i];
      element.innerHTML += generateSmallCard(task, i);
    }
  }
}
function renderProgressbar() {
  for (let i = 0; i < subtaskLevel.length; i++) {
    if (subtaskLevel) {
      let taskId = subtaskLevel[i]["taskId"];
      let percentageCompleted = subtaskLevel[i]["percentageCompleted"];
      let valueOfTheSubtaskBreak = subtaskLevel[i]["valueOfTheSubtaskBreak"];
      const smallProgressDiv = document.getElementById(`smallProgress-${taskId}`);
      smallProgressDiv.textContent = `${valueOfTheSubtaskBreak}`;
      let progressBar = document.getElementById(`progress-${taskId}`);
      progressBar.style.width = `${percentageCompleted}%`;
    }
  }
}

function updateHtml() {
  updateHtmlForStatus("todo", "todo");
  updateHtmlForStatus("inProgress", "inProgress");
  updateHtmlForStatus("awaitFeedback", "awaitFeedback");
  updateHtmlForStatus("done", "done");
}

function removeActiveClassFromSvgElements(container) {
  let svgElements = container.querySelectorAll(".img-priorityUrgent, .img-priorityMedium, .img-priorityLow");
  svgElements.forEach((svgElement) => {
    svgElement.classList.remove("imgPrio-active");
  });
}

function generateSmallCard(task, i) {
  let currenCategory = task.category[0];
  let currentPriorityContent = task.priorityContent || '';

  let tempDiv = document.createElement("div");
  tempDiv.innerHTML = currentPriorityContent;
  tempDiv.classList.add("selectedPriorityContentDiv");

  removeActiveClassFromSvgElements(tempDiv);

  let clonedContentDiv = document.createElement("div");
  clonedContentDiv.appendChild(tempDiv.cloneNode(true));

  removeActiveClassFromSvgElements(clonedContentDiv);
  let className = typeof currenCategory === 'string' ? currenCategory.replace(/\s+/g, '') : '';

  // Clear the text content inside the elements with specified classes
  let selectedPriorityContentDiv = clonedContentDiv.querySelector('.selectedPriorityContentDiv');

  ['textUrgent', 'textMedium', 'textLow'].forEach(className => {
    let textElement = selectedPriorityContentDiv.querySelector('.' + className);
    if (textElement) {
      textElement.textContent = ''; // Clear text content
    }
  });

  // Conditionally include the smallProgress div
  let smallProgressDiv = '';
  if (task.subtasks.length > 0) {
    smallProgressDiv = /*html*/ `
            <div class="progressContainer">
                <div class="progress">
                    <div class="progress-value" id="progress-${task.id}"></div>
                </div>
                <div class="smallProgress" id="smallProgress-${task.id}">0/${task.subtasks.length}</div>
            </div>
        `;
  }

  return generateSmallCardHTML(task, className, clonedContentDiv, smallProgressDiv,i);
}

// Delet of Tasks

function deleteTask(event) {
  let noteElement = event.target.closest(".largeCardA");
  if (noteElement) {
    let parentElement = noteElement.parentElement;
    let index = Array.from(parentElement.children).indexOf(noteElement);
    deleteLevelOfSubtask(index);
    noteElement.remove();
    title.splice(index, 1);
    description.splice(index, 1);
    assigned.splice(index, 1);
    dueDate.splice(index, 1);
    prio.splice(index, 1);
    category.splice(index, 1);
    subtasks.splice(index, 1);
    subT.splice(index, 1);
    priorityContentArray.splice(index, 1);
    tasks.splice(0, 1);
    save();
    updateHtml();
    closeCard();
  }
}

function startDragged(id) {
  draggedElementId = id;
}

function moveIt(taskStatus) {
  const taskIndex = tasks.findIndex((task) => task.id === draggedElementId);
  if (taskIndex !== -1) {
    tasks[taskIndex].taskStatus = taskStatus;
    updateHtml();
    save();
    renderProgressbar();
    renderSmallContats();
  }
}
function allowDrop(ev) {
  ev.preventDefault();
}
function highlight(id) {
  document.getElementById(id).classList.add("drag-area-highlight");
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove("drag-area-highlight");
}

function openCard(taskId) {
  const largeCardElement = document.getElementById("popUpWindow");
  const task = tasks.find((t) => t.id === taskId);

  if (task) {
    largeCardElement.innerHTML = generateLargeCard(task);
    largeCardElement.style.transform = "translateX(0%)";
    renderLargeContats(task); 
  }
  renderLargeContats(); 
}


function renderSubtaskState(task) {
  let taskId = task["id"];
  let subTask = task["subtasks"];
  for (let i = 0; i < subTask.length; i++) {
    let renderTaskId = `checkbox-${taskId}-${i}`;
    let indexTaskId = getTaskId(renderTaskId);
    validateSubtask(indexTaskId, renderTaskId, taskId, subTask);
  }
}

function validateSubtask(indexTaskId, renderTaskId, taskId, subTask) {
  let checkboxRenderTaskId = document.getElementById(renderTaskId);
  if (indexTaskId === -1) {
    checkboxRenderTaskId.checked = false;
  } else {
    checkboxRenderTaskId.checked = true;
  }
}

function saveStateOfSubTask(taskId, index) {
  const id = `checkbox-${taskId}-${index}`;
  let indexTaskId = getTaskId(id);
  if (indexTaskId === -1) {
    stateOfTask.push(id);
  } else {
    stateOfTask.splice(indexTaskId, 1);
  }
  let idAtText = JSON.stringify(stateOfTask);
  localStorage.setItem("id", idAtText);
}

function getTaskId(id) {
  let index = stateOfTask.indexOf(id);
  return index;
}

async function saveLevelOfSubtask(taskId, percentageCompleted, valueOfTheSubtaskBreak) {
  await getLevelTaskId(taskId);
  pushLevelOfSubtask(taskId, percentageCompleted, valueOfTheSubtaskBreak);
  saveLevelOfSubtaskLocalStorage();
}

function saveLevelOfSubtaskLocalStorage() {
  let subtaskLevelAtText = JSON.stringify(subtaskLevel);
  localStorage.setItem("subtaskLevel", subtaskLevelAtText);
}

function getLevelTaskId(taskId) {
  for (let i = 0; i < subtaskLevel.length; i++) {
    let idOfTasklevel = subtaskLevel[i]["taskId"];
    if (idOfTasklevel === taskId) {
      subtaskLevel.splice(i, 1);
    }
  }
}

function pushLevelOfSubtask(taskId, percentageCompleted, valueOfTheSubtaskBreak) {
  let level = {
    taskId: taskId,
    percentageCompleted: percentageCompleted,
    valueOfTheSubtaskBreak: valueOfTheSubtaskBreak,
  };
  subtaskLevel.push(level);
}

function deleteLevelOfSubtask(indexOfTask) {
  let idOfTask = tasks[indexOfTask]["id"];
  for (let i = 0; i < subtaskLevel.length; i++) {
    let idOfTasklevel = subtaskLevel[i]["taskId"];
    if (idOfTasklevel === idOfTask) {
      subtaskLevel.splice(i, 1);
    }
  }
  saveLevelOfSubtaskLocalStorage();
  loadLevelOfSubtask();
}

function loadStateOfSubTask() {
  let idAtText = localStorage.getItem("id");
  if (idAtText) {
    stateOfTask = JSON.parse(idAtText);
  }
}

function loadLevelOfSubtask() {
  let subtaskLevelAtText = localStorage.getItem("subtaskLevel");
  if (subtaskLevelAtText) {
    subtaskLevel = JSON.parse(subtaskLevelAtText);
  }
}

function generateLargeCard(task) {
  let currentPriorityContent = task.priorityContent || "";
  
  let currentSubTasks = subT[task];
  let tempDiv = document.createElement("div");
  tempDiv.innerHTML = currentPriorityContent;
  tempDiv.classList.add("selectedPriorityContentDiv");

  removeActiveClassFromSvgElements(tempDiv);

  let clonedContentDiv = document.createElement("div");
  clonedContentDiv.appendChild(tempDiv.cloneNode(true));

  removeActiveClassFromSvgElements(clonedContentDiv);
  let currenCategory = task.category[0];

  let className = typeof currenCategory === "string" ? currenCategory.replace(/\s+/g, "") : "";
  const subsHtml = generateSubtasksHTML(task);
  return generateLargeCardHTML(task, className, clonedContentDiv, subsHtml);
}

function updateProgress(taskId, index) {
  const checkboxes = document.querySelectorAll(`.checkbox-input-${taskId}`);
  const checkedCheckboxes = Array.from(checkboxes).filter((checkbox) => checkbox.checked);

  const smallProgressDiv = document.getElementById(`smallProgress-${taskId}`);
  smallProgressDiv.textContent = `${checkedCheckboxes.length}/${checkboxes.length}`;
  `${checkedCheckboxes.length}/${checkboxes.length}`;
  let valueOfTheSubtaskBreak = `${checkedCheckboxes.length}/${checkboxes.length}`;
  // Adjust the width of the progress bar based on the percentage completed
  const progressBar = document.getElementById(`progress-${taskId}`);
  const percentageCompleted = (checkedCheckboxes.length / checkboxes.length) * 100;
  progressBar.style.width = `${percentageCompleted}%`;
  saveStateOfSubTask(taskId, index);
  saveLevelOfSubtask(taskId, percentageCompleted, valueOfTheSubtaskBreak);
  loadStateOfSubTask();
}

function editLargCard(taskId) {
  const task = tasks.find((task) => task.id === taskId);

}



function closeCard() {
  // Your close logic goes here
  const largeCardElement = document.getElementById("popUpWindow");
  largeCardElement.style.transform = "translateX(500%)";
}
function renderSmallContats() {
  const contactsSmallCard = document.getElementById("boardAssigend");
  contacts.innerHTML = "";
  if (tasks.length === 0) {
    console.log("Keine Aufgaben vorhanden");
    return;
  }
  for (let i = 0; i < tasks.length; i++) {
    const assigned = tasks[i]["assigned"];

    const contactsSmallCard = document.getElementById(`boardAssigend-${tasks[i]['id']}`);
    const maxContactsToShow = 3;
    const totalAssigned = assigned.length;

    for (let a = 0; a <  Math.min(maxContactsToShow, totalAssigned); a++) {
      const assigendAvatar = assigned[a];
      let name = assigned[a];
      let firstname = name[0].toUpperCase();

      let names = assigned[a].split(" ");
      let surname = names[1].toUpperCase().charAt(0);
      contactsSmallCard.innerHTML += /*html*/ `
                    <div class="">
                        <div class="smallCardVersionCircel" id="circle-${a}" style="background-color: ${colors[a]}">
                            <p class="nameIdList" id="name-id">${firstname}${surname}</p>
                        </div>
                    </div>
                `;
    }
    if (totalAssigned > maxContactsToShow) {
      contactsSmallCard.innerHTML += /*html*/`
          <div class="">
              <div class="smallCardVersionCircel lastSmallCircel " style="background-color: #ccc;">
                  <p class="nameIdList lastCircel" id="name-id">${totalAssigned - maxContactsToShow}+</p>
              </div>
          </div>
      `;
  }

  }
}

function renderLargeContats(task) {
  const contactsLargeCard = document.getElementById("boardAssigendLargCard");
  contacts.innerHTML = "";

  if (task && task['assigned']) {
    const assigned = task['assigned'];
    for (let d = 0; d < assigned.length; d++) {
      const assigendAvatar = assigned[d];
      let name = assigned[d];
      let firstname = name[0].toUpperCase(); // Ersten Buchstaben extrahieren und in Großbuchstaben umwandeln

      let names = assigned[d].split(" ");
      let surname = names[1].toUpperCase().charAt(0);
      contactsLargeCard.innerHTML += /*html*/ `
             <div class="boardLargContactsAvatar">
                    <div class="circle" id="circle-${d}" style="background-color: ${colors[d]}"><p class="nameIdList" id="name-id">${firstname}${surname}</p></div>
                    <p>${assigendAvatar}</p>
                </div>
        `;
    }
  }
}

function renderEditContats() {
  const contactsLargeCard = document.getElementById("boardAssigendLargCard");
  contacts.innerHTML = "";
  for (let d = 0; d < assigned.length; d++) {
    const assigendAvatar = assigned[d];
    let name = assigned[d];
    let firstname = name[0].toUpperCase(); // Ersten Buchstaben extrahieren und in Großbuchstaben umwandeln

    let names = assigned[d].split(" ");
    let surname = names[1].toUpperCase().charAt(0);
    contactsLargeCard.innerHTML += /*html*/ `
             <div class="boardLargContactsAvatar">
                    <div class="circle" id="circle-${d}" style="background-color: ${colors[d]}"><p class="nameIdList" id="name-id">${firstname}${surname}</p></div>
                    <p>${assigendAvatar}</p>
                </div>
        `;
  }
}


function appendGeneratedAddTask() {

  let addWindow = document.getElementById('popUpAddWindow');
  addWindow.classList.add('openAddWindow');
   let addBoard = document.getElementById('addBoard');

  let newDivAddTask = document.createElement('div');
  newDivAddTask.classList.add('addWindowCss');
  newDivAddTask.innerHTML = generate_addTask();
  addBoard.appendChild(newDivAddTask);
  let contactsList = document.getElementById("contactList");
  contactsList.innerHTML = "";
  sortContacts();
  for (let i = 0; i < contacts.length; i++) {
    renderContactsAddTask(i, contactsList);
  }
  document.getElementById("searchContacts").addEventListener("keyup", handleContactSearch);
  changeColour('priorityMedium');
}

function searchTask() {
  let terminal = document.getElementById('searchInput').value.toLowerCase();
  let foundTaskIds = [];

  for (let i in tasks) {
    let taskTitle = tasks[i].title.toLowerCase();
    if (taskTitle.includes(terminal)) {
      foundTaskIds.push(tasks[i].id);
    }
  }
  notSearchTasks(foundTaskIds);
}

function notSearchTasks(foundTaskIds) {
  // Iteriere durch alle Aufgaben
  for (let task of tasks) {
    let taskElement = document.getElementById('smallCardId-' + task.id);

    if (foundTaskIds.includes(task.id)) {
      console.log('Task with ID ' + task.id + ': flex');
      taskElement.style.display = 'flex';
    } else {
      console.log('Task with ID ' + task.id + ': not');
      taskElement.style.display = 'none';
    }
  }
}



function closeAddBoard() {

  let addWindow = document.getElementById('popUpAddWindow');
  addWindow.classList.remove('openAddWindow');


  let addBoard = document.getElementById('addBoard');
  let newDivAddTask = document.querySelector('.addWindowCss');
  if (newDivAddTask) {
    addBoard.removeChild(newDivAddTask);
  }
}


document.getElementById('closeAddButton').addEventListener('click', closeAddBoard);
