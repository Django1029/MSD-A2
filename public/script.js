// 任务管理前端JavaScript代码

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function () {
    // 获取DOM元素
    const taskForm = document.getElementById('taskForm');
    const taskTitleInput = document.getElementById('taskTitle');
    const taskDescriptionInput = document.getElementById('taskDescription');
    const tasksList = document.getElementById('tasksList');
    const noTasksMessage = document.getElementById('noTasksMessage');
    const loadingElement = document.getElementById('loading');
    const totalTasksSpan = document.getElementById('totalTasks');
    const completedTasksSpan = document.getElementById('completedTasks');
    const pendingTasksSpan = document.getElementById('pendingTasks');

    // 加载所有任务
    loadTasks();

    // 表单提交事件 - 添加新任务
    taskForm.addEventListener('submit', function (e) {
        e.preventDefault(); // 阻止表单默认提交行为

        const title = taskTitleInput.value.trim();
        const description = taskDescriptionInput.value.trim();

        if (title) {
            addTask(title, description);
        }
    });

    // 加载任务函数
    async function loadTasks() {
        showLoading(true);

        try {
            const response = await fetch('/api/tasks');
            const tasks = await response.json();

            displayTasks(tasks);
            updateStats(tasks);
        } catch (error) {
            console.error('Failed loading task:', error);
            alert('The loading task failed. Please check if the server is running normally');
        } finally {
            showLoading(false);
        }
    }

    // 添加新任务函数
    async function addTask(title, description) {
        showLoading(true);

        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    description: description
                })
            });

            if (response.ok) {
                // 清空表单
                taskTitleInput.value = '';
                taskDescriptionInput.value = '';

                // 重新加载任务列表
                loadTasks();
            } else {
                const error = await response.json();
                alert('Failed to add the task: ' + error.error);
            }
        } catch (error) {
            console.error('Failed to add the task:', error);
            alert('The task addition failed. Please check the network connection');
        } finally {
            showLoading(false);
        }
    }

    // 更新任务状态函数
    async function updateTaskStatus(taskId, completed) {
        try {
            const response = await fetch(`/api/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    completed: completed
                })
            });

            if (!response.ok) {
                const error = await response.json();
                console.error('The update task failed.:', error);
            }

            // 重新加载任务列表以更新统计信息
            loadTasks();
        } catch (error) {
            console.error('The update task failed.:', error);
        }
    }

    // 删除任务函数
    async function deleteTask(taskId) {
        if (!confirm('Are you sure you want to delete this task?')) {
            return;
        }

        showLoading(true);

        try {
            const response = await fetch(`/api/tasks/${taskId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                // 重新加载任务列表
                loadTasks();
            } else {
                const error = await response.json();
                alert('Failed to delete the task: ' + error.error);
            }
        } catch (error) {
            console.error('Failed to delete the task:', error);
            alert('Failed to delete the task');
        } finally {
            showLoading(false);
        }
    }

    // 显示任务列表函数
    function displayTasks(tasks) {
        // 清空当前列表
        tasksList.innerHTML = '';

        if (tasks.length === 0) {
            tasksList.appendChild(noTasksMessage);
            noTasksMessage.style.display = 'block';
            return;
        }

        noTasksMessage.style.display = 'none';

        // 为每个任务创建HTML元素
        tasks.forEach(task => {
            const taskElement = createTaskElement(task);
            tasksList.appendChild(taskElement);
        });
    }

    // 创建单个任务元素的函数
    function createTaskElement(task) {
        const taskDiv = document.createElement('div');
        taskDiv.className = `task-item ${task.completed ? 'completed' : ''}`;

        // 格式化日期
        const createdDate = new Date(task.createdAt).toLocaleDateString('zh-CN');

        taskDiv.innerHTML = `
            <div class="task-checkbox">
                <input type="checkbox" ${task.completed ? 'checked' : ''} 
                       onchange="toggleTask(${task.id}, this.checked)">
            </div>
            <div class="task-content">
                <div class="task-title">${escapeHtml(task.title)}</div>
                ${task.description ? `<div class="task-description">${escapeHtml(task.description)}</div>` : ''}
                <div class="task-meta">Created in: ${createdDate}</div>
            </div>
            <div class="task-actions">
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        return taskDiv;
    }

    // 更新统计信息函数
    function updateStats(tasks) {
        const total = tasks.length;
        const completed = tasks.filter(task => task.completed).length;
        const pending = total - completed;

        totalTasksSpan.textContent = total;
        completedTasksSpan.textContent = completed;
        pendingTasksSpan.textContent = pending;
    }

    // 显示/隐藏加载状态函数
    function showLoading(show) {
        loadingElement.style.display = show ? 'block' : 'none';
    }

    // HTML转义函数，防止XSS攻击
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // 将函数暴露给全局作用域，以便HTML中的onclick调用
    window.toggleTask = function (taskId, completed) {
        updateTaskStatus(taskId, completed);
    };

    window.deleteTask = function (taskId) {
        deleteTask(taskId);
    };
});