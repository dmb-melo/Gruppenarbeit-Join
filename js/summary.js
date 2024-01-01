

async function summraryInit(){
    await includeHTML();
    loadUserData();
    setInitialsInTheHeader();
    renderSummaryContent();
}

function renderSummaryContent() {
    document.getElementById('contentJoin').innerHTML = ``;
    document.getElementById('contentJoin').innerHTML = generateSummaryContent();
}