let title = []; // Move it outside the window.onload function
let description = [];
let assigned = [];
let dueDate = [];
let prio = [];
let category = [];
let subtasks = [];
let priorityContentArray = []; 



load();
add();

async function addTaskInit(){
    await includeHTML();
}

let selectedPriorityContent = '';
window.onload = function() {
    load();
    selectedPriorityContent = localStorage.getItem('selectedPriorityContent');
    render();
};

function render() {
    let content = document.getElementById('inhalt');
    content.innerHTML = '';

    for (let i = 0; i < title.length; i++) {
        let currentTitle = title[i];
        let currentDescription = description[i];
        let currentDueDate = dueDate[i];
        let currentCategory = category[i];
        let currentSubTasks = subtasks[i];

        let currentPriorityContent = priorityContentArray[i] || '';

        let tempDiv = document.createElement('div');
        tempDiv.innerHTML = currentPriorityContent;

        let svgElements = tempDiv.querySelectorAll('.img-priorityUrgent, .img-priorityMedium, .img-priorityLow');
        svgElements.forEach(svgElement => {
            svgElement.classList.remove('imgPrio-active');
        });

        let clonedContentDiv = document.createElement('div');
        clonedContentDiv.appendChild(tempDiv.cloneNode(true));

        let clonedSvgElements = clonedContentDiv.querySelectorAll('.img-priorityUrgent, .img-priorityMedium, .img-priorityLow');
        clonedSvgElements.forEach(svgElement => {
            svgElement.classList.remove('imgPrio-active');
        });

        let noteElement = document.createElement('div');
        noteElement.classList.add('cardA');
        noteElement.innerHTML = `
            <p class="taskTitle"><b>${currentTitle}</b></p>
            <p class="description">${currentDescription}</p>
            <div class="taskDueDate">
                <p class="TitleDueDate">Due Date:</p>
                <div class="date">${currentDueDate}</div>
            </div>
            <div class="prio">
                <p class="titelPrio">Priority:</p>
                <div class="selectedPriorityContent">${clonedContentDiv.innerHTML}</div>
            </div>
            <div class="assigned">
                <div class="assignedSecond">assigned to:</div>
                <div class="assigns">rrrr</div>
            </div>
            <div class="category">
                <p >${currentCategory}</p>
            </div>
            <p class="subTasks">${currentSubTasks}</p>
        `;

        content.appendChild(noteElement);
    }
}

    function save() {
        localStorage.setItem('title', JSON.stringify(title));
        localStorage.setItem('description', JSON.stringify(description));
        localStorage.setItem('dueDate', JSON.stringify(dueDate));
        localStorage.setItem('priorityContentArray', JSON.stringify(priorityContentArray)); // Save the array to localStorage
    }
    

    
    function add() {
        let x = document.getElementById('title').value;
        document.getElementById('title').value = '';
        title.unshift(x);
    
        let y = document.getElementById('description').value;
        document.getElementById('description').value = '';
        description.unshift(y);
    
        let d = document.getElementById('dueDate').value;
        document.getElementById('dueDate').value = '';
        dueDate.unshift(d);
    
        let selectedPriority = document.querySelector('.priorityUrgent-active, .priorityMedium-active, .priorityLow-active');
        let priorityContent = selectedPriority ? selectedPriority.innerHTML : '';
    
        priorityContentArray.unshift(priorityContent); // Store the priorityContent in the array
    
        localStorage.setItem('selectedPriorityContent', priorityContent);
    
        save();
        render();
    }
    
    function changeColour(divID) {
        const selected = document.getElementById(divID);
        if (!selected) return; // Exit function if element with given ID is not found
    
        const urgent = document.getElementById('priorityUrgent');
        const medium = document.getElementById('priorityMedium');
        const low = document.getElementById('priorityLow');
    
        let priorities = [urgent, medium, low];
    
        for (let i = 0; i < priorities.length; i++) {
            let prio = priorities[i];
    
            if (prio && prio !== selected) {
                prio.classList.remove(`${prio.id}-active`);
                let imgPaths = document.querySelectorAll(`.img-${prio.id}`);
                imgPaths.forEach(path => {
                    path.classList.remove('imgPrio-active');
                });
            }
        }
    
        selected.classList.toggle(`${divID}-active`);
        let selectedImgPaths = document.querySelectorAll(`.img-${divID}`);
        selectedImgPaths.forEach(path => {
            path.classList.toggle('imgPrio-active');
        });
    }
    