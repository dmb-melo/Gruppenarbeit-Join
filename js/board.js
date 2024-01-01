
function renderBoardHTML() {
    document.getElementById('contentJoin').innerHTML = ``;
    document.getElementById('contentJoin').innerHTML = generateBoardHTML();
    render();
}

function render() {
    // Annahme: Sie haben eine Funktion createTodoCard, die eine Todo-Karte erstellt

    // Hier erhalten Sie das Element mit der ID 'todo'
    const todoElement = document.getElementById('todo');
    todoElement.innerHTML ='';

    // Überprüfen, ob das Element vorhanden ist, und ob die Arrays Daten enthalten
    if (todoElement && title.length > 0 && description.length > 0) {
        // Erstellen Sie eine Todo-Karte mit den Daten aus den Arrays
        const todoCardHTML = createTodoCard(title[0], description[0], /* Weitere Daten aus Ihren Arrays */);

        // Setzen Sie den HTML-Inhalt des todo-Elements auf die erstellte Todo-Karte
        todoElement.innerHTML = todoCardHTML;
    }
}

// Annahme: createTodoCard ist eine Funktion, die HTML für eine Todo-Karte erstellt
function createTodoCard(title, description, /* Weitere Daten */) {
    return `
        <div class="todo-id1 cardA">
            <div>
                <div>
                    <div>Technical Task</div>
                </div>
                <span class="d-None">
                    <a href="#">Inprogress</a>
                    <a href="#">Feedback</a>
                    <a href="#">Done</a>
                </span>
                <div>
                    <h1>${title}</h1>
                    <p>${description}</p>
                </div>
                <div class="progress-section">
                    <div class="progress-bar" role="progressbar" aria-valuenow="75" aria-valuemin="0"
                        aria-valuemax="100" style="width: 0%;"></div>
                    <div>0/2 Subtasks</div>
                </div>
                <div class="card-footer">
                    <div class="w-100 d-flex justify-content-space-btw align-items-center">
                        <div class="profileBadges"></div>
                        <div class="prioIcon">
                            <img src="./assets/img/prio-baja.png">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Rufen Sie die render-Funktion auf, um die Todo-Karte anzuzeigen
render();
