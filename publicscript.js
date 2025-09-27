const apiUrl = "/api/tasks";

async function loadTasks() {
  const res = await fetch(apiUrl);
  const tasks = await res.json();
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.text;
    const btn = document.createElement("button");
    btn.textContent = "Delete";
    btn.onclick = () => deleteTask(task.id);
    li.appendChild(btn);
    list.appendChild(li);
  });
}

async function addTask() {
  const input = document.getElementById("taskInput");
  if (!input.value) return;
  await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: input.value })
  });
  input.value = "";
  loadTasks();
}

async function deleteTask(id) {
  await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
  loadTasks();
}

window.onload = loadTasks;
