var form = document.getElementById('form');
var itemslist = document.getElementById('items');

// Event listeners
form.addEventListener('submit', addItem);
itemslist.addEventListener('click', deleteItem);
itemslist.addEventListener('click', completeItem);
document.addEventListener('DOMContentLoaded', getTasks);

// Add item
function addItem(e) {
    e.preventDefault();
    var input = document.getElementById('input').value.trim();
    if (input === '') return;

    var li = document.createElement('li');
    var deletebtn = document.createElement('button');
    li.className = 'list-group-item d-flex justify-content-between';
    deletebtn.className = 'btn btn-danger btn-sm delete';
    deletebtn.innerText = 'X';
    li.appendChild(document.createTextNode(input));
    li.appendChild(deletebtn);
    itemslist.appendChild(li);

    // Store in local storage
    storeTaskInLocalStorage({ text: input, completed: false });

    // Clear input
    document.getElementById('input').value = '';
}

// Store task in local storage
function storeTaskInLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get tasks from local storage and display them
function getTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(function(task) {
        var li = document.createElement('li');
        var deletebtn = document.createElement('button');
        li.className = 'list-group-item d-flex justify-content-between';
        if (task.completed) {
            li.classList.add('completed');
        }
        deletebtn.className = 'btn btn-danger btn-sm delete';
        deletebtn.innerText = 'X';
        li.appendChild(document.createTextNode(task.text));
        li.appendChild(deletebtn);
        itemslist.appendChild(li);
    });
}

// Delete item
function deleteItem(e) {
    if (e.target.classList.contains('delete')) {
        var li = e.target.parentElement;
        var taskText = li.textContent.slice(0, -1).trim();
        itemslist.removeChild(li);

        // Remove from local storage
        removeTaskFromLocalStorage(taskText);
    }
}

// Remove task from local storage
function removeTaskFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks = tasks.filter(function(task) {
        return task.text !== taskText;
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Complete task
function completeItem(e) {
    if (e.target.classList.contains('list-group-item')) {
        e.target.classList.toggle('completed');
        var taskText = e.target.textContent.slice(0, -1).trim();
        updateTaskInLocalStorage(taskText, e.target.classList.contains('completed'));
    }
}

// Update task in local storage
function updateTaskInLocalStorage(taskText, completed) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks = tasks.map(function(task) {
        if (task.text === taskText) {
            return { text: taskText, completed: completed };
        }
        return task;
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
