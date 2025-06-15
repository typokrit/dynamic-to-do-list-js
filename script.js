// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        // Get trimmed task text from input
        const taskText = taskInput.value.trim();

        // Check if input is empty
        if (taskText === "") {
            alert('Please enter a task');
            return;
        }

        // Create list item for the task
        const li = document.createElement('li');
        // Append task text as a text node to preserve children
        li.appendChild(document.createTextNode(taskText));

        // Create remove button for the task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Remove task on button click
        removeBtn.onclick = function() {
            taskList.removeChild(li);
        };

        // Append remove button to the list item
        li.appendChild(removeBtn);

        // Append the task to the task list
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = '';
    }

    // Add task when button is clicked
    addButton.addEventListener('click', addTask);

    // Add task when Enter key is pressed in the input field
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});

