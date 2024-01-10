function editLargCard(taskId) {
    console.log(taskId);
    let editCard = document.getElementById('desingLagrCard');
    editCard.style.display = 'flex';
    editCard.style.alignItems = 'center';
    editCard.style.height = '100%';
    document.getElementById('largesCard').classList.add('d-None');

    document.getElementById('addTaskLargeCard').innerHTML = '';
    document.getElementById('addTaskLargeCard').innerHTML = generateAddEditeTask(taskId);


    document.getElementById('addTaskLargeCard').style.width = '525px';
    document.getElementById('addTaskLargeCard').style.overflow = 'scroll';

edittaskArea(taskId);
}


function edittaskArea() {
        document.getElementById('editTitle').value = tasks.title;
        document.getElementById('editDescription').value = tasks.description;
        document.getElementById('editDueDate').value = tasks.dueDate;
}