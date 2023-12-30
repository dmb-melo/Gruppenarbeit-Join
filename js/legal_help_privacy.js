async function legalHelpPrivacyinit() {
  await includeHTML();
  loadUserData();
  setInitialsInTheHeader();
}

function closeHelp() {
        window.location.href = "./summary.html";
        document.getElementById('helpIcon').classList.remove('d-none');
}
