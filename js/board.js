let draggedElementId;


document.addEventListener('DOMContentLoaded', function () {
    renderBoardHTML();
});

function renderBoardHTML() {
    document.getElementById('contentJoin').innerHTML = ``;
    document.getElementById('contentJoin').innerHTML = generateBoardHTML();
    boardInit();
    updateHtml();
    load();
    save();
}


async function boardInit() {
    updateHtml();
}

function filterTasksByStatus(taskStatus) {
    return tasks.filter(t => t['taskStatus'] === taskStatus);
    
}

function updateHtmlForStatus(taskStatus, elementId) {
    const tasksByStatus = filterTasksByStatus(taskStatus);
    const element = document.getElementById(elementId);

    // Leere die bestehenden Inhalte im HTML-Element
    element.innerHTML = '';

    if (tasksByStatus.length === 0) {
        // Wenn keine Aufgaben vorhanden sind, zeige eine Nachricht an
        element.innerHTML = '<p class="noTask">Keine Aufgaben vorhanden</p>';
    } else {
        // Füge die Aufgabenkarten hinzu
        for (let i = 0; i < tasksByStatus.length; i++) {
            const task = tasksByStatus[i];
            element.innerHTML += generateSmallCard(task);
        
            let categoryBoard = document.getElementById('category');
            for (let j = 0; j < title.length; j++) {
                let currentCategory= category[j];
                let className = typeof currentCategory === 'string' ? currentCategory.replace(/\s+/g, '') : '';
                categoryBoard.innerHTML +=` <p class="${className}">${currentCategory}</p>`;
                
                let contactAvatar = document.getElementById("contactsAvatars");
                contactAvatar.innerHTML = ""; 
                for (let k = 0; k < selectedContacts.length; k++) {
                  let selectedIndex = selectedContacts[k];
                  let contact = contacts[selectedIndex];
                  let name = contact[0];
                  let firstname = name.split(" ")[0][0].toUpperCase();
                  let surname = name.split(" ")[1][0].toUpperCase();
                    contactAvatar.innerHTML +=`<div>
                  <div class="circleAvatar" id="circle-${selectedIndex}" style="background-color: ${colors[selectedIndex]}">
                      <p class="nameIdList" id="name-id">${firstname}${surname}</p>
                  </div>
              </div>`;
                }
            }
        }

    }
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

function updateHtml() {
    updateHtmlForStatus('todo', 'todo');
    updateHtmlForStatus('inProgress', 'inProgress');
    updateHtmlForStatus('awaitFeedback', 'awaitFeedback');
    updateHtmlForStatus('done', 'done');
}




function generateSmallCard(task) {
    let currentPriorityContent = task.priorityContent || ''; // Replace with actual property


    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = currentPriorityContent;
    tempDiv.classList.add('selectedPriorityContentDiv');

    let svgElements = tempDiv.querySelectorAll('.img-priorityUrgent, .img-priorityMedium, .img-priorityLow');
    svgElements.forEach(svgElement => {
        svgElement.classList.remove('imgPrio-active');
    });

    // Create a cloned content div and process its contents
    let clonedContentDiv = document.createElement('div');
    clonedContentDiv.appendChild(tempDiv.cloneNode(true));
    // Remove imgPrio-active class from SVG elements in the cloned content
    let clonedSvgElements = clonedContentDiv.querySelectorAll('.img-priorityUrgent, .img-priorityMedium, .img-priorityLow');
    clonedSvgElements.forEach(svgElement => {
        svgElement.classList.remove('imgPrio-active');
    });
    // let allSubtasksDiv = document.getElementById('allSubtasks');
    // allSubtasksDiv.innerHTML = ''; // Clear existing content
    // let subtasksContainer = document.createElement('div');
    // subtasksContainer.classList.add('subtasksContainer');

    // if (subtasks.length === 0) {
    //     allSubtasksDiv.innerHTML = '';
    // }
   
 


    return /*html*/`
      <div class="smallCard cardA" draggable="true" ondragstart="startDragged(${task['id']})"> 
        <div class="category"><p id="category"></p></div>
        <div class="taskText">
            <div class="taskTitle">${task.title}</div>
            <div class="taskDescription">${task.description}</div>
        </div>
        <div class="smallProgress">${task.subtasks.length}</div>
        <div class="smallCardFooter">
            <div class="assigend"><p id="contactsAvatars"></p></div>
            <div class="priority">${clonedContentDiv.innerHTML}</div>
            <div class="delete_task" onclick="deleteTask(event)">
                        <img class="delete-task-bt"  src="./assets/img/delete_task.png" alt="">
                        <p class = "delete-task-title">Delete</p>
                    </div>
        </div>
      </div>  
    `;

}

function deleteTask(event) {// wird nicht mehr gebraucht
    let noteElement = event.target.closest('.cardA');

    if (noteElement) {
        let parentElement = noteElement.parentElement;
        let index = Array.from(parentElement.children).indexOf(noteElement);

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
    }
}


// drag and drop 

function startDragged(id){
    draggedElementId = id;
}

// function moveIt(taskStatus) {
//     tasks[draggedElementId]['taskStatus'] = taskStatus;
//     updateHtml();
//     filterTasksByStatus();
//     updateHtmlForStatus();
// }

function moveIt(taskStatus) {
    const taskIndex = tasks.findIndex(task => task.id === draggedElementId);

    if (taskIndex !== -1) {
        tasks[taskIndex].taskStatus = taskStatus;
        updateHtml();
        save();
    } 
}
function allowDrop(ev) {
    ev.preventDefault();
  }