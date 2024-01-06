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
        }
    }
}

function updateHtml() {
    updateHtmlForStatus('todo', 'todo');
    updateHtmlForStatus('inProgress', 'inProgress');
    updateHtmlForStatus('awaitFeedback', 'awaitFeedback');
    updateHtmlForStatus('done', 'done');
}


function startDragged(id){
    draggedElementId = id;
}

function generateSmallCard(task) {
    let currentCategory = task.category;  // Nutze die Kategorie aus dem task-Objekt
    let className = typeof currentCategory === 'string' ? currentCategory.replace(/\s+/g, '') : '';

    return /*html*/`
      <div class="smallCard cardA" draggable="true" ondragstart="startDragged(${task['id']})"> 
        <div class="category"><p class="${className}">${currentCategory}</p></div>
        <div class="taskText">
            <div class="taskTitle">${task.title}</div>
            <div class="taskDescription">${task.description}</div>
        </div>
        <div class="smallProgress">${task.subtasks.length}</div>
        <div class="smallCardFooter">
            <div class="assigend">${task.assigned}</div>
            <div class="priority">${task.priorityID}</div>
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


function moveIt(taskStatus) {
    tasks[draggedElementId][taskStatus] = taskStatus;
    updateHtml();
}


function allowDrop(ev) {
    ev.preventDefault();
  }