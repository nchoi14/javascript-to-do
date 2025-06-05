document.addEventListener('DOMContentLoaded', function() {
    // Display today's current date in "Month day, year" format
    var dateDisplay = document.getElementById('todaysDate');
    var today = new Date();
    var formattedDate = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    dateDisplay.textContent = formattedDate;

    // Attach an event listener to the 'Add Task' button for adding new tasks
    var addButton = document.getElementById('addTaskButton');
    addButton.onclick = function() {
        addTask();
    };

    // Function to add new tasks
    function addTask() {
        var taskInput = document.getElementById('taskInput'); // Input field for new tasks
        var taskList = document.getElementById('pendingTasksList'); // Pending tasks section
        if (taskInput.value.trim() === '') {
            alert('Please write a new task!');
        } else {
            var taskItem = document.createElement('li'); // Creates a new list item
            var taskText = document.createElement('span'); // Span to hold the task text
            taskText.textContent = taskInput.value;
            taskItem.appendChild(taskText); // Add the text span to the list item
            taskList.appendChild(taskItem); // Add the list item to the pending list
            taskInput.value = ''; // Clear the input field
            attachTaskActions(taskItem); // Attach buttons for actions
            makeTasksDraggable(); // Reapply drag-and-drop to the list
        }
    }

    // Attach buttons (Delete, Complete, Edit, Move Up, Move Down)
    function attachTaskActions(item) {
        item.appendChild(createDeleteButton());
        item.appendChild(createCompleteButton());
        item.appendChild(createEditButton());
        item.appendChild(createMoveUpButton());
        item.appendChild(createMoveDownButton());
    }

    // Function to create Delete button
    function createDeleteButton() {
        var deleteButton = document.createElement('button');
        deleteButton.textContent = '🗑️';
        deleteButton.onclick = function() {
            this.parentNode.remove();
        };
        return deleteButton;
    }

    // Function to create Complete button
    function createCompleteButton() {
        var completeButton = document.createElement('button');
        completeButton.textContent = '✓';
        completeButton.onclick = function() {
            var completedTasks = document.getElementById('completedTasksList');
            this.parentNode.classList.add('completed');
            completedTasks.appendChild(this.parentNode);
            this.remove(); // Remove the complete button after moving
            makeTasksDraggable(); // Reapply drag-and-drop to the completed list
        };
        return completeButton;
    }

    // Function to create Edit button with save functionality | Referenced ChatGPT for Save functionality
    function createEditButton() {
        var editButton = document.createElement('button');
        editButton.textContent = '✏️ Edit';
        editButton.onclick = function() {
            var taskLi = this.parentNode;
            var taskSpan = taskLi.querySelector('span');
            
            if (this.textContent === '✏️ Edit') {
                // Replace task text with input field
                var taskInputField = document.createElement('input');
                taskInputField.type = 'text';
                taskInputField.value = taskSpan.textContent;
                taskLi.insertBefore(taskInputField, taskSpan);
                taskLi.removeChild(taskSpan);
                this.textContent = '💾 Save';
            } else {
                // Save edited text and replace input with span
                var taskInputField = taskLi.querySelector('input');
                var newText = taskInputField.value.trim();
                if (newText) { // Validate non-empty input
                    var updatedSpan = document.createElement('span');
                    updatedSpan.textContent = newText;
                    taskLi.insertBefore(updatedSpan, taskInputField);
                    taskLi.removeChild(taskInputField);
                    this.textContent = '✏️ Edit';
                } else {
                    alert('Task cannot be empty!');
                }
            }
        };
        return editButton;
    }

    // Function to create Move Up button
    function createMoveUpButton() {
        var moveUpButton = document.createElement('button');
        moveUpButton.textContent = '▲';
        moveUpButton.onclick = function() {
            var taskLi = this.parentNode;
            if (taskLi.previousElementSibling) {
                taskLi.parentNode.insertBefore(taskLi, taskLi.previousElementSibling);
            }
        };
        return moveUpButton;
    }

    // Function to create Move Down button
    function createMoveDownButton() {
        var moveDownButton = document.createElement('button');
        moveDownButton.textContent = '▼';
        moveDownButton.onclick = function() {
            var taskLi = this.parentNode;
            if (taskLi.nextElementSibling) {
                taskLi.parentNode.insertBefore(taskLi.nextElementSibling, taskLi);
            }
        };
        return moveDownButton;
    }

    // Drag-and-Drop functionality (with citation)
    function makeTasksDraggable() {
        const lists = document.querySelectorAll('.task-list');
        lists.forEach((list) => {
            const items = list.querySelectorAll('li');
            items.forEach((item) => {
                item.draggable = true;

                item.ondragstart = () => {
                    item.classList.add('dragging');
                };

                item.ondragend = () => {
                    item.classList.remove('dragging');
                };
            });

            list.ondragover = (e) => {
                e.preventDefault();
                const draggingItem = document.querySelector('.dragging');
                const afterElement = getDragAfterElement(list, e.clientY);
                if (afterElement == null) {
                    list.appendChild(draggingItem);
                } else {
                    list.insertBefore(draggingItem, afterElement);
                }
            };
        });
    }

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('li:not(.dragging)')];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    // Initialize drag-and-drop on load
    makeTasksDraggable();
});

/* 
The drag-and-drop functionality was adapted from:
"Drag and Drop Sortable List With Javascript (Simple Example)" 
by Code Boxx. https://code-boxx.com/drag-drop-sortable-list-javascript/#sec-list
*/
document.addEventListener('DOMContentLoaded', function() {
    // Display today's current date in "Month day, year" format
    var dateDisplay = document.getElementById('todaysDate');
    var today = new Date();
    var formattedDate = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    dateDisplay.textContent = formattedDate;

    // Attach an event listener to the 'Add Task' button for adding new tasks
    var addButton = document.getElementById('addTaskButton');
    addButton.onclick = function() {
        addTask();
    };

    // Function to add new tasks
    function addTask() {
        var taskInput = document.getElementById('taskInput'); // Input field for new tasks
        var taskList = document.getElementById('pendingTasksList'); // Pending tasks section
        if (taskInput.value.trim() === '') {
            alert('Please write a new task!');
        } else {
            var taskItem = document.createElement('li'); // Creates a new list item
            var taskText = document.createElement('span'); // Span to hold the task text
            taskText.textContent = taskInput.value;
            taskItem.appendChild(taskText); // Add the text span to the list item
            taskList.appendChild(taskItem); // Add the list item to the pending list
            taskInput.value = ''; // Clear the input field
            attachTaskActions(taskItem); // Attach buttons for actions
            makeTasksDraggable(); // Reapply drag-and-drop to the list
        }
    }

    // Attach buttons (Delete, Complete, Edit, Move Up, Move Down)
    function attachTaskActions(item) {
        item.appendChild(createDeleteButton());
        item.appendChild(createCompleteButton());
        item.appendChild(createEditButton());
        item.appendChild(createMoveUpButton());
        item.appendChild(createMoveDownButton());
    }

    // Function to create Delete button
    function createDeleteButton() {
        var deleteButton = document.createElement('button');
        deleteButton.textContent = '🗑️';
        deleteButton.onclick = function() {
            this.parentNode.remove();
        };
        return deleteButton;
    }

    // Function to create Complete button
    function createCompleteButton() {
        var completeButton = document.createElement('button');
        completeButton.textContent = '✓';
        completeButton.onclick = function() {
            var completedTasks = document.getElementById('completedTasksList');
            this.parentNode.classList.add('completed');
            completedTasks.appendChild(this.parentNode);
            this.remove(); // Remove the complete button after moving
            makeTasksDraggable(); // Reapply drag-and-drop to the completed list
        };
        return completeButton;
    }

    // Function to create Edit button with save functionality
    function createEditButton() {
        var editButton = document.createElement('button');
        editButton.textContent = '✏️ Edit';
        editButton.onclick = function() {
            var taskLi = this.parentNode;
            var taskSpan = taskLi.querySelector('span');
            
            if (this.textContent === '✏️ Edit') {
                // Replace task text with input field
                var taskInputField = document.createElement('input');
                taskInputField.type = 'text';
                taskInputField.value = taskSpan.textContent;
                taskLi.insertBefore(taskInputField, taskSpan);
                taskLi.removeChild(taskSpan);
                this.textContent = '💾 Save';
            } else {
                // Save edited text and replace input with span
                var taskInputField = taskLi.querySelector('input');
                var newText = taskInputField.value.trim();
                if (newText) { // Validate non-empty input
                    var updatedSpan = document.createElement('span');
                    updatedSpan.textContent = newText;
                    taskLi.insertBefore(updatedSpan, taskInputField);
                    taskLi.removeChild(taskInputField);
                    this.textContent = '✏️ Edit';
                } else {
                    alert('Task cannot be empty!');
                }
            }
        };
        return editButton;
    }

    // Function to create Move Up button
    function createMoveUpButton() {
        var moveUpButton = document.createElement('button');
        moveUpButton.textContent = '▲';
        moveUpButton.onclick = function() {
            var taskLi = this.parentNode;
            if (taskLi.previousElementSibling) {
                taskLi.parentNode.insertBefore(taskLi, taskLi.previousElementSibling);
            }
        };
        return moveUpButton;
    }

    // Function to create Move Down button
    function createMoveDownButton() {
        var moveDownButton = document.createElement('button');
        moveDownButton.textContent = '▼';
        moveDownButton.onclick = function() {
            var taskLi = this.parentNode;
            if (taskLi.nextElementSibling) {
                taskLi.parentNode.insertBefore(taskLi.nextElementSibling, taskLi);
            }
        };
        return moveDownButton;
    }

    // Drag-and-Drop functionality
    function makeTasksDraggable() {
        const lists = document.querySelectorAll('.task-list');
        lists.forEach((list) => {
            const items = list.querySelectorAll('li');
            items.forEach((item) => {
                item.draggable = true;

                item.ondragstart = () => {
                    item.classList.add('dragging');
                };

                item.ondragend = () => {
                    item.classList.remove('dragging');
                };
            });

            list.ondragover = (e) => {
                e.preventDefault();
                const draggingItem = document.querySelector('.dragging');
                const afterElement = getDragAfterElement(list, e.clientY);
                if (afterElement == null) {
                    list.appendChild(draggingItem);
                } else {
                    list.insertBefore(draggingItem, afterElement);
                }
            };
        });
    }

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('li:not(.dragging)')];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    // Initialize drag-and-drop on load
    makeTasksDraggable();
});
/* 
The drag-and-drop functionality was adapted from:
"Drag and Drop Sortable List With Javascript (Simple Example)" 
by Code Boxx. https://code-boxx.com/drag-drop-sortable-list-javascript/#sec-list
*/
/* Referenced W3 Schools To Do List: https://www.w3schools.com/howto/howto_js_todolist.asp */