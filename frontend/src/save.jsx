function saveTasks(username, tasks) {
    if (!username) return;
    localStorage.setItem(`tasks_${username}`, JSON.stringify(tasks));
}

function loadTasks(username) {
    if (!username) return [];
    const savedTasks = localStorage.getItem(`tasks_${username}`);
    return savedTasks ? JSON.parse(savedTasks) : [];
}

export { saveTasks, loadTasks };