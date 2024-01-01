async function boardInit() {
    await includeHTML();
    render();
}

function renderBoardHTML() {
    document.getElementById('contentJoin').innerHTML = ``;
    document.getElementById('contentJoin').innerHTML = generateBoardHTML();
    boardInit();
}



