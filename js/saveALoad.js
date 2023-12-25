const STORAGE_TOKEN = 'XULVXKXQ87YFSN0Q9PFZSMP577RV8CAJX896XQXQ';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


let tasks = [];


async function currentUserTaskSave() {
        await setItem('tasks', JSON.stringify(tasks));
}

async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json());
}



