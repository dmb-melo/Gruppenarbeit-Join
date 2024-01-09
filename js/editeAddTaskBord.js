function editLargCard(taskId) {
    console.log(taskId);
    document.getElementById('largesCard').classList.add('d-None');
    document.getElementById('addTaskLargeCard').innerHTML = '';
   document.getElementById('addTaskLargeCard').innerHTML = generateAddEditeTask(taskId);
   document.getElementById('addTaskLargeCard').style.width = '525px';
   document.getElementById('addTaskLargeCard').style.overflow = 'scroll';
   const selectedTask = findTaskById(taskId);

   // Überprüfe, ob der Task gefunden wurde
   if (selectedTask) {
       // Fülle die Input-Felder im Modal mit den Werten des ausgewählten Tasks
       document.getElementById('editTitle').value = selectedTask.title;
       document.getElementById('editCategory').value = selectedTask.category;
       document.getElementById('editDescription').value = selectedTask.description;
       document.getElementById('editSubs').value = selectedTask.subs;

       // Zeige das Modal an
       document.getElementById('editModal').style.display = 'block';
   } else {
       console.error('Selected task not found');
   }
}

function findTaskById(taskId) {
    // Hier solltest du deine Logik implementieren, um den Task anhand der ID zu finden.
    // Das könnte beispielsweise eine Schleife durch das Aufgabenarray sein.
    // Du musst sicherstellen, dass die Variable "tasks" definiert ist und die ID des Tasks dem übergebenen taskId entspricht.

    // Beispiel (ersetze dies durch deine tatsächliche Implementierung):
    const foundTask = tasks.find(task => task.id === taskId);
    return foundTask;
}