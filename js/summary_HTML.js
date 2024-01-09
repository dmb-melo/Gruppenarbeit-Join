function generateSummaryContent() {
    return /*html*/ `
    <div class="summaryMain" id="summaryMain">
        <div class="summaryContainer">
            <div class="summaryLeft">
                <div class="summaryHeader">
                    <span>
                        <h1 class="summary-headline">Summary</h1>
                    </span>
                    <div class="blueLineText">
                        <div class="blueLine"></div>
                        <div class="summaryKey"><span>Key Metrics at Glance</span></div>
                        <div class="blueLineResponsive"></div>
                    </div> 
                </div>
                <div class="summaryTaskContainer">
                    <div class="summaryTodoDone">
                        <!-- Links -->
                        <a onclick="renderBoardHTML()" class="toDoPanel">
                            <div class="toDoIcon editHover">
                                <img src="./assets/img/edit.png" alt="">
                            </div>
                            <div class="toDoAmount">
                                <div id="todosCrowd" class="taskNumber">${numberToDo}</div>
                                <div class="taskText">To-do</div>
                            </div>
                        </a>
                        <!--Rechts -->
                        <a onclick="renderBoardHTML()" class="toDoPanel">
                            <div class="toDoIcon checkhover">
                                <img src="./assets/img/Frame 59.png" alt="">
                            </div>
                            <div class="toDoAmount">
                                <div id="doneCrowd" class="taskNumber">${numberDone}</div>
                                <div class="taskText">Done</div>
                            </div>
                        </a>
                    </div>
                    <a onclick="renderBoardHTML()" class="summaryUrgendDeadLine toDoPanelBig">
                        <div class="urgend">
                            <img class="urgend-svg" src="./assets/img/pfeilerrauf.png" alt="">
                            <div id="urgendCrowd" class="taskNumber">${numberOfUrgentTasks}</div>
                            <div class="taskText">Urgend</div>
                        </div>
                        <div class="partingLine"></div>
                        <div class="deadline">
                            <p id="date"><b>${dateOfTheNextUpcomingTask}</b></p>
                            <p class="deadLineText">Upcoming Deadline</p>
                        </div>
                    </a>
                    <div class="summaryTasks">
                        <a onclick="renderBoardHTML()" class="taskspanels">
                            <div class="tasksNumber">${numberOfTasks}</div>
                            <div class="tasksText">Task in Borad</div>
                        </a>
                        <a onclick="renderBoardHTML()" class="taskspanels">
                            <div class="tasksNumber">${numberProgress}</div>
                            <div class="tasksText">Task in Progress</div>
                        </a>
                        <a onclick="renderBoardHTML()" class="taskspanels">
                            <div class="tasksNumber">${numberFeedback}</div>
                            <div class="tasksText">Task in Feedack</div>
                        </a>
                    </div>
                </div>
            </div>
            <div class="summaryRight">
                <div class="greetin">
                    <h2>${greetingText}</h2>
                    <p class="user-name"><b>${userName}</b></p>
                </div>
            </div>
        </div>
        <div class="summaryResponsiveGreeting">
                <h2>${greetingText}</h2>
                <p class="user-name"><b>${userName}</b></p>
        </div>
    </div>
    `;
}