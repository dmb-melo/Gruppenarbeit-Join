let greetingText;
let numberToDo;
let numberProgress;
let numberFeedback;
let numberDone;
let expirationDateOfTask = [];
let dateOfTheNextUpcomingTask = [];

async function summraryInit() {
  await includeHTML();
  loadUserData();
  setInitialsInTheHeader();
  renderSummaryContent();
  loadContentGreeting();
}

function generateGreetingText() {
  let d = new Date();
  let time = d.getHours();
  if (time < 12) {
    greetingText = "Good morning!";
  }
  if (time > 12) {
    greetingText = "Good afternoon!";
  }
  if (time == 12) {
    greetingText = "Go eat lunch!";
  }
}

function determineNumberTasks() {
  resetNumbersTasks();
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i]["taskStatus"];
    let priority = tasks[i]["priorityID"];
    let expirationDate = tasks[i]["dueDate"];
    numberOfTasks++;
    validationOfTheContentOfTasks(task, priority, expirationDate);
  }
  validationOfTheMostRecentDate();
}

function validationOfTheContentOfTasks(task, priority, expirationDate) {
  if (task === "todo") {
    numberToDo++;
  }
  if (task === "inProgress") {
    numberProgress++;
  }
  if (task === "awaitFeedback") {
    numberFeedback++;
  }
  if (task === "done") {
    numberDone++;
  }
  if (priority === "priorityUrgent") {
    numberOfUrgentTasks++;
    expirationDateOfTask.push(expirationDate);
  }
}

function validationOfTheMostRecentDate() {
  if (expirationDateOfTask < 1) {
    dateOfTheNextUpcomingTask = "No";
  } else {
    expirationDateOfTask.sort((a, b) => b - a);
    let dateOfTask = expirationDateOfTask[0];
    formatDateOfTask(dateOfTask);
  }
}

function formatDateOfTask(dateOfTask) {
  let date = new Date(dateOfTask);
  let months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
  let day = date.getDate();
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  dateOfTheNextUpcomingTask = `${month} ${day}, ${year}`;
}

function resetNumbersTasks() {
  numberOfTasks = 0;
  numberToDo = 0;
  numberProgress = 0;
  numberFeedback = 0;
  numberDone = 0;
  numberOfUrgentTasks = 0;
  expirationDateOfTask = [];
  dateOfTheNextUpcomingTask = [];
}

function loadContentGreeting() {
  document.getElementById("greetingTextResponsive").innerHTML = greetingText;
  document.getElementById("userNameResponsive").innerHTML = userName;
}
