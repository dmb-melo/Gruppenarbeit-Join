function editLargCard(taskId) {
    console.log(taskId);
    document.getElementById('largesCard').classList.add('d-None');
    document.getElementById('addTaskLargeCard').innerHTML = '';
    document.getElementById('addTaskLargeCard').innerHTML = generateAddEditeTask(taskId);
    document.getElementById('addTaskLargeCard').style.width = '525px';
    document.getElementById('addTaskLargeCard').style.overflow = 'scroll';



}
