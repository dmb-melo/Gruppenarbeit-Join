
function renderBoardHTML() {
    document.getElementById('contentJoin').innerHTML = ``;
    document.getElementById('contentJoin').innerHTML = generateBoardHTML();
    boardInit();
}


async function boardInit() {
    renderBoradTask();
}

function renderBoradTask() {
    let todo = document.getElementById('todo');
    todo.innerHTML = '';
for (let i = 0; i < array.length; i++) {
    const element = array[i];
    
}



//     todo.innerHTML = /*html*/`
//   <div class="theTask cardA">
//     <div class="category">
//         <p>User Story</p>
//     </div>
//     <div class="title">
//         <p>Die Kochwelt</p>
//     </div>
//     <div class="descraption">
//         <p>der Test der Aufgabe</p>
//     </div>
//     <div class="progress"></div>
//     <div class="contactsprio">
//         <div class="contactsCont"></div>
//         <div class="priorityCont"></div>
//     </div>
//   </div>  
// `;
}