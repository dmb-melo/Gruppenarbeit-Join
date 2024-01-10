function editLargCard(taskId) {
    console.log(taskId);
    let editCard = document.getElementById('desingLagrCard');
    editCard.style.display = 'flex';
    editCard.style.alignItems = 'center';
    editCard.style.height = '100%';
    document.getElementById('largesCard').classList.add('d-None');

    document.getElementById('addTaskLargeCard').innerHTML = '';
    document.getElementById('addTaskLargeCard').innerHTML = generateAddEditeTask(taskId);


    document.getElementById('addTaskLargeCard').style.display = 'block';
    document.getElementById('addTaskLargeCard').style.width = '525px';
    document.getElementById('addTaskLargeCard').style.overflow = 'scroll';

edittaskArea(taskId);
}
function findTaskById(taskId) {
    const foundTask = tasks.find(task => task.id === taskId);
    return foundTask;
}   

function edittaskArea(taskId) {
    const foundTask = findTaskById(taskId);

    document.getElementById('editTitle').value = foundTask.title;
    document.getElementById('editDescription').value = foundTask.description;
    document.getElementById('editDueDate').value = foundTask.dueDate;


}