let draggedElementId;


document.addEventListener('DOMContentLoaded', function () {
    renderBoardHTML();
});

function renderBoardHTML() {
    document.getElementById('contentJoin').innerHTML = ``;
    document.getElementById('contentJoin').innerHTML = generateBoardHTML();
    boardInit();
    load();
    save();
    removeStyleSidebar();
    addTextColor();
    document.getElementById("sidebarCategoryBorard").classList.add("sidebarCategoryLinkActive")
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
    const largTast = document

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





function removeActiveClassFromSvgElements(container) {
    let svgElements = container.querySelectorAll('.img-priorityUrgent, .img-priorityMedium, .img-priorityLow');
    svgElements.forEach(svgElement => {
        svgElement.classList.remove('imgPrio-active');
    });
}


function generateSmallCard(task) {
    let currenCategory = task.category[0]
    let currentPriorityContent = task.priorityContent || ''; 

    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = currentPriorityContent;
    tempDiv.classList.add('selectedPriorityContentDiv');

    removeActiveClassFromSvgElements(tempDiv);

    let clonedContentDiv = document.createElement('div');
    clonedContentDiv.appendChild(tempDiv.cloneNode(true));
    
    removeActiveClassFromSvgElements(clonedContentDiv);
    let className = typeof currenCategory === 'string' ? currenCategory.replace(/\s+/g, '') : '';
    return /*html*/`
      <div class="smallCard cardA" draggable="true" ondragstart="startDragged(${task['id']})" onclick="openCard(${task['id']})"> 
        <div class="category"><p id="category" class="${className}">${currenCategory}</p></div>
        <div class="taskText">
            <div class="taskTitle">${task.title}</div>
            <div class="taskDescription">${task.description}</div>
        </div>
        <div class="smallProgress">${task.subtasks.length}</div>
        <div class="smallCardFooter">
        
        <div class="assigend"><p>${assigned}</p>
        </div>
            <div class="priority">${clonedContentDiv.innerHTML}</div>
            <div class="delete_task" onclick="deleteTask(event)">
                <img class="delete-task-bt"  src="./assets/img/delete_task.png" alt="">
                <p class="delete-task-title">Delete</p>
            </div>
        </div>
      </div>  
    `;
}


// Delet of Tasks 

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

function moveIt(taskStatus) {
    const taskIndex = tasks.findIndex(task => task.id === draggedElementId);

    if (taskIndex !== -1) {
        tasks[taskIndex].taskStatus = taskStatus;
        updateHtml();
    } 
}

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



  function openCard(taskId) {
    const largeCardElement = document.getElementById('popUpWindow');
    const task = tasks.find(t => t.id === taskId);
    console.log('find task', task)
    if (task) {
       
        largeCardElement.innerHTML = generateLargeCard(task);
        largeCardElement.style.transform = 'translateX(0%)';
    }
}

function generateLargeCard(task) {
    let currentPriorityContent = task.priorityContent || ''; 

let tempDiv = document.createElement('div');
tempDiv.innerHTML = currentPriorityContent;
tempDiv.classList.add('selectedPriorityContentDiv');

removeActiveClassFromSvgElements(tempDiv);

let clonedContentDiv = document.createElement('div');
clonedContentDiv.appendChild(tempDiv.cloneNode(true));

removeActiveClassFromSvgElements(clonedContentDiv);
    let currenCategory = task.category[0];
    let className = typeof currenCategory === 'string' ? currenCategory.replace(/\s+/g, '') : '';
    return /*html*/`
        <div class="largeCardA">
        <div class="largCardHeader">
            <div class="lardCardCategory">
                <p id="largeCategory" class="${className}">${currenCategory}</p>
            </div>
            <div class="closeLargeCardButton">
            <button onclick="closeCard()">X</button>
            </div>
        </div>
        <div class="largCardText">
            <div class="largCardTitle">
                <h1>${task.title}</h1>
            </div>
            <div class="largCardTextArea">
                <p>${task.description}</p>
            </div>
        </div>
        <div class="largeTaskDetails">
            <div class="largTaskDueDat">
                <div><span>Due Date:</span><span>${task.dueDate}</span></div>
            </div>
            <div class="largPrioDetail">
                <p>Priority:</p><p>${clonedContentDiv.innerHTML}</p>
            </div>
      
    `;
}

function closeCard() {
    // Your close logic goes here
    console.log("Card closed");
    const largeCardElement = document.getElementById('popUpWindow');
    largeCardElement.style.transform = 'translateX(500%)';
}
