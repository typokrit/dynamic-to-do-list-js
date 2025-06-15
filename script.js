document.addEventListener('DOMContentLoaded', () => {
  // Select DOM elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load tasks from localStorage and populate the list
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false)); // false to avoid saving again
  }

  // Save all tasks currently in the list to localStorage
  function saveTasks() {
    const tasks = [];
    for (const li of taskList.children) {
      // Extract task text without "Remove" button text
      let text = li.textContent;
      if (text.endsWith(' Remove')) {
        text = text.slice(0, -7);
      }
      tasks.push(text.trim());
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Add a new task to the list and optionally save it
  // If taskText is undefined, get from input field
  function addTask(taskTextParam, save = true) {
    // Get trimmed task text from input or parameter
    const taskText = taskTextParam !== undefined ? taskTextParam : taskInput.value.trim();

    if (taskText === '') {
      alert('Please enter a task');
      return;
    }

    // Create list item
    const li = document.createElement('li');
    li.textContent = taskText + ' ';

    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');

    // Remove task from list and update localStorage on click
    removeBtn.onclick = () => {
      taskList.removeChild(li);
      saveTasks();
    };

    // Append remove button to list item and add to list
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Save tasks if requested
    if (save) {
      saveTasks();
    }

    // Clear input only if task was added from user input
    if (taskTextParam === undefined) {
      taskInput.value = '';
    }
  }

  // Add event listener to "Add Task" button
  addButton.addEventListener('click', () => {
    addTask();
  });

  // Add event listener for Enter key on input field
  taskInput.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // Load tasks from localStorage on page load
  loadTasks();
});
