
let title = []; // Move it outside the window.onload function
let description = [];
let assigned = [];
let dueDate = [];
let prio = [];
let category = [];
let subtasks = [];
let subT = [];
let tasks = [];
let priorityContentArray = []; 
load();
addTask();


async function addTaskInit(){
    await includeHTML();
}

let selectedPriorityContent = '';
window.onload = function() {
   
    load();
    selectedPriorityContent = localStorage.getItem('selectedPriorityContent');
    render();


    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-task-bt')) {
            deleteTask(event);
        }
    });
};


function render() {

    let contactsList = document.getElementById('contactList');
contactsList.innerHTML = '';

// Iterate through contacts and create list elements
contacts.forEach(contact => {
    let contactElement = document.createElement('li');
    contactElement.classList.add('contactList');
    contactElement.innerHTML = `
        <img class ="abbreviation" src="" alt="" id="imgContactScr"></img>     
       
        <div class = "custom-checkbox">   
            <input class="inputCheckBox" type="checkbox" id="myCheckbox"></input>                       
            <label class ="nameContact" for="myCheckbox">${contact[0]}</label>                              
        </div>        
    
    `;
    contactsList.appendChild(contactElement);
});

    save();
}

// function selectAssigned(clickedElement) {
//     let selectText = clickedElement.querySelector('label').textContent;
//     let assignedElement = document.getElementById("assigned");

//     if (selectText !== 'Select contacts to assign') {
//         assigned.unshift(selectText);
//         save(); // Save the updated assigned array to localStorage

//         // Update the text content of the assigned element
//         assignedElement.querySelector('label').textContent = selectText;
//     }
// }

function selectAssigned(clickedElement) {
    let selectText = clickedElement.querySelector('.nameContact').textContent;
    let assignedElement = document.getElementById("assigned");

    if (selectText !== 'Select contacts to assign') {
        assigned.unshift(selectText);
        save(); // Save the updated assigned array to localStorage

        // Update the text content of the assigned element
        assignedElement.querySelector('nameContact').textContent = selectText;
    }
}


function addTask() {
    let titleValue = document.getElementById('title').value;
    document.getElementById('title').value = '';   
    title.unshift('titleValue');
    
    let descriptionValue = document.getElementById('description').value;
    document.getElementById('description').value = '';
    description.unshift(descriptionValue);
    
    let dueDateValue = document.getElementById('dueDate').value;
    document.getElementById('dueDate').value = '';
    dueDate.unshift(dueDateValue);
    
    let selectedPriority = document.querySelector('.priorityUrgent-active, .priorityMedium-active, .priorityLow-active');
    let priorityContent = selectedPriority ? selectedPriority.innerHTML : '';
    let selectedPriorityID = ''; // Initialize selectedPriorityID variable
    title.unshift(titleValue); 
 
    if (selectedPriority) {
        selectedPriorityID = selectedPriority.id; // Get the ID of the selected priority
    }
    
    
    priorityContentArray.unshift(priorityContent); // Store the priorityContent in the array
    let newTask = {
          subtasks: subtasks.slice() // Store a copy of subtasks in newTask
    };
    
    subT.unshift(subtasks.slice()); // Store a copy of subtasks in subT
    tasks.unshift(newTask); // Store the task object in the tasks array
    
   
    localStorage.setItem('selectedPriorityContent', priorityContent);
    document.getElementById('categorySelect').textContent = 'Select a task category';
    subtasks = []; // Reset subtasks array to empty
    save();
    
   
    render();   
    changeColour(selectedPriorityID);
    clearPrioActiveClass();
    taskSuccess();      
    updateSubtasksDisplay();
}

function clearTask() {

    subtasks = [];
    
    // Clear input values in render function
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('dueDate').value = '';
    document.getElementById('inputSubtasks').value = '';

    removeBorderColorAndHideIndicator('titleFieldRequired');
    removeBorderColorAndHideIndicator('descriptionFieldRequired');
    removeBorderColorAndHideIndicator('dueDateFieldRequired');
   

    let allSubtasksDiv = document.getElementById('allSubtasks');
    allSubtasksDiv.innerHTML = '';
    document.getElementById('taskCategory').value = '';

    clearPrioActiveClass();    
    clearTaskCategory();    
      
}


function save() {
    localStorage.setItem('title', JSON.stringify(title));
    localStorage.setItem('description', JSON.stringify(description));
    localStorage.setItem('dueDate', JSON.stringify(dueDate));
    localStorage.setItem('priorityContentArray', JSON.stringify(priorityContentArray)); 
    localStorage.setItem('subtasks', JSON.stringify(subtasks));
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Store tasks array in localStorage
    localStorage.setItem('category', JSON.stringify (category ));
    localStorage.setItem('subT', JSON.stringify(subT));
        
}                                
  
function load() {
    let titleAsText = localStorage.getItem('title');
    let descriptionAsText = localStorage.getItem('description');
    let dueDateAsText = localStorage.getItem('dueDate');
    let priorityContentArrayText = localStorage.getItem('priorityContentArray'); 
    let subtaskAsText = localStorage.getItem('subtasks');
    let tasksAsText = localStorage.getItem('tasks'); 
    let categoryAsText = localStorage.getItem('category');
    let subTAsText = localStorage.getItem('subT');
    
    if (titleAsText && descriptionAsText && dueDateAsText && priorityContentArrayText && subtaskAsText && subTAsText && categoryAsText) {
        title = JSON.parse(titleAsText);
        description = JSON.parse(descriptionAsText);
        dueDate = JSON.parse(dueDateAsText);
        priorityContentArray = JSON.parse(priorityContentArrayText); 
        subtasks = JSON.parse(subtaskAsText);
        tasks = JSON.parse(tasksAsText) || []; // Load tasks array or initialize as empty array
        subT =JSON.parse(subTAsText) || [];
        category =JSON.parse(categoryAsText) || [];
    }
}

//assigned to




function hideAssigned(event) {
    if (event.target.id !== "assigned") {
        let list = document.getElementById("listContact");
        let arrow = document.getElementById("arrowAssigned");
        let arrowDrop = document.getElementById("arrow_drop_downHoverAssigned");

        list.classList.toggle("hide");
        arrow.classList.toggle("rotate");
        arrowDrop.classList.toggle("rotate");
    }
}



//priority

function clearPrioActiveClass(){
    removePrioActiveClass('priorityUrgent'); // Replace 'priorityUrgent' with the desired ID
    removePrioActiveClass('priorityMedium'); // Replace 'priorityMedium' with the desired ID
    removePrioActiveClass('priorityLow'); // Replace 'priorityLow' with the desired ID
    removeImgPrioActive('priorityUrgent');
    removeImgPrioActive('priorityMedium');
    removeImgPrioActive('priorityLow');
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

function removePrioActiveClass(divID) {
    const prio = document.getElementById(divID);
    if (prio) {
        prio.classList.remove(`${divID}-active`);
    }
}

function removeImgPrioActive(divID) {
    const imgPaths = document.querySelectorAll(`.img-${divID}`);
    imgPaths.forEach(path => {
        path.classList.remove('imgPrio-active');
    });
}



//category
function clearTaskCategory() {
    document.getElementById('categorySelect').textContent = 'Select a task category';
}
        
 

function selectCategory(clickedElement) {
    let selectText = clickedElement.querySelector('p').getAttribute('value');
    let taskCategory = document.getElementById("taskCategory");
  

    if (selectText !== 'Select a task category') {
        category.unshift(selectText);
        category.push(categorySelect);
        save(); // Save the updated category array to localStorage      
        
        // Update the text content of the taskCategory element
        taskCategory.querySelector('p').textContent = selectText;
    }        
}

function hide(event) {    
    
    if (event.target.id !== "inputSubtasks") {
    let list = document.getElementById("list");
    let arrow = document.getElementById("arrow");
    let arrow_drop_downHover = document.getElementById("arrow_drop_downHover");

    list.classList.toggle("hide");
    arrow.classList.toggle("rotate");
    arrow_drop_downHover.classList.toggle("rotate");
    }
}


//subtasks

function addSubtasks() {
    const subtaskInput = document.getElementById('inputSubtasks').value;
    document.getElementById('inputSubtasks').value = '';
    subtasks.unshift(subtaskInput);

    updateSubtasksDisplay();
    save();
    hideVectorAndImgCheck();
    handleCheckClick();
}

function updateSubtasksDisplay() {
    const allSubtasksDiv = document.getElementById('allSubtasks');

    allSubtasksDiv.innerHTML = '';

    if (subtasks.length === 0) { //brauche ich das??
        
    } else {
        subtasks.forEach((subtask, index) => {
            const subtaskItemDiv = createSubtaskItem(subtask);
            const iconsContainer = createIconsContainer(subtaskItemDiv, subtask, index);

            subtaskItemDiv.appendChild(iconsContainer);
            allSubtasksDiv.appendChild(subtaskItemDiv);
        });
    }
}

function createSubtaskItem(subtaskText) {
    const subtaskItemDiv = document.createElement('div');
    subtaskItemDiv.classList.add('subtaskItem');

    const subtaskItemText = document.createElement('li');
    subtaskItemText.innerText = subtaskText;
    subtaskItemDiv.appendChild(subtaskItemText);

    return subtaskItemDiv;
}

function createIconsContainer(subtaskItemDiv, subtaskText, index) {
    const iconsContainer = document.createElement('div');
    iconsContainer.classList.add('iconsContainer');

    const editImg = createImage('./assets/img/edit_task.png', 'edit');
    iconsContainer.appendChild(editImg);

    const vector = createImage('./assets/img/vector.png', 'vector');
    iconsContainer.appendChild(vector);

    const deleteImg = createImage('./assets/img/delete_contacts.png', 'delete');
    iconsContainer.appendChild(deleteImg);
    deleteImg.addEventListener('click', () => handleDeleteClick(subtaskItemDiv, index));

    editImg.addEventListener('click', () => handleEditClick(subtaskItemDiv, subtaskText));
    return iconsContainer;
}

function createImage(src, className) {
    const img = document.createElement('img');
    img.classList.add(className);
    img.src = src;
    return img;
}

function createIconsContainerWhenEdit(subtaskItemDiv, subtaskText, index) {
    const iconsContainerWhenEdit = document.createElement('div');
    iconsContainerWhenEdit.classList.add('iconsContainer');

    const deleteImg = createImage('./assets/img/delete_contacts.png', 'delete');
    iconsContainerWhenEdit.appendChild(deleteImg);
    deleteImg.addEventListener('click', () => handleDeleteClick(subtaskItemDiv, index));

    const vector = createImage('./assets/img/vector.png', 'vector');
    iconsContainerWhenEdit.appendChild(vector);

    const check = createImage('./assets/img/done.png', 'subtaskCheck');
    iconsContainerWhenEdit.appendChild(check);

    check.addEventListener('click', () => handleCheckClick(subtaskItemDiv, iconsContainerWhenEdit, subtaskText));

    return iconsContainerWhenEdit;
}

function handleDeleteClick(subtaskItemDiv, index) {
    subtasks.splice(index, 1);
    subtaskItemDiv.remove();
    save();
}


function handleEditClick(subtaskItemDiv, subtaskText) {
    if (!subtaskItemDiv || !subtaskText) {
        return;
    }

    const subtaskItemText = subtaskItemDiv.querySelector('li');

    if (subtaskItemText) {
        const currentText = subtaskItemText.innerText;

        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = currentText;
        editInput.style.outline = 'none';
        editInput.style.border = 'none';
       

        subtaskItemDiv.replaceChild(editInput, subtaskItemText);
        
        subtaskItemDiv.style.backgroundColor = ('white');

        editInput.focus();

        editInput.addEventListener('blur', function () {
            let newText = editInput.value.trim();

            if (newText !== '') {
                subtaskItemText.innerText = newText;
                subtasks[subtasks.indexOf(subtaskText)] = newText;
                save();
            } else {
                editInput.value = currentText;
            }
        });

        editInput.addEventListener('keyup', function (event) {
            if (event.key === 'Enter') {
                editInput.blur();
            }
        });

        const iconsContainer = createIconsContainerWhenEdit(subtaskItemDiv, subtaskText, subtasks.indexOf(subtaskText));
        subtaskItemDiv.replaceChild(iconsContainer, subtaskItemDiv.lastChild); // Replace iconsContainerWhenEdit with regular iconsContainer
    }
}


function handleCheckClick(subtaskItemDiv, iconsContainer, subtaskText) {
    if (!subtaskItemDiv || !iconsContainer || !subtaskText) {
        return;
    }

    const editInput = subtaskItemDiv.querySelector('input'); // Find the existing input element

    if (editInput) {
        const newText = editInput.value.trim(); // Get the edited text from the input

        if (newText !== '') {
            const updatedSubtaskText = document.createElement('li'); // Create a new <li> element
            updatedSubtaskText.innerText = newText;

            subtasks[subtasks.indexOf(subtaskText)] = newText; // Update the subtasks array
            save();

            // Create a new icons container
            const newIconsContainer = createIconsContainer(subtaskItemDiv, newText, subtasks.indexOf(newText));

            // Replace the input and icons container with the updated <li> and icons
            subtaskItemDiv.innerHTML = '';
            subtaskItemDiv.appendChild(updatedSubtaskText);
            subtaskItemDiv.appendChild(newIconsContainer);
        } 
    }

    subtaskItemDiv.style.backgroundColor = '';
}

function hideVectorAndImgCheck(){
    let vectorAndImgCheck = document.getElementById("vectorAndImgCheck");
    let imgPlus = document.getElementById("addSubtasksPlus");
    let imgPlusContainer = document.getElementById("imgPlusContainer");
        if (vectorAndImgCheck && imgPlus) {
        vectorAndImgCheck.classList.toggle("d-none");
            imgPlus.classList.toggle("d-none");   
            imgPlusContainer.classList.toggle("d-none");
        }
}

//task_success

function taskSuccess(){
    const success = document. getElementById('task_succes');
    success.classList.remove('d-none'); 

    setTimeout(function(){
        document.getElementById('task_succes').classList.add('d-none')},1500); 
}


//required inputs

function handleInput(inputElement){
    const elementId = inputElement.id;
        if (elementId === 'title') {

        removeBorderColorAndHideIndicator('titleFieldRequired');
        } else if (elementId === 'description') {
            removeBorderColorAndHideIndicator('descriptionFieldRequired');
        } else if (elementId === 'dueDate') {
            removeBorderColorAndHideIndicator('dueDateFieldRequired');
        }        
}

function removeBorderColorAndHideIndicator(fieldId){
    const fieldIndicator = document.getElementById(fieldId);

    // Remove border color and hide the respective field indicator
    const frameSelector = getFrameSelector(fieldId);
    const frame = document.querySelector(frameSelector);

    if (frame) {
        frame.style.border = ''; // Remove border color
    }

    if (fieldIndicator) {
        fieldIndicator.style.display = 'none'; // Hide the specified field indicator
    }       
}
  

function getFrameSelector(fieldId) {
    switch (fieldId) {
        case 'titleFieldRequired':
            return '.title_frame14';
        case 'descriptionFieldRequired':
            return '.frame17';
        case 'dueDateFieldRequired':
            return '.dueDate_frame14';
        default:
            return '';
    }
}

//hide the specific indicator
function hideFieldIndicator(selector) {
    const fieldIndicator = document.querySelector(selector);
    if (fieldIndicator) {
        fieldIndicator.style.display = 'none';
    }
}


function required(element) {
    if (element.classList.contains('frame211')) {
        changeBorderColorAndDisplayField('.dueDate_frame14', '#dueDateFieldRequired');
        hideFieldIndicatorsExcept('#dueDateFieldRequired');
    } else if (element.classList.contains('frame203')) {
        changeBorderColorAndDisplayField('.title_frame14', '#titleFieldRequired');
        hideFieldIndicatorsExcept('#titleFieldRequired');
    } else if (element.classList.contains('frame207')) {
        changeBorderColorAndDisplayField('.frame17', '#descriptionFieldRequired');
        hideFieldIndicatorsExcept('#descriptionFieldRequired');
    }
}


function changeBorderColorAndDisplayField(frameSelector, fieldIndicatorSelector) {
    const frame = document.querySelector(frameSelector);
    const fieldIndicator = document.querySelector(fieldIndicatorSelector);

    if (frame) {
        frame.style.border = '1px solid #FF8190'; // Change border color
    }

    if (fieldIndicator) {
        fieldIndicator.style.display = 'block'; // Show the specified field indicator
    }
}

  // Hide all field indicators except the specified one
function hideFieldIndicatorsExcept(exceptSelector) {
    const allIndicators = document.querySelectorAll('#titleFieldRequired, #descriptionFieldRequired, #dueDateFieldRequired');
    allIndicators.forEach(indicator => {
        if (indicator !== document.querySelector(exceptSelector)) {
            indicator.style.display = 'none';
        }
    });
}



