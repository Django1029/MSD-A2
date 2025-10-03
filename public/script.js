// �������ǰ��JavaScript����

// ҳ�������ɺ�ִ��
document.addEventListener('DOMContentLoaded', function () {
    // ��ȡDOMԪ��
    const taskForm = document.getElementById('taskForm');
    const taskTitleInput = document.getElementById('taskTitle');
    const taskDescriptionInput = document.getElementById('taskDescription');
    const tasksList = document.getElementById('tasksList');
    const noTasksMessage = document.getElementById('noTasksMessage');
    const loadingElement = document.getElementById('loading');
    const totalTasksSpan = document.getElementById('totalTasks');
    const completedTasksSpan = document.getElementById('completedTasks');
    const pendingTasksSpan = document.getElementById('pendingTasks');

    // ������������
    loadTasks();

    // ���ύ�¼� - ���������
    taskForm.addEventListener('submit', function (e) {
        e.preventDefault(); // ��ֹ��Ĭ���ύ��Ϊ

        const title = taskTitleInput.value.trim();
        const description = taskDescriptionInput.value.trim();

        if (title) {
            addTask(title, description);
        }
    });

    // ����������
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

    // �����������
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
                // ��ձ�
                taskTitleInput.value = '';
                taskDescriptionInput.value = '';

                // ���¼��������б�
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

    // ��������״̬����
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

            // ���¼��������б��Ը���ͳ����Ϣ
            loadTasks();
        } catch (error) {
            console.error('The update task failed.:', error);
        }
    }

    // ɾ��������
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
                // ���¼��������б�
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

    // ��ʾ�����б���
    function displayTasks(tasks) {
        // ��յ�ǰ�б�
        tasksList.innerHTML = '';

        if (tasks.length === 0) {
            tasksList.appendChild(noTasksMessage);
            noTasksMessage.style.display = 'block';
            return;
        }

        noTasksMessage.style.display = 'none';

        // Ϊÿ�����񴴽�HTMLԪ��
        tasks.forEach(task => {
            const taskElement = createTaskElement(task);
            tasksList.appendChild(taskElement);
        });
    }

    // ������������Ԫ�صĺ���
    function createTaskElement(task) {
        const taskDiv = document.createElement('div');
        taskDiv.className = `task-item ${task.completed ? 'completed' : ''}`;

        // ��ʽ������
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

    // ����ͳ����Ϣ����
    function updateStats(tasks) {
        const total = tasks.length;
        const completed = tasks.filter(task => task.completed).length;
        const pending = total - completed;

        totalTasksSpan.textContent = total;
        completedTasksSpan.textContent = completed;
        pendingTasksSpan.textContent = pending;
    }

    // ��ʾ/���ؼ���״̬����
    function showLoading(show) {
        loadingElement.style.display = show ? 'block' : 'none';
    }

    // HTMLת�庯������ֹXSS����
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ��������¶��ȫ���������Ա�HTML�е�onclick����
    window.toggleTask = function (taskId, completed) {
        updateTaskStatus(taskId, completed);
    };

    window.deleteTask = function (taskId) {
        deleteTask(taskId);
    };
});