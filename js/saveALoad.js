async function setItemFromTasks(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: "POST", body: JSON.stringify(payload) }).then((res) => res.json());
  }
  
  async function getItemFromTasks(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          return res.data.value;
        }
        throw `Could not find data with key "${key}".`;
      });
  }

  async function loadTasksFromServer() {
    try {
      tasks = JSON.parse(await getItemFromTasks("tasks"));
    } catch (e) {
      console.error("Loading error:", e);
    }
  }
  
  async function saveTasksToServer() {
    await setItemFromTasks("tasks", JSON.stringify(tasks));
  }