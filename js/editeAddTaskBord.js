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

function edittaskArea(taskId) {
  const foundTask = findTaskById(taskId);

  document.getElementById('editTitle').value = foundTask.title;
  document.getElementById('editDescription').value = foundTask.description;
  document.getElementById('editDueDate').value = foundTask.dueDate;

  // Aktiviere die Priorität basierend auf der im Task gespeicherten Priorität
  activatePriority(foundTask.priorityID);
}

function activatePriority(priorityID) {
  const priorityElement = document.getElementById(priorityID);
  if (priorityElement) {
      priorityElement.classList.add(`${priorityID}-active`);
      
      // Optional: Füge die aktive Klasse für die zugehörigen Bilder hinzu
      let imgPaths = document.querySelectorAll(`.img-${priorityID}`);
      imgPaths.forEach((path) => {
          path.classList.add("imgPrio-active");
      });
  }
}

function saveEditTaskBoard(taskId) {
  const foundTask = findTaskById(taskId);

  if (foundTask) {
      const editedTask = {
          id: taskId,
          title: document.getElementById('editTitle').value,
          description: document.getElementById('editDescription').value,
          dueDate: document.getElementById('editDueDate').value,
          status: foundTask.status,
          priorityID: foundTask.priorityID // Include the priority information
      };

      // Update the tasks array with the edited task
      tasks = tasks.map(task => (task.id === taskId ? editedTask : task));

      save();
  } else {
      console.error('Task with ID ' + taskId + ' not found.');
  }
  closeCard();
}


function hideAssignedBoardEdit(event){
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


  function renderContactsAddTask(i, contactsList) {
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

  function renderEditTask() {
    let contactsList = document.getElementById("contactListBoard");
    contactsList.innerHTML = "";
    sortContacts();
    for (let i = 0; i < contacts.length; i++) {
      renderContactsAddTask(i, contactsList);
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