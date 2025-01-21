function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    return;
  }

  const taskList = document.getElementById("taskList");
  const li = document.createElement("li");
  li.innerHTML = taskText;

  const editButton = document.createElement("button");
  editButton.innerHTML = '<ion-icon name="pencil-outline" class="modify"></ion-icon>';
  editButton.onclick = function () {
    editTask(li);
  };

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<ion-icon name="trash-outline" class="delete"></ion-icon>';
  deleteButton.onclick = function () {
    confirmDelete(li);
  };

  const completeButton = document.createElement("button");
  completeButton.innerHTML = '<ion-icon name="checkmark-done-outline" class="complete"></ion-icon>';
  completeButton.onclick = function () {
    completeTask(li, deleteButton, editButton, completeButton);
  };

  taskList.appendChild(li);
  li.appendChild(editButton);
  li.appendChild(deleteButton);
  li.appendChild(completeButton);

  taskInput.value = "";
}

function editTask(task) {
  const taskTextElement = task.firstChild;
  const taskText = taskTextElement.textContent;

  const newTaskText = prompt("Modifier la tâche:", taskText);

  if (newTaskText === null || newTaskText === "") {
    return;
  }

  taskTextElement.textContent = newTaskText;
}

function confirmDelete(task) {
  const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?");
  if (confirmation) {
    deleteTask(task);
  }
}

function deleteTask(task) {
  const taskList = document.getElementById("taskList");
  taskList.removeChild(task);
}

function completeTask(task, deleteButton, editButton, completeButton) {
  if (!task.classList.contains("completed")) {
    // Marquer la tâche comme terminée
    task.classList.add("completed");

    // Ajouter l'heure de fin
    const completionTime = new Date().toLocaleTimeString();
    const timestamp = document.createElement("span");
    timestamp.classList.add("timestamp");
    timestamp.textContent = ` (Terminé à ${completionTime})`;
    task.appendChild(timestamp);

    // Modifier le style de la tâche
    task.style.backgroundColor = "rgb(248, 207, 207)";
    task.style.textDecoration = "line-through";

    // Supprimer les boutons de modification et de complétion
    editButton.style.display = "none";
    completeButton.style.display = "none";

    // Afficher uniquement le bouton de suppression
    deleteButton.style.display = "inline-block";
  }
}
