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
            let currentAssigned = assigned[i];
            let currentDueDate = dueDate[i];
            let currentCategory = category[i];
            let currentSubTasks = subtasks[i];
            let currentPriorityContent = priorityContentArray[i]; // Retrieve priorityContent from array

            // Create a temporary div to handle the currentPriorityContent HTML
            let tempDiv = document.createElement('div');
            tempDiv.innerHTML = currentPriorityContent;

            // Find the SVG element within the currentPriorityContent
            let svgElement = tempDiv.querySelector('svg');
            if (svgElement) {
                svgElement.classList.remove('imgPrio-active'); // Remove imgPrio-active class if present
            }

            // Clone the modified content to prevent changes to the original
            let clonedContent = tempDiv.cloneNode(true);

            // Create the noteElement and set its innerHTML with the cloned content
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
                    <div class="selectedPriorityContent">${clonedContent.innerHTML}</div> <!-- Set the cloned content -->
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
        save();
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


function load() {
    let titleAsText = localStorage.getItem('title');
    let descriptionAsText = localStorage.getItem('description');
    let dueDateAsText = localStorage.getItem('dueDate');
    let priorityContentArrayText = localStorage.getItem('priorityContentArray'); // Retrieve the priorityContent array from localStorage

    if (titleAsText && descriptionAsText && dueDateAsText && priorityContentArrayText) {
        title = JSON.parse(titleAsText);
        description = JSON.parse(descriptionAsText);
        dueDate = JSON.parse(dueDateAsText);
        priorityContentArray = JSON.parse(priorityContentArrayText); // Parse the priorityContent array
    }
}


function changeColour(divID) {
    const selected = document.getElementById(divID);
    const urgent = document.getElementById('priorityUrgent');
    const medium = document.getElementById('priorityMedium');
    const low = document.getElementById('priorityLow');

    let priorities = [urgent, medium, low];

    for (let i = 0; i < priorities.length; i++) {
        let prio = priorities[i];

        if (prio !== selected) {
            prio.classList.remove(`${prio.id}-active`);
            let img = document.querySelector(`.img-${prio.id}`);
            img.classList.remove('imgPrio-active');
        }    
    }

    selected.classList.toggle(`${divID}-active`);
    let selectedImg = document.querySelector(`.img-${divID}`);
    selectedImg.classList.toggle('imgPrio-active');

}