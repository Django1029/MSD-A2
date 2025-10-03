// 引入需要的模块
const express = require('express');
const fs = require('fs');
const path = require('path');
const config = require('./config');

// 创建Express应用
const app = express();

// 中间件配置
app.use(express.json());  // 解析JSON格式的请求体
app.use(express.static('public'));  // 提供静态文件（HTML、CSS、JS）

// 数据文件路径
const tasksFile = config.data.tasksFile;

// 初始化任务数据文件（如果不存在的话）
function initializeTasksFile() {
    if (!fs.existsSync(tasksFile)) {
        const initialData = {
            tasks: [],
            lastId: 0
        };
        fs.writeFileSync(tasksFile, JSON.stringify(initialData, null, 2));
        console.log('The initial task data file has been created');
    }
}

// 读取所有任务
function readTasks() {
    try {
        const data = fs.readFileSync(tasksFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Failed to read the task data:', error);
        return { tasks: [], lastId: 0 };
    }
}

// 保存任务数据
function saveTasks(data) {
    try {
        fs.writeFileSync(tasksFile, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error('Failed to save the task data:', error);
        return false;
    }
}

// API路由 - 获取所有任务
app.get('/api/tasks', (req, res) => {
    const data = readTasks();
    res.json(data.tasks);
});

// API路由 - 添加新任务
app.post('/api/tasks', (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'The task title cannot be empty' });
    }

    const data = readTasks();
    const newTask = {
        id: data.lastId + 1,
        title,
        description: description || '',
        completed: false,
        createdAt: new Date().toISOString()
    };

    data.tasks.push(newTask);
    data.lastId = newTask.id;

    if (saveTasks(data)) {
        res.status(201).json(newTask);
    } else {
        res.status(500).json({ error: 'The save task failed.' });
    }
});

// API路由 - 更新任务状态
app.put('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const { completed } = req.body;

    const data = readTasks();
    const taskIndex = data.tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'The task was not found.' });
    }

    // 更新任务状态
    if (completed !== undefined) {
        data.tasks[taskIndex].completed = completed;
    }

    if (saveTasks(data)) {
        res.json(data.tasks[taskIndex]);
    } else {
        res.status(500).json({ error: 'The update task failed.' });
    }
});

// API路由 - 删除任务
app.delete('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);

    const data = readTasks();
    const taskIndex = data.tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: '"Not found"' });
    }

    // 删除任务
    data.tasks.splice(taskIndex, 1);

    if (saveTasks(data)) {
        res.json({ message: 'Task deletion successful' });
    } else {
        res.status(500).json({ error: 'Failed to delete the task' });
    }
});

// 提供前端页面
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 初始化并启动服务器
initializeTasksFile();

app.listen(config.server.port, () => {
    console.log(`${config.app.name} The server is running http://${config.server.host}:${config.server.port}`);
    console.log(`Application version: ${config.app.version}`);
});