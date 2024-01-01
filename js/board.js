async function boardInit() {
    await includeHTML();
    renderBoardHTML();
}

function renderBoardHTML() {
    document.getElementById('contentJoin').innerHTML = ``;
    document.getElementById('contentJoin').innerHTML = generateBoardHTML();
 
}



