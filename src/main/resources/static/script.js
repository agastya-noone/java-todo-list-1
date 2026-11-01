
const API_URL = "/tasks";

document.addEventListener("DOMContentLoaded", loadTasks);

// Load all tasks
async function loadTasks() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Unable to load tasks");
        }

        const tasks = await response.json();
        displayTasks(tasks);

    } catch (error) {
        console.error(error);
        alert("Backend connection failed!");
    }
}

// Add task
async function addTask() {

    const title = document.getElementById("taskInput").value.trim();

    const deadline = document.getElementById("deadlineInput").value;

    if (!title) {
        alert("Please enter a task!");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                deadline: deadline || null
            })
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        document.getElementById("taskInput").value = "";
        document.getElementById("deadlineInput").value = "";

        loadTasks();

    } catch (error) {
        console.error(error);
        alert("Could not add task: " + error.message);
    }
}

// Display tasks
function displayTasks(tasks) {

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    let completed = 0;

    tasks.forEach(task => {

        if (task.completed) completed++;

        const li = document.createElement("li");
        li.className = "task-item";

        const details = document.createElement("div");
        details.className = "task-details";

        const title = document.createElement("span");
        title.className = "task-title";
        title.textContent = task.title;

        if (task.completed) {
            title.classList.add("completed");
        }

        details.appendChild(title);

        // Display deadline
        if (task.deadline) {

            const deadline = document.createElement("small");
            deadline.className = "deadline";

            deadline.textContent = "Deadline: " + task.deadline;

            details.appendChild(deadline);
        }

        const actions = document.createElement("div");
        actions.className = "task-actions";

        // Complete button
        const completeButton = document.createElement("button");
        completeButton.className = "complete-btn";
        completeButton.textContent = task.completed ? "Undo" : "Done";

        completeButton.onclick = () => toggleTask(task);

        // Edit deadline button
        const editButton = document.createElement("button");
        editButton.className = "edit-btn";
        editButton.textContent = "Edit";

        editButton.onclick = () => editTask(task);

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";

        deleteButton.onclick = () => deleteTask(task.id);

        actions.appendChild(completeButton);
        actions.appendChild(editButton);
        actions.appendChild(deleteButton);

        li.appendChild(details);
        li.appendChild(actions);

        taskList.appendChild(li);

    });

    if (tasks.length === 0) {

        const empty = document.createElement("li");
        empty.className = "empty-message";
        empty.textContent = "No tasks yet. Add your first task!";

        taskList.appendChild(empty);
    }

    document.getElementById("totalTasks").textContent = tasks.length;

    document.getElementById("completedTasks").textContent = completed;

    document.getElementById("pendingTasks").textContent =
        tasks.length - completed;
}

// Mark completed / undo
async function toggleTask(task) {

    await updateTask(task, {
        title: task.title,
        completed: !task.completed,
        deadline: task.deadline
    });
}

// Edit task title and deadline
async function editTask(task) {

    const newTitle = prompt("Enter task name:", task.title);

    if (newTitle === null || !newTitle.trim()) return;

    const newDeadline = prompt(
        "Enter deadline (YYYY-MM-DD), or leave empty:",
        task.deadline || ""
    );

    if (newDeadline === null) return;

    await updateTask(task, {
        title: newTitle.trim(),
        completed: task.completed,
        deadline: newDeadline.trim() || null
    });
}

// Update task
async function updateTask(task, data) {

    try {

        const response = await fetch(`${API_URL}/${task.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error("Unable to update task");
        }

        loadTasks();

    } catch (error) {
        console.error(error);
        alert("Could not update task!");
    }
}

// Delete task
async function deleteTask(id) {

    try {

        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Unable to delete task");
        }

        loadTasks();

    } catch (error) {
        console.error(error);
        alert("Could not delete task!");
    }
}

// Enter key support
document.getElementById("taskInput").addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});
