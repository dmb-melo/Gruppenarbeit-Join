

async function summraryInit(){
    await includeHTML();
   renderSummaryTaskBoard();
    
}
// id von er HTML
 //HTML ID
 

// array für die Sammry Seite

let todoCounts = {
    toDoStatus: 0,
    inProgressStatus: 0,
    doneStatus: 0,
    awaitFeedbackStatus: 0,
    urgentPriority: 0,
    closestDueDateForUrgent: null,
  };

function renderSummaryTaskBoard(){
    let summaryContainer = document.getElementById('summaryMain');
    summaryContainer.innerHTML = '';
    // for (let t = 0; t < array.length; t++) {
    //     const element = array[t];
    //     summaryContainer.innerHTML += renderSummary(t);
    // }
    summaryContainer.innerHTML += renderSummary();
}

function renderSummary (){
    return /*html*/`
        <div class="summaryContainer">
            <div class="summaryLeft">
                <div class="summaryHeader">
                    <span>
                        <h1><b>Summary</b></h1>
                    </span>
                    <div class="blueLineText">
                        <div class="blueLine"></div>
                        <div class="summaryKey"><span>key Metrics at Glance</span></div>
                    </div>
                </div>
                <div class="summaryTaskContainer">
                    <div class="summaryTodoDone">
                        <!-- Links -->
                        <a href="board.html" class="toDoPanel">
                            <div class="toDoIcon editHover">
                                <img src="./assets/img/edit.png" alt="">
                            </div>
                            <div class="toDoAmount">
                                <div id="todosCrowd" class="taskNumber">2</div>
                                <div class="taskText">To-do</div>
                            </div>
                        </a>
                        <!--Rechts -->
                        <a href="board.html" class="toDoPanel">
                            <div class="toDoIcon checkhover">
                                <img src="./assets/img/Frame 59.png" alt="">
                            </div>
                            <div class="toDoAmount">
                                <div id="doneCrowd" class="taskNumber">2</div>
                                <div class="taskText">Done</div>
                            </div>
                        </a>
                    </div>
                    <a href="board.html" class="summaryUrgendDeadLine toDoPanelBig">
                        <div class="urgend">
                            <img src="./assets/img/pfeilerrauf.png" alt="">
                            <div id="urgendCrowd" class="taskNumber">2</div>
                            <div class="taskText">Urgend</div>
                        </div>
                        <div class="partingLine"></div>
                        <div class="deadline">
                            <p id="date"><b>October 16, 2022</b></p>
                            <p class="deadLineText">Upcoming Deadline</p>
                        </div>
                    </a>
                    <div class="summaryTasks">
                        <a class="taskspanels" id="" href="board.html">
                            <div class="tasksNumber">5</div>
                            <div class="tasksText">Task in Borad</div>
                        </a>
                        <a class="taskspanels" id="" href="board.html">
                            <div class="tasksNumber">5</div>
                            <div class="tasksText">Task in Progress</div>
                        </a>
                        <a class="taskspanels" id="" href="board.html">
                            <div class="tasksNumber">5</div>
                            <div class="tasksText">Task in Feedack</div>
                        </a>
                    </div>
                </div>
            </div>
            <div class="summaryRight">
                <div class="greetin">
                    <h2>Guten Abend</h2>
                    <p><b>Bekir Labjani</b></p>
                </div>
            </div>
        </div>
    `
}