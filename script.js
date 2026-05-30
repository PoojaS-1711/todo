const taskInput = document.getElementById("taskInput");
const taskCategory = document.getElementById("taskCategory");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll("[data-filter]");

let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";


function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


function addTask() {

    const text =
    taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    tasks.push({
        id: Date.now(),
        text: text,
        category: taskCategory.value,
        completed: false
    });

    taskInput.value = "";

    saveTasks();
    renderTasks();

}


function deleteTask(id) {

    tasks = tasks.filter(
        task => task.id !== id
    );

    saveTasks();
    renderTasks();

}


function editTask(id) {

    const task = tasks.find(
        task => task.id === id
    );

    const newText =
    prompt("Edit Task", task.text);

    if (
        newText !== null &&
        newText.trim() !== ""
    ) {

        task.text =
        newText.trim();

        saveTasks();
        renderTasks();

    }

}


function toggleTask(id) {

    const task = tasks.find(
        task => task.id === id
    );

    task.completed =
    !task.completed;

    saveTasks();
    renderTasks();

}


function renderTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "active") {

        filteredTasks =
        tasks.filter(
            task => !task.completed
        );

    }

    if (currentFilter === "completed") {

        filteredTasks =
        tasks.filter(
            task => task.completed
        );

    }

    filteredTasks.forEach(task => {

        const li =
        document.createElement("li");

        li.dataset.id = task.id;

        li.innerHTML = `
            <div class="task-content">
                <input
                    type="checkbox"
                    class="toggle-task"
                    ${task.completed ? "checked" : ""}
                >

                <div>
                
                <div class="task-category">
                
                ${task.category}
                
                </div>
                <span class="${
                    task.completed
                    ? "completed"
                    : ""
                }">
                
                ${task.text}
                </span>
                </div>
                
            </div>

            <div class="task-actions">

                <button class="edit-btn">
                    Edit
                </button>

                <button class="delete-btn">
                    Delete
                </button>

            </div>
        `;

        taskList.appendChild(li);

    });

}


/* Add Task Button */

addTaskBtn.addEventListener(
    "click",
    addTask
);


/* Enter Key Support */

taskInput.addEventListener(
    "keypress",
    (e) => {

        if (e.key === "Enter") {
            addTask();
        }

    }
);


/* Event Delegation */

taskList.addEventListener(
    "click",
    (e) => {

        const li =
        e.target.closest("li");

        if (!li) return;

        const id =
        Number(li.dataset.id);

        if (
            e.target.classList.contains(
                "delete-btn"
            )
        ) {

            deleteTask(id);

        }

        if (
            e.target.classList.contains(
                "edit-btn"
            )
        ) {

            editTask(id);

        }

    }
);


/* Checkbox Event */

taskList.addEventListener(
    "change",
    (e) => {

        if (
            e.target.classList.contains(
                "toggle-task"
            )
        ) {

            const li =
            e.target.closest("li");

            const id =
            Number(li.dataset.id);

            toggleTask(id);

        }

    }
);


/* Filters */

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            currentFilter =
            button.dataset.filter;

            renderTasks();

        }
    );

});


/* Initial Load */

renderTasks();