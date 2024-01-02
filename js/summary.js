
async function summraryInit(){
    await includeHTML();
    loadUserData();
    setInitialsInTheHeader();
    renderSummaryContent();
}

