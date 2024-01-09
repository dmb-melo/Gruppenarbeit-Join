let draggedElementId;

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


function boardInit() {
    updateHtml();
    renderSmallContats();
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
            element.innerHTML += generateSmallCard(task, i);

        }
    }
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


function generateSmallCard(task, i) {
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
    let textMediumElement = clonedContentDiv.querySelector('.textMedium');
    if (textMediumElement) {
        textMediumElement.parentNode.removeChild(textMediumElement);
    }

    // Conditionally include the smallProgress div
    let smallProgressDiv = '';
    if (task.subtasks.length > 0) {
        smallProgressDiv = /*html*/`
            <div><div class="progress">
        <div class="progress-value"></div>
      </div><div class="smallProgress">${task.subtasks.length}</div></div>
        `;
    }

    return /*html*/`
      <div class="smallCard cardA" draggable="true" ondragstart="startDragged(${task['id']})" onclick="openCard(${task['id']})"> 
        <div class="smallCardcategory"><p id="category" class="${className}">${currenCategory}</p></div>
        <div class="taskText">
            <div class="taskTitle">${task.title}</div>
            <div class="taskDescription">${task.description}</div>
        </div>
        ${smallProgressDiv}
        <div class="smallCardFooter">
            <div id="boardAssigend${i}"></div>
            <div class="smallPrio" id="smallCardPrio">${clonedContentDiv.innerHTML}</div>
        </div>  
    `;
}


// Delet of Tasks 

function deleteTask(event) {// wird nicht mehr gebraucht
    let noteElement = event.target.closest('.largeCardA');

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
        closeCard();
    }
}

// drag and drop 
function startDragged(id) {
    draggedElementId = id;

}


function moveIt(taskStatus) {
    const taskIndex = tasks.findIndex(task => task.id === draggedElementId);

    if (taskIndex !== -1) {
        tasks[taskIndex].taskStatus = taskStatus;
        updateHtml();
        save();
        renderLargeContats();
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
    renderLargeContats();
}




function generateLargeCard(task) {
    let currentPriorityContent = task.priorityContent || '';
    const subsHtml = task.subtasks.map(subtask => `
    <div class="subtasksContents">
        <label class="checkbox-label">
            <input type="checkbox" class="checkbox-input">
            <span class="checkbox-custom"></span>
            ${subtask}
        </label>
    </div>
`).join('');
    let currentSubTasks = subT[task];
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
    
 <div class="largeCardA" id="largeCardA">
 <div id="addTaskLargeCard"></div>
 <div class="largesCard" id="largesCard">
    <div class="largeCardInside">
    <div class="largCardHeader">
        <!-- Category and close button -->
        <div class="lardCardCategory">
            <p id="largeCategory" class="${className}">${currenCategory}</p>
        </div>
        <div class="closeLargeCardButton">
            <button onclick="closeCard()">X</button>
        </div>
    </div>
    <div class="largCardText">
        <!-- Title and description -->
        <div class="largCardTitle">
            <h1>${task.title}</h1>
        </div>
        <div class="largCardTextArea">
            <p>${task.description}</p>
        </div>
    </div>
    <div class="largeTaskDetails">
        <!-- Due date, priority, assigned person, and subtasks -->
        <div class="largTaskDueDat">
            <div><span>Due Date:</span><span>${task.dueDate}</span></div>
        </div>
        <div class="largPrioDetail">
            <p>Priority:</p><p>${clonedContentDiv.innerHTML}</p>
        </div>
        <div class="assigned">
            <p>Assigned To:</p>
            <div  id="boardAssigendLargCard"></div>
        </div>
        <div class="subtasks">
            <p>Subtasks</p>
            <p>${subsHtml}</p>
  
        </div>
        <div class="largCardFooter">
        <div class="deleteAndEdit">
             
             <div class="delete_task" onclick="deleteTask(event)">
                 <img class="delete-task-bt"  src="./assets/img/delete_task.png" alt="">
                 <p class = "delete-task-title">Delete</p>
             </div>
             
             <img class="deleteAndEdit_vector" src="./assets/img/vector.png" alt="">
             
             <div class ="edit_task" onclick="editLargCard(${task.id})"  style="    display: flex; align-items: center; gap: 4px; cursor:pointer;">
             
                 <img class="imgEdit_task" src="./assets/img/edit_task.png" alt="">
                 <p class = "edit-task-title">Edit</p>
             </div>
           
         </div>            
        </div>
    </div>
    </div>

    `;

}
function closeCard() {
    // Your close logic goes here
    console.log("Card closed");
    const largeCardElement = document.getElementById('popUpWindow');
    largeCardElement.style.transform = 'translateX(500%)';
}

function renderSmallContats() {
    const contactsSmallCard = document.getElementById('boardAssigend');
    contacts.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        const contactsSmallCard = document.getElementById(`boardAssigend${i}`);
        const assigned = tasks[i]["assigned"];
    for (let a = 0; a < assigned.length; a++) {
        const assigendAvatar = assigned[a];
        let name = assigned[a];
        let firstname = name[0].toUpperCase(); // Ersten Buchstaben extrahieren und in Großbuchstaben umwandeln

        let names = assigned[a].split(" ");
        let surname = names[1].toUpperCase().charAt(0);
        contactsSmallCard.innerHTML += /*html*/`
             <div class="contact-info-left">
                    <div class="circle" id="circle-${a}" style="background-color: ${colors[a]}"><p class="nameIdList" id="name-id">${firstname}${surname}</p></div>
                </div>
        `;
    }}
}
function renderLargeContats() {
    const contactsLargeCard = document.getElementById('boardAssigendLargCard');
    contacts.innerHTML = '';
    console.log(contactsLargeCard);
    for (let d = 0; d < assigned.length; d++) {
        const assigendAvatar = assigned[d];
        let name = assigned[d];
        let firstname = name[0].toUpperCase(); // Ersten Buchstaben extrahieren und in Großbuchstaben umwandeln

        let names = assigned[d].split(" ");
        let surname = names[1].toUpperCase().charAt(0);
        contactsLargeCard.innerHTML += /*html*/`
             <div class="contact-info-left">
                    <div class="circle" id="circle-${d}" style="background-color: ${colors[d]}"><p class="nameIdList" id="name-id">${firstname}${surname}</p></div>
                </div>
        `;
    }
}

function editLargCard(taskId) {
    console.log(taskId);
    document.getElementById('largesCard').classList.add('d-None');
   document.getElementById('addTaskLargeCard').innerHTML = '';
   document.getElementById('addTaskLargeCard').innerHTML = generateAddEditeTask(taskId);
   


   
}