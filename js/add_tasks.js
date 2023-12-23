

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
add();

async function addTaskInit(){
    await includeHTML();
    renderTakContent();
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
    let content = document.getElementById('inhalt');
    content.innerHTML = '';

    for (let i = 0; i < title.length; i++) {
        let currentTitle = title[i];
        let currentDescription = description[i];
        let currentAssigned = assigned[i];
        let currentDueDate = dueDate[i];
        let currentCategory = category[i];
        let currentSubTasks = subT[i];
      
        let currentPriorityContent = priorityContentArray[i] || '';

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

        let allSubtasksDiv = document.getElementById('allSubtasks');
        allSubtasksDiv.innerHTML = ''; // Clear existing content

        let subtasksContainer = document.createElement('div');
        subtasksContainer.classList.add('subtasksContainer');

        
        if (subtasks.length === 0) {
            allSubtasksDiv.innerHTML = '';
        }


        

        let noteElement = document.createElement('div');

      

// Convert currentCategory to a class name without spaces
let className = currentCategory.replace(/\s+/g, ''); // Removes spaces
        noteElement.classList.add('cardA');
        noteElement.innerHTML = `

             <div class="categoryCard">
                
                    <p class="${className}">${currentCategory}</p>
               
               
                <img src="./assets/img/Close.png" alt="">
            </div>

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
            
           
            <!-- Displaying subtasks -->


            <div class="subTasksCard">
            <div class="titleSubtasks">Subtasks</div>
                          



                            <div class="subtasksContainer">
    <!-- Loop through and generate checkboxes for subtasks -->
    ${currentSubTasks.map(subtask => `
        <div class="subtasksContents">
            <label class="checkbox-label">
                <input type="checkbox" class="checkbox-input">
                <span class="checkbox-custom"></span>
                ${subtask}
            </label>
        </div>
    `).join('')}

            </div>
           
            <!-- Button for deleting task -->
            <button class="delete-task-bt" onclick="deleteTask(event)">Delete Task</button>

            
        `;
        
    

        content.appendChild(noteElement);

        for (let i = 0; i < subtasks.length; i++) {
            let subtaskItem = document.createElement('div');
            subtaskItem.classList.add('subtaskItem');
            subtaskItem.innerText = subtasks[i];

            subtasksContainer.appendChild(subtaskItem);
        }

        // Append subtasks container to the designated div
        allSubtasksDiv.appendChild(subtasksContainer);
        
    }
        save();
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

        let selectedPriorityID = ''; // Initialize selectedPriorityID variable
 
    if (selectedPriority) {
        selectedPriorityID = selectedPriority.id; // Get the ID of the selected priority
    }
    
        priorityContentArray.unshift(priorityContent); // Store the priorityContent in the array
    
        let newTask = {
            subtasks: subtasks.slice() // Store a copy of subtasks in newTask
        };
    
        tasks.unshift(newTask); // Store the task object in the tasks array
        subT.unshift(subtasks.slice()); // Store a copy of subtasks in subT
    
        localStorage.setItem('selectedPriorityContent', priorityContent);
    
        subtasks = []; // Reset subtasks array to empty


        clearTaskCategory();
        save();
        changeColour(selectedPriorityID);
        render();   
        clearTask();    
    }

    function clearTaskCategory() {
        document.getElementById('taskCategory').textContent = 'Select a task category';
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
    


    function addSubtasks() {
        let subtaskInput = document.getElementById('inputSubtasks').value;
        document.getElementById('inputSubtasks').value = ''; // Set input value to empty after capturing subtask
        subtasks.unshift(subtaskInput);
       
    
        let allSubtasksDiv = document.getElementById('allSubtasks');
    
        if (subtasks.length === 0) {
            allSubtasksDiv.innerHTML = ''; // Clear allSubtasksDiv if subtasks array is empty
        } else {
            let subtaskItem = document.createElement('li');
            subtaskItem.classList.add('subtaskItem');
            subtaskItem.innerText = subtasks[0]; // Display only the most recent subtask
            allSubtasksDiv.appendChild(subtaskItem);
        }
        save(); // Save the updated subtasks array to localStorage
    }



    function deleteTask(event) {
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
            save();
            render();
        }
    }


    function clearTask() {
        
        // Clear input values in render function
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        document.getElementById('dueDate').value = '';
        document.getElementById('inputSubtasks').value = '';
       
    
        let allSubtasksDiv = document.getElementById('allSubtasks');
        allSubtasksDiv.innerHTML = '';
       

        removePrioActiveClass('priorityUrgent'); // Replace 'priorityUrgent' with the desired ID
        removePrioActiveClass('priorityMedium'); // Replace 'priorityMedium' with the desired ID
        removePrioActiveClass('priorityLow'); // Replace 'priorityLow' with the desired ID



        removeImgPrioActive('priorityUrgent');
        removeImgPrioActive('priorityMedium');
        removeImgPrioActive('priorityLow');

        document.getElementById('taskCategory').value = '';

    }

                               
    function selectCategory(clickedElement) {
        let selectText = clickedElement.querySelector('p').getAttribute('value');
        let taskCategory = document.getElementById("taskCategory");
    
        if (selectText && selectText !== 'Select a task category') {
            category.unshift(selectText);
            save(); // Save the updated category array to localStorage
            console.log('Category Array:', category); // Log the updated category array for testing
            
            // Update the text content of the taskCategory element
            taskCategory.querySelector('p').textContent = selectText;
        }
    }


 function hide(){
  
    let list = document.getElementById("list");
    let arrow = document.getElementById("arrow"); 
   
    list.classList.toggle("hide");
    arrow.classList.toggle("rotate");   
    arrow_drop_downHover.classList.toggle("rotate");
   
}

