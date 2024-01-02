function generateBoardHTML() {
    return /*html*/ `
     <div class="tasksToDo" id="tasks">
        <div class="searchBar">
            <div class="searchbarIn">
                <div class="headlineBoard">
                    <h1>Board</h1>
                </div>
                <div class="searchBox">
                    <div class="searchinput">
                        <div class="src">
                            <input type="text" name="" id="">
                            <span><img src="./assets/img/board-search.png" alt=""></span>
                        </div>
                    </div>
                    <div class="addButton">
                        <button></button>
                    </div>
                </div>
            </div>
        </div>
        <div class="taskAria">
            <!-- todo -->
            <section class="taskBoardTtle">
                <div class="todoHeadline headLineCss" id="TodoHeadline">
                    <h2>To-Do</h2>
                    <a href="#">
                        <img src="./assets/img/capa-1.png" alt="">
                    </a>
                </div>
                <!-- tskBoard -->
                <div class="todo-id1 cardA " id="todo">
                    <div>
                        <div>
                            <div>Technical Task</div>
                        </div>
                        <span id="" class="d-None">
                            <a href="#">Inprogress</a>
                            <a href="#">Feedback</a>
                            <a href="#">Done</a>
                        </span>
                        <div>
                            <h1>title</h1>
                            <p>text</p>
                        </div>
                        <div class="progress-section" id="">
                            <div id="progress">
                                <div id="" class="progress-bar" role="progressbar" aria-valuenow="75" aria-valuemin="0"
                                    aria-valuemax="100" style="width: 0%;"></div>
                            </div>
                            <div>0/2 Subtasks</div>
                        </div>
                        <div class="card-footer">
                            <div class="w-100 d-flex justify-content-space-btw align-items-center">
                                <div class="profileBadges" id=""></div>
                                <div class="prioIcon" id="">
                                    <img src="./assets/img/prio-baja.png">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- in Progress -->
            <section class="taskBoardTtle">
                <div class="inProgressHeadline headLineCss" id="inProgressHeadline">
                    <h2>In Progress</h2>
                    <a href="#">
                        <img src="./assets/img/capa-1.png" alt="">
                    </a>
                </div>
                <!-- tskBoard -->
                <div class="inProgress" id="inProgress">
                  
                </div>
            </section>
            <!-- Await Feedback -->
            <section class="taskBoardTtle">

                <div class="awaitFeedbackHeadline headLineCss" id="awaitFeedbackHeadline">
                    <h2>Await FeedBack</h2>
                    <a href="#">
                        <img src="./assets/img/capa-1.png" alt="">
                    </a>
                </div>
                <!-- tskBoard -->
                <div class="awaitFreedback" id="awaitFreedback">
                   
                </div>
            </section>
            <!-- done -->
            <section class="taskBoardTtle">
                <div class="doneHeadline headLineCss" id="doneHeadline">
                    <h2>Done</h2>
                    <a href="#">
                        <img src="./assets/img/capa-1.png" alt="">
                    </a>
                </div>
                <!-- tskBoard -->
                <div class="done" id="done">
                   
                </div>
            </section>
        </div>

    </div>
    `;
}