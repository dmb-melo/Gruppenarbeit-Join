
function getCategoryForPriority(priority) {
    switch (priority) {
      case "priorityUrgent":
        return "Urgent";
      case "priorityMedium":
        return "Medium";
      case "priorityLow":
        return "Low";
      default:
        return "";
    }
  }
  
  function clearPrioActiveClass() {
    const priorityElements = document.querySelectorAll(".priority");
    priorityElements.forEach((priority) => {
      if (!priority.classList.contains("priorityActive")) {
        priority.classList.remove("active");
      }
    });
  }
  
  let selectedPriority = null;
  
  function changeColour(divID) {
    const selected = document.getElementById(divID);
    if (selected === selectedPriority) return;
    resetPreviousPriority(selected);
    activateSelectedPriority(selected);
    updatePriorityElements(divID);
  }
  
  function resetPreviousPriority(selected) {
    if (selectedPriority) {
      selectedPriority.classList.remove("active");
      selectedPriority.style.color = "";
    }
  }
  
  function activateSelectedPriority(selected) {
    selected.classList.add("active");
    selected.style.color = "white";
    selectedPriority = selected;
  }
  
  function updatePriorityElements(divID) {
    const priorities = ["priorityUrgent", "priorityMedium", "priorityLow"];
    for (const priorityID of priorities) {
      const priorityElement = document.getElementById(priorityID);
      if (priorityElement && priorityElement !== selectedPriority) {
        resetPriorityStyles(priorityElement);
      }
    }
    toggleSelectedPriorityStyles(divID);
  }
  
  function resetPriorityStyles(priorityElement) {
    priorityElement.classList.remove(`${priorityElement.id}-active`);
    const imgPaths = document.querySelectorAll(`.img-${priorityElement.id}`);
    imgPaths.forEach((path) => {
      path.classList.remove("imgPrio-active");
    });
    const textElement = priorityElement.querySelector(`.text${priorityElement.id.slice(8)}`);
    if (textElement) {
      textElement.style.color = "";
    }
  }
  
  function toggleSelectedPriorityStyles(divID) {
    const selected = document.getElementById(divID);
    selected.classList.toggle(`${divID}-active`);
    const selectedImgPaths = document.querySelectorAll(`.img-${divID}`);
    selectedImgPaths.forEach((path) => {
      path.classList.toggle("imgPrio-active");
    });
    const selectedTextElement = selected.querySelector(`.text${divID.slice(8)}`);
    if (selectedTextElement) {
      const isCurrentlyActive = selected.classList.contains(`${divID}-active`);
      const previousActivePriority = document.querySelector(`.${selectedPriority.id}-active`);
      if (previousActivePriority && previousActivePriority !== selected) {
        const previousTextElement = previousActivePriority.querySelector(`.text${previousActivePriority.id.slice(8)}`);
        if (previousTextElement) {
          previousTextElement.style.color = "";
        }
      }
      selectedTextElement.style.color = isCurrentlyActive ? "white" : "";
    }
  }
  
  function removePriorityStyles(prio) {
    prio.classList.remove(`${prio.id}-active`);
    toggleImgPrioActive(prio.id);
  
    const textElement = prio.querySelector(`.text${prio.id.slice(8)}`);
    if (textElement) {
      textElement.removeAttribute("style");
    }
  }
  
  function toggleImgPrioActive(divID) {
    const imgPaths = document.querySelectorAll(`.img-${divID}`);
    imgPaths.forEach((path) => {
      path.classList.toggle("imgPrio-active");
    });
  }
  
  function updateTextElementColor(textElement, isCurrentlyActive) {
    textElement.style.color = isCurrentlyActive ? "white" : "";
  }
  
  function resetPriorityTextColors() {
    const urgent = document.getElementById("priorityUrgent");
    const medium = document.getElementById("priorityMedium");
    const low = document.getElementById("priorityLow");
  
    resetTextColor(urgent);
    resetTextColor(medium);
    resetTextColor(low);
  }
  
  function resetTextColor(prio) {
    if (prio) {
      let textElement = prio.querySelector(`.text${prio.id.slice(8)}`);
      if (textElement) {
        textElement.style.color = "";
      }
    }
  }
  
  function removePrioActiveClass(divID) {
    const prio = document.getElementById(divID);
    if (prio) {
      prio.classList.remove(`${divID}-active`);
    }
  }
  
  function removeImgPrioActive(divID) {
    const imgPaths = document.querySelectorAll(`.img-${divID}`);
    imgPaths.forEach((path) => {
      path.classList.remove("imgPrio-active");
    });
  }
  
  function clearTaskCategory() {
    document.getElementById("categorySelect").textContent = "Select a task category";
  }
  
  function selectCategory(clickedElement) {
    let selectText = clickedElement.querySelector("p").getAttribute("value");
    let taskCategory = document.getElementById("taskCategory");
    let categoryFrame74 = document.getElementById("categoryFrame_74");
    categoryFrame74.style.border = "";
    if (selectText !== "Select a task category") {
      category = [];
      category.unshift(selectText);
      category.push(categorySelect);
      save();
      taskCategory.querySelector("p").textContent = selectText;
    }
  }
  
  function hideListCategory() {
    let list = document.getElementById("list");
    let arrow = document.getElementById("arrow");
    let arrow_drop_downHover = document.getElementById("arrow_drop_downHover");  
    if (list && arrow && arrow_drop_downHover) {
      let isListVisible = !list.classList.contains("hide");  
      list.classList.add("hide");  
      if (isListVisible) {
        arrow.classList.toggle("rotate");
        arrow_drop_downHover.classList.toggle("rotate");
      }
    }
  }

  function hide(event) {
    if (event.target.id !== "inputSubtasks") {
      let list = document.getElementById("list");
      let arrow = document.getElementById("arrow");
      let arrow_drop_downHover = document.getElementById("arrow_drop_downHover");
      list.classList.toggle("hide");
      arrow.classList.toggle("rotate");
      arrow_drop_downHover.classList.toggle("rotate");
    }
  }
  
  function addSubtasks() {
    const subtaskInput = document.getElementById("inputSubtasks").value;
    document.getElementById("inputSubtasks").value = "";
    subtasks.unshift(subtaskInput);
    updateSubtasksDisplay();
    save();
    hideVectorAndImgCheck();
  }
  
  function updateSubtasksDisplay() {
    const allSubtasksDiv = document.getElementById("allSubtasks");
    allSubtasksDiv.innerHTML = "";
    if (subtasks.length === 0) {
    } else {
      subtasks.forEach((subtask, index) => {
        const subtaskItemDiv = createSubtaskItem(subtask);
        const iconsContainer = createIconsContainer(subtaskItemDiv, subtask, index);
        subtaskItemDiv.appendChild(iconsContainer);
        allSubtasksDiv.appendChild(subtaskItemDiv);
      });
    }
  }
  
  function createSubtaskItem(subtaskText) {
    const subtaskItemDiv = document.createElement("div");
    subtaskItemDiv.classList.add("subtaskItem");
    const subtaskItemText = document.createElement("li");
    subtaskItemText.innerText = subtaskText;
    subtaskItemDiv.appendChild(subtaskItemText);
    subtaskItemDiv.addEventListener("dblclick", function () {
      handleEditClick(subtaskItemDiv, subtaskText);
    });
    return subtaskItemDiv;
  }
  
  function createIconsContainer(subtaskItemDiv, subtaskText, index) {
    const iconsContainer = document.createElement("div");
    iconsContainer.classList.add("iconsContainer");
    const editImg = createImage("./assets/img/edit_task.png", "editSubTask");
    iconsContainer.appendChild(editImg);
    const vector = createImage("./assets/img/vector.png", "vector");
    iconsContainer.appendChild(vector);
    const deleteImg = createImage("./assets/img/delete_contacts.png", "delete");
    iconsContainer.appendChild(deleteImg);
    deleteImg.addEventListener("click", () => handleDeleteClick(subtaskItemDiv, index));
    editImg.addEventListener("click", () => handleEditClick(subtaskItemDiv, subtaskText));
    return iconsContainer;
  }
  
  function createImage(src, className) {
    const img = document.createElement("img");
    img.classList.add(className);
    img.src = src;
    return img;
  }
  
  function createIconsContainerWhenEdit(subtaskItemDiv, subtaskText, index) {
    const iconsContainerWhenEdit = document.createElement("div");
    iconsContainerWhenEdit.classList.add("iconsContainer");
    const deleteImg = createImage("./assets/img/delete_contacts.png", "delete");
    deleteImg.classList.add("delete");
    iconsContainerWhenEdit.appendChild(deleteImg);
    deleteImg.addEventListener("click", () => handleDeleteClick(subtaskItemDiv, index));
    const vector = createImage("./assets/img/vector.png", "vector");
    iconsContainerWhenEdit.appendChild(vector);
    const check = createImage("./assets/img/done.png", "subtaskCheck");
    check.classList.add("subtasksCheck");
    iconsContainerWhenEdit.appendChild(check);
    check.addEventListener("click", () => handleCheckClick(subtaskItemDiv, iconsContainerWhenEdit, subtaskText));
    return iconsContainerWhenEdit;
  }
  
  function handleDeleteClick(subtaskItemDiv, index) {
    subtasks.splice(index, 1);
    subtaskItemDiv.remove();
    save();
  }
  
  function handleEditClick(subtaskItemDiv, subtaskText) {
    if (!subtaskItemDiv || !subtaskText) {
      return;
    }
    const subtaskItemText = subtaskItemDiv.querySelector("li");
    if (subtaskItemText) {
      startEditing(subtaskItemDiv, subtaskItemText, subtaskText);
    }
  }
  
  function startEditing(subtaskItemDiv, subtaskItemText, subtaskText) {
    const currentText = subtaskItemText.innerText;
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = currentText;
    editInput.style.outline = "none";
    editInput.style.border = "none";
    subtaskItemDiv.replaceChild(editInput, subtaskItemText);
    subtaskItemDiv.style.backgroundColor = "white";
    editInput.focus();
    editInput.addEventListener("blur", function () {
      finishEditing(editInput, subtaskItemText, subtaskText);
    });
    editInput.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        editInput.blur();
      }
    });
    const iconsContainer = createIconsContainerWhenEdit(subtaskItemDiv, subtaskText, subtasks.indexOf(subtaskText));
    subtaskItemDiv.replaceChild(iconsContainer, subtaskItemDiv.lastChild);
  }
  
  function finishEditing(editInput, subtaskItemText, subtaskText) {
    let newText = editInput.value.trim();
  
    if (newText !== "") {
      subtaskItemText.innerText = newText;
      subtasks[subtasks.indexOf(subtaskText)] = newText;
      save();
    } else {
      editInput.value = subtaskItemText.innerText;
    }
  }
  
  function handleCheckClick(subtaskItemDiv, iconsContainer, subtaskText) {
    if (!subtaskItemDiv || !iconsContainer || !subtaskText) {
      return;
    }
    const editInput = subtaskItemDiv.querySelector("input");
    if (editInput) {
      const newText = editInput.value.trim();
      if (newText !== "") {
        const updatedSubtaskText = document.createElement("li");
        updatedSubtaskText.innerText = newText;
        subtasks[subtasks.indexOf(subtaskText)] = newText;
        save();
        const newIconsContainer = createIconsContainer(subtaskItemDiv, newText, subtasks.indexOf(newText));
        subtaskItemDiv.innerHTML = "";
        subtaskItemDiv.appendChild(updatedSubtaskText);
        subtaskItemDiv.appendChild(newIconsContainer);
      }
    }
    subtaskItemDiv.style.backgroundColor = "";
  }
  
  function hideVectorAndImgCheck() {
    let vectorAndImgCheck = document.getElementById("vectorAndImgCheck");
    let imgPlus = document.getElementById("addSubtasksPlus");
    let imgPlusContainer = document.getElementById("imgPlusContainer");
    if (vectorAndImgCheck && imgPlus) {
      vectorAndImgCheck.classList.toggle("d-none");
      imgPlus.classList.toggle("d-none");
      imgPlusContainer.classList.toggle("d-none");
    }
  }
  
  async function handleTaskClick(event) {
    if (event) {
      event.preventDefault();
    }
    let titleValue = document.getElementById("title").value;
    let categoryValue = document.getElementById("categorySelect").textContent;
    let dueDateValue = document.getElementById("dueDate").value;
    if (!checkRequiredFields(titleValue, dueDateValue, categoryValue)) {
      return;
    }
    await addTask();
    setTimeout(async function () {
      await renderBoardHTML();
    }, 1500);
  
    let selectedPriority = document.querySelector(".priorityUrgent-active, .priorityMedium-active, .priorityLow-active");
    if (selectedPriority) {
      preselectedCategory = getCategoryForPriority(selectedPriority.id);
    }
  }
  
  async function renderBoardHTML() {
    document.getElementById("contentJoin").innerHTML = await generateBoardHTML();
    await boardInit();
    window.location.href = "./board.html";
  }
  
  function taskSuccess() {
    const success = document.getElementById("task_succes");
    success.classList.remove("d-none");
    setTimeout(function () {
      document.getElementById("task_succes").classList.add("d-none");
    }, 1500);
  }
  
  function handleInput(inputElement) {
    const elementId = inputElement.id;
    if (elementId === "title") {
      removeBorderColorAndHideIndicator("titleFieldRequired");
    } else if (elementId === "taskCategory") {
      removeBorderColorAndHideIndicator("taskCategory");
    } else if (elementId === "dueDate") {
      removeBorderColorAndHideIndicator("dueDateFieldRequired");
    }
  }
  
  function checkRequiredFields(titleValue, dueDateValue, categoryValue) {
    if (!titleValue || !titleValue.trim()) {
      changeBorderColorAndDisplayField(".title_frame14", "#titleFieldRequired");
      hideFieldIndicatorsExcept("#titleFieldRequired");
      return false;
    }
    if (!dueDateValue || !dueDateValue.trim()) {
      changeBorderColorAndDisplayField(".dueDate_frame14", "#dueDateFieldRequired");
      hideFieldIndicatorsExcept("#dueDateFieldRequired");
      return false;
    }
    if (!categoryValue || !categoryValue.trim() || categoryValue === "Select a task category") {
      changeBorderColorAndDisplayField(".categoryFrame_74");
      return false;
    }
    return true;
  }
  
  function removeBorderColorAndHideIndicator(fieldId) {
    const fieldIndicator = document.getElementById(fieldId);
    const frameSelector = getFrameSelector(fieldId);
    if (frameSelector) {
      const frame = document.querySelector(frameSelector);
      if (frame) {
        frame.style.border = "";
      }
    }
    if (fieldIndicator) {
      fieldIndicator.style.display = "none";
    }
  }
  
  function getFrameSelector(fieldId) {
    switch (fieldId) {
      case "titleFieldRequired":
        return ".title_frame14";
      case "dueDateFieldRequired":
        return ".dueDate_frame14";
      default:
        return "";
    }
  }
  
  function hideFieldIndicator(selector) {
    const fieldIndicator = document.querySelector(selector);
    if (fieldIndicator) {
      fieldIndicator.style.display = "none";
    }
  }
  
  function required(element) {
    if (element.classList.contains("frame211")) {
      changeBorderColorAndDisplayField(".dueDate_frame14", "#dueDateFieldRequired");
      hideFieldIndicatorsExcept("#dueDateFieldRequired");
    } else if (element.classList.contains("frame203")) {
      changeBorderColorAndDisplayField(".title_frame14", "#titleFieldRequired");
      hideFieldIndicatorsExcept("#titleFieldRequired");
    } else if (element.classList.contains("categoryFrame_74")) {
      changeBorderColorAndDisplayField(".categoryFrame_74");
    }
  }
  
  function changeBorderColorAndDisplayField(frameSelector, fieldIndicatorSelector) {
    const frame = document.querySelector(frameSelector);
    const fieldIndicator = document.querySelector(fieldIndicatorSelector);
    if (frame) {
      frame.style.border = "1px solid #FF8190";
    }
    if (fieldIndicator) {
      fieldIndicator.style.display = "block";
    }
  }
  
  function hideFieldIndicatorsExcept(exceptSelector) {
    const allIndicators = document.querySelectorAll("#titleFieldRequired, #dueDateFieldRequired");
    allIndicators.forEach((indicator) => {
      if (indicator !== document.querySelector(exceptSelector)) {
        indicator.style.display = "none";
      }
    });
  }
  