document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    function saveTasks() {
        const tasks = [];
        for (let li of taskList.children) {
            let text = li.textContent;
            if (text.endsWith(" Remove")) {
                text = text.slice(0, -7);
            }
            tasks.push(text.trim());
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function addTask(taskText, save = true) {
        if (taskText.trim() === "") {
            alert('Please enter a task');
            return;
        }

        const li = document.createElement('li');
        li.textContent = taskText + " ";

        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn');

        removeBtn.onclick = function() {
            taskList.removeChild(li);
            saveTasks();
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        if (save) {
            saveTasks();
        }

        taskInput.value = '';
    }

    addButton.addEventListener('click', () => {
        addTask(taskInput.value);
    });

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });

    loadTasks();
});
