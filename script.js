document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.getElementById("add-btn");
    const todoInput = document.getElementById("add-todo");
    const todoList = document.getElementById("todo-list");
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");

    let totalTasks = 0;
    let completedTasks = 0;

    // Function to update the progress bar and text
    const updateProgress = () => {
        const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
        progressBar.value = progress;
        progressText.textContent = `${progress}% Completed`;
    };

    // Function to add a new task
    const addTask = () => {
        const taskText = todoInput.value.trim();

        if (!taskText) {
            alert("Please enter a task before adding."); // Handle empty input
            return;
        }

        totalTasks++;
        
        // Create list item
        const listItem = document.createElement("li");

        // Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        // Task text
        const textNode = document.createElement("span");
        textNode.textContent = taskText;

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        // Container for checkbox and text
        const checkboxContainer = document.createElement("div");
        checkboxContainer.className = "checkbox-container";
        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(textNode);

        // Append elements to list item
        listItem.appendChild(checkboxContainer);
        listItem.appendChild(deleteBtn);
        todoList.appendChild(listItem);

        // Clear the input field
        todoInput.value = "";

        // Checkbox event: toggle completion
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                listItem.classList.add("completed");
                todoList.appendChild(listItem); // Move to the bottom
                completedTasks++;
            } else {
                listItem.classList.remove("completed");
                completedTasks--;
            }
            updateProgress();
        });

        // Delete button event: remove task
        deleteBtn.addEventListener("click", () => {
            if (checkbox.checked) {
                completedTasks--;
            }
            totalTasks--;
            todoList.removeChild(listItem);
            updateProgress();
        });

        // Update progress bar after adding a task
        updateProgress();
    };

    // Add task on button click
    addBtn.addEventListener("click", addTask);

    // Add task on pressing "Enter" key
    todoInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    });
});
