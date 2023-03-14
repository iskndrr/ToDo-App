
/// <reference types="../@types/jquery" />
let taskInput = document.getElementById('textval')
let submitBtn = document.getElementById('submit')
let remainingTask = document.getElementById('remaining-task')
let totalTask = document.getElementById('total-task')
let completedTask = document.getElementById('completed-task')
let allTasks = [];

// ========== check local storage when refresh or reopen ===========
if (localStorage.getItem('taskList') == null) {
    allTasks = [];
} else {
    allTasks = JSON.parse(localStorage.getItem('taskList'))
    console.log(allTasks)
    display()
}

function getTask() {
    let taskList = {
        task: taskInput.value
    }
    allTasks.push(taskList);
    localStorage.setItem('taskList', JSON.stringify(allTasks))
    taskInput.value = ''
    display()
}
submitBtn.addEventListener('click', () => {
    if (taskInput.value == '') {
        $('#warning').show(1500)
    } else {
        $('#warning').hide(1500)
        getTask()
    }
})

function search(term) {
    let foundedItem =[]
    for (i = 0; i < allTasks.length; i++) {
        if (allTasks[i].task.toLowerCase().includes(term.toLowerCase()) == true) {
            console.log(term,i)
            foundedItem.push(allTasks[i])
        }
    }
    display(foundedItem)
}



function display() {
    let todos = ``;
    for (i = 0; i < allTasks.length; i++) {
        todos += `
      <li class="d-flex todos rounded px-2 py-3  my-3 justify-content-between align-items-center ">
                   <div >
                     <input type="checkbox" class="form-check-input bg-transparent rounded-circle" name="tasks" id="${allTasks.indexOf(allTasks[i])}">
                     <span contenteditable="true"  class="ms-2">${allTasks[i].task}</span>
                   </div>
                    <button title="remove-task" onclick="deleTask(${i})" class="remove-task btn btn-outline-light">
                      <i class="fa-solid fa-xmark"></i>
                    </button>
            </li>
      `
    }
    $('main ul').html(todos)
    remainingTask.innerHTML = allTasks.length
    totalTask.innerHTML = allTasks.length

}

function deleTask(taskIndex) {
    allTasks.splice(taskIndex, 1);
    localStorage.setItem('taskList', JSON.stringify(allTasks))
    display();
}


