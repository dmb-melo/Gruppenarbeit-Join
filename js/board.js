document.addEventListener('DOMContentLoaded', function () {
    renderBoardHTML();
});

function renderBoardHTML() {
    document.getElementById('contentJoin').innerHTML = ``;
    document.getElementById('contentJoin').innerHTML = generateBoardHTML();
    boardInit();
    load();
}


async function boardInit() {
    renderTasks(); // Korrigiere den Funktionsnamen
}




function renderTasks() {
    let tasksContainer = document.getElementById('todo');

    // Clear previous content
    tasksContainer.innerHTML = '';

    // Iterate through tasks array and create HTML elements for each task
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];

        // Create a div element for each task
        let taskElement = document.createElement('div');
        taskElement.classList.add('task');

        // Add task details to the HTML element
        taskElement.innerHTML = /*html*/`
            <div class="smallCard">
                <div class="cardCategory">
                    <h4>${task.category}</h4>
                </div>
                <div>
                    <div class="cardTitle">
                        <p><b>${task.title}</b></p>
                    </div>
                    <div class="cardText"><p>${task.description}</p></div>
                </div>
                <div class="progressSection"></div>
                <div class="cardFooter">
                    <div class="boardContact">${task.assigned}</div>
                </div>
            </div>
        `;

        // Append the task element to the container
        tasksContainer.appendChild(taskElement);
    }
}
{/* <h2>${task.title}</h2>
<p>${task.description}</p>
<p>Due Date: ${task.dueDate}</p>
<p>Assigned: ${task.assigned.join(', ')}</p>
<p>Priority: ${task.priorityContent}</p>
<p>Category: ${task.category}</p>
<p>${renderSubtasks(task.subtasks)}</p> */}
function renderSubtasks(subtasks) {
    // Check if there are any subtasks
    if (subtasks && subtasks.length > 0) {
        // Create an HTML element for subtasks
        let subtasksElement = document.createElement('ul');
        subtasksElement.classList.add('subtasks');

        // Iterate through subtasks and create list items
        for (let i = 0; i < subtasks.length; i++) {
            let subtask = subtasks[i];

            // Create a list item for each subtask
            let subtaskItem = document.createElement('li');
            subtaskItem.textContent = subtask;

            // Append the subtask item to the subtasks element
            subtasksElement.appendChild(subtaskItem);
        }

        // Return the HTML element containing subtasks
        return subtasksElement.outerHTML;
    }

    // Return an empty string if no subtasks are available
    return '';
}

// Rufe die Render-Funktion auf
renderTasks();
