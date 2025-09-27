const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const config = require("./config");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));


function loadTasks() {
  if (!fs.existsSync(config.dataFile)) return [];
  return JSON.parse(fs.readFileSync(config.dataFile));
}


function saveTasks(tasks) {
  fs.writeFileSync(config.dataFile, JSON.stringify(tasks, null, 2));
}


app.get("/api/tasks", (req, res) => {
  res.json(loadTasks());
});

app.post("/api/tasks", (req, res) => {
  let tasks = loadTasks();
  const newTask = { id: Date.now(), text: req.body.text };
  tasks.push(newTask);
  saveTasks(tasks);
  res.json(newTask);
});

app.delete("/api/tasks/:id", (req, res) => {
  let tasks = loadTasks();
  tasks = tasks.filter(t => t.id != req.params.id);
  saveTasks(tasks);
  res.json({ success: true });
});

app.listen(config.port, () => {
  console.log(`✅ Server running on http://localhost:${config.port}`);
});
