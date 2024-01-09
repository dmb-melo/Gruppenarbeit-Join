function generateBoardHTML() {
    return /*html*/ `
    <div class="popUpWindow" id="popUpWindow"></div>
     <div class="tasksToDo" id="tasks">
        <div class="searchBar">
            <div class="searchbarIn">
                <div class="headlineBoard">
                    <h1 class="titleBoard">Board</h1>
                    <div class= plusImgMobile>
                        <img class="plus_add_task_mobile" src="./assets/img/plus_add_task_mobile.svg" alt="">
                        <img class="plus_add_task_mobileHover" src="./assets/img/plus_add_task_mobileHover.svg" alt="">
                    </div>
                </div>
                <div class="searchBoxLeft">
                    <div class="searchBox">                   
                        <div class="searchinput">        
                            <input class="src" type="text" placeholder="Find Task" name="" id="">
                            <div class="searchImg">
                                <img src="./assets/img/vector.png" alt="">
                                <img class="board-search" src="./assets/img/board-search.png" alt="">
                                <img class="board-searchHover" src="./assets/img/board-searchHover.svg" alt="">                              
                            </div>                                                  
                        </div>                       
                    </div>
                    <div class="primaryBoard" onclick="render_addTask()">
                        <div class="textCreateTask">Add task</div>
                        <img class="imgCheckBlack" src="./assets/img/add.svg" alt="">              
                    </div>
                </div>
            </div>
        </div>
        <div class="taskAria">
            <!-- todo -->
            <section class="taskBoardTtle">
                <div class="todoHeadline headLineCss" id="TodoHeadline">
                    <h2 class="progressTitles">To Do</h2>
                    <a class="imgPlusTask"  href="#">
                        <img class="plusImg" src="./assets/img/imgPlusTask.svg">
                        <img class="plusImgHover" src="./assets/img/imgPlusHover.svg" alt="">
                    </a>
                </div>
            <!-- tskBoard -->
                <div class="tasksCardsDiv" id="todo" ondrop="moveIt('todo')"  ondragover="allowDrop(event); highlight('todo')" ondragleave="removeHighlight('todo')"> </div>
            </section>
            <!-- in Progress -->
            <section class="taskBoardTtle">
                <div class="inProgressHeadline headLineCss" id="inProgressHeadline">
                    <h2 class="progressTitles">In Progress</h2>
                    <a class="imgPlusTask"  href="#">
                        <img class="plusImg" src="./assets/img/imgPlusTask.svg">
                        <img class="plusImgHover" src="./assets/img/imgPlusHover.svg" alt="">
                    </a>
                </div>
                
            <!-- tskBoard -->
                <div class="inProgress tasksCardsDiv" id="inProgress" ondrop="moveIt('inProgress')"  ondragover="allowDrop(event); highlight('inProgress')" ondragleave="removeHighlight('inProgress')"> </div>            </section>
            <!-- Await Feedback -->
            <section class="taskBoardTtle">
                <div class="awaitFeedbackHeadline headLineCss" id="awaitFeedbackHeadline">
                    <h2 class="progressTitles">Await FeedBack</h2>
                    <a class="imgPlusTask"  href="#">
                        <img class="plusImg" src="./assets/img/imgPlusTask.svg">
                        <img class="plusImgHover" src="./assets/img/imgPlusHover.svg" alt="">
                    </a>
                </div>
                <!-- tskBoard -->
                <div class="awaitFeedback tasksCardsDiv" id="awaitFeedback" ondrop="moveIt('awaitFeedback')" ondragover="allowDrop(event); highlight('awaitFeedback')" ondragleave="removeHighlight('awaitFeedback')"> </div>
            </section>
            <!-- done -->
            <section class="taskBoardTtle">
                <div class="doneHeadline headLineCss" id="doneHeadline">
                    <h2 class="progressTitles">Done</h2>
                </div>
                <!-- tskBoard -->
                <div class="done tasksCardsDiv" id="done" ondrop="moveIt('done')" ondragover="allowDrop(event); highlight('done')" ondragleave="removeHighlight('done')" >
                </div>
            </section>
        </div>
    </div>

    
    `;
}