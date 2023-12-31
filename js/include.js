async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html"); // "includes/header.html"
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

async function renderSummaryContent() {
  load();
  generateGreetingText();
  determineNumberTasks();
  document.getElementById("contentJoin").innerHTML = ``;
  document.getElementById("contentJoin").innerHTML = generateSummaryContent();
  removeStyleSidebar();
  addTextColor();
  document.getElementById("sidebarCategorySummary").classList.add("sidebarCategoryLinkActive");
}

function render_addTask() {
  document.getElementById("contentJoin").innerHTML = ``;
  document.getElementById("contentJoin").innerHTML = generate_addTask();
  removeStyleSidebar();
  addTextColor();
  document.getElementById("sidebarCategoryAddTask").classList.add("sidebarCategoryLinkActive");
  addTaskInit();
}

function render_contactsHtml() {
  document.getElementById("contentJoin").innerHTML = ``;
  document.getElementById("contentJoin").innerHTML = generate_contactsHtml();
  removeStyleSidebar();
  addTextColor();
  document.getElementById("sidebarCategoryContacts").classList.add("sidebarCategoryLinkActive");
  renderContacts();
}

function renderPrivacyPolicyContent() {
  document.getElementById("contentJoin").innerHTML = generatePrivacyPolicyContent();
  removeStyleSidebar();
  addTextColor();
  document.getElementById("sidebarCategoryPrivacyPolicy").classList.add("sidebarCategoryLinkActive");
  document.getElementById("sidebarTextPrivacyPolicy").classList.remove("dataProtectionTextColor");
}

function renderLegalNoticeContent() {
  document.getElementById("contentJoin").innerHTML = generateLegalNoticeContent();
  removeStyleSidebar();
  addTextColor();
  document.getElementById("sidebarCategoryLegalNotice").classList.add("sidebarCategoryLinkActive");
  document.getElementById("sidebarTextLegalNotice").classList.remove("dataProtectionTextColor");
}

function removeStyleSidebar() {
  document.getElementById("sidebarCategorySummary").classList.remove("sidebarCategoryLinkActive");
  document.getElementById("sidebarCategoryAddTask").classList.remove("sidebarCategoryLinkActive");
  document.getElementById("sidebarCategoryBorard").classList.remove("sidebarCategoryLinkActive");
  document.getElementById("sidebarCategoryContacts").classList.remove("sidebarCategoryLinkActive");
  document.getElementById("sidebarCategoryPrivacyPolicy").classList.remove("sidebarCategoryLinkActive");
  document.getElementById("sidebarCategoryLegalNotice").classList.remove("sidebarCategoryLinkActive");
}

function addTextColor() {
  document.getElementById("sidebarTextPrivacyPolicy").classList.add("dataProtectionTextColor");
  document.getElementById("sidebarTextLegalNotice").classList.add("dataProtectionTextColor");
}
