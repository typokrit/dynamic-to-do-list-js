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

    function addTask(taskTextParam, save = true) {
        // If taskTextParam is undefined (i.e. called from button/input), get input and trim it
        const taskText = taskTextParam !== undefined ? taskTextParam : taskInput.value.trim();

        if (taskText === "") {
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

        if (taskTextParam === undefined) {
            taskInput.value = '';
        }
    }

    addButton.addEventListener('click', () => {
        addTask();
    });

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    loadTasks();
});
