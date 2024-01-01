let tasks = []; //title, dis, prio,e etc.

async function saveTasksUser() {
    await setItem('tasks', JSON.stringify(tasks));
}

async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: "POST", body: JSON.stringify(payload) }).then((res) => res.json());
}

async function loadTaskUser(){
    tasks = JSON.parse(await getItem("tasks"));
}