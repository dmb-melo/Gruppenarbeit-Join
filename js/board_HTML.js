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
                <div id="todo" ondrop="moveIt('todo')"  ondragover="allowDrop(event)"> </div>


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
                <div class="inProgress" id="inProgress" ondrop="moveIt('inProgress')"  ondragover="allowDrop(event)"> </div>


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
                <div class="awaitFeedback" id="awaitFeedback" ondrop="moveIt('awaitFeedback')" ondragover="allowDrop(event)"> </div>


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
                <div class="done" id="done" ondrop="moveIt('done')" ondragover="allowDrop(event)" >
                   
                </div>
            </section>
        </div>

    </div>
    `;
}