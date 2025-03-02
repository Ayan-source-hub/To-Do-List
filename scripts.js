document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
});

function addTask() {
    let taskText = document.getElementById("taskInput").value.trim();
    if (taskText === "") return;

    let taskList = document.getElementById("taskList");

    let li = document.createElement("li");
    li.className = "task-item";
    li.innerHTML = `
        <span>${taskText}</span>
        <div class="task-buttons">
            <button class="complete-btn" onclick="completeTask(this)">✔</button>
            <button class="edit-btn" onclick="editTask(this)">✏</button>
            <button class="delete-btn" onclick="deleteTask(this)">🗑</button>
        </div>
    `;
    taskList.appendChild(li);
    saveTasks();
    document.getElementById("taskInput").value = "";
}

function completeTask(button) {
    let task = button.parentElement.parentElement;
    task.classList.toggle("completed");
    saveTasks();
}

function editTask(button) {
    let task = button.parentElement.parentElement;
    let newText = prompt("Edit Task:", task.firstChild.textContent);
    if (newText !== null && newText.trim() !== "") {
        task.firstChild.textContent = newText.trim();
        saveTasks();
    }
}

function deleteTask(button) {
    if (confirm("Are you sure you want to delete this task?")) {
        let task = button.parentElement.parentElement;
        task.remove();
        saveTasks();
    }
}

function filterTasks(filter) {
    let tasks = document.querySelectorAll(".task-item");
    tasks.forEach(task => {
        switch (filter) {
            case "all":
                task.style.display = "flex";
                break;
            case "completed":
                task.style.display = task.classList.contains("completed") ? "flex" : "none";
                break;
            case "pending":
                task.style.display = !task.classList.contains("completed") ? "flex" : "none";
                break;
        }
    });
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll(".task-item").forEach(task => {
        tasks.push({ text: task.querySelector("span").textContent, completed: task.classList.contains("completed") });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Clear the list before loading
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.className = "task-item";
        if (task.completed) li.classList.add("completed");
        li.innerHTML = `
            <span>${task.text}</span>
            <div class="task-buttons">
                <button class="complete-btn" onclick="completeTask(this)">✔</button>
                <button class="edit-btn" onclick="editTask(this)">✏</button>
                <button class="delete-btn" onclick="deleteTask(this)">🗑</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}
