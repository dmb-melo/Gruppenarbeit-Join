function generateBoardHTML() {
    return /*html*/ `
     <div class="tasksToDo" id="tasks">
        <div class="searchBar">
            <div class="searchbarIn">
                <div class="headlineBoard">
                    <h1>Board</h1>
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
                    <div class="primary">
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
                <div id="todo" ondrop="moveIt('todo')"  ondragover="allowDrop(event)"> </div>
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
            </section>
            <!-- tskBoard -->
                <div class="inProgress" id="inProgress" ondrop="moveIt('inProgress')"  ondragover="allowDrop(event)"> </div>            </section>
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
                <div class="awaitFeedback" id="awaitFeedback" ondrop="moveIt('awaitFeedback')" ondragover="allowDrop(event)"> </div>
            </section>
            <!-- done -->
            <section class="taskBoardTtle">
                <div class="doneHeadline headLineCss" id="doneHeadline">
                    <h2 class="progressTitles">Done</h2>
                </div>
                <!-- tskBoard -->
                <div class="done" id="done" ondrop="moveIt('done')" ondragover="allowDrop(event)" >
                </div>
            </section>
        </div>
    </div>
    `;
}