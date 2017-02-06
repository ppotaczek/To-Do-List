document.addEventListener("DOMContentLoaded", function(){
  var addTaskButton = document.getElementById('addTaskButton');
  var taskList = document.getElementById('taskList');
  var taskInput = document.getElementById('taskInput');
  var removeFinishedTasksButton = document.getElementById('removeFinishedTasksButton');
  var counterOnPage = document.getElementById('counter');
  var counter = 0;
  var priority = document.getElementById("priority");

  function addTask(event){
    var newLi = document.createElement("li");
    var newTask = document.createElement("p");
    var newButtonRemove = document.createElement("button");
    var newButtonComplete = document.createElement("button");
    var errorMessage = document.getElementById("tip");
    var errorMessage2 = document.getElementById("tip2");

    var condition1 = taskInput.value.length > 5;
    var condition2 = taskInput.value.length < 100;
    var condition3 = priority.value > 0;
    var condition4 = priority.value < 11;

    if (condition1 && condition2 && condition3 && condition4){
      newLi.classList.add("taskLine");
      newLi.classList.add("row");
      newTask.innerText = taskInput.value;
      newTask.classList.add("tasks");
      newLi.dataset.priority = priority.value;
      newButtonRemove.innerText = "Delete";
      newButtonComplete.innerText = "Complete";
      newButtonRemove.classList.add("buttons");
      newButtonComplete.classList.add("buttons");
      taskInput.value = "";
      priority.value = "";
      errorMessage.innerText = "";
      errorMessage2.innerText = "";
      counterOnPage.innerText = ++counter;

      if (taskList.children.length < 1){
        taskList.appendChild(newLi);
      }

      for (var i = 0; i < taskList.children.length; i++){
        if (Number(taskList.children[i].dataset.priority) < Number(newLi.dataset.priority)){
          taskList.insertBefore(newLi, taskList.children[i]);
          i = taskList.children.length;
        }
        else {taskList.appendChild(newLi)}
      }
      newLi.appendChild(newTask);
      newLi.appendChild(newButtonRemove);
      newLi.appendChild(newButtonComplete);

      newButtonRemove.addEventListener("click", removeTaskLine);
      newButtonComplete.addEventListener("click", completeTaskLine);
    }

    if (!condition1 || !condition2) {
      errorMessage.innerText = "Enter more than 5 and less than 100 chars!";
    }
    if (!condition3 || !condition4) {
      errorMessage2.innerText = "Enter priority!";
    }
  }

  function removeTaskLine(event){
    var toDelete = this.parentNode;
    toDelete.parentNode.removeChild(toDelete);
    counterOnPage.innerText = --counter;;
  }

  function completeTaskLine(event){
    this.previousSibling.previousSibling.classList.toggle("complete");
    counterOnPage.innerText = counter - document.getElementsByClassName("complete").length;
  }

  function removeAllComplete(event){
    var allComplete = document.getElementsByClassName("complete");

    while (allComplete.length > 0) {
      allComplete[0].parentNode.parentNode.removeChild(allComplete[0].parentNode);
      counter--;
    }
    counterOnPage.innerText = counter;
  }

  addTaskButton.addEventListener("click", addTask);
  removeFinishedTasksButton.addEventListener("click", removeAllComplete);
});
