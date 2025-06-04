let tasks = [];
const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        updateTasksList();
    }

}

const updateTasksList = () => {
  const taskList=document.getElementById("task-list");
  taskList.innerHTML='';
  tasks.forEach(task =>{
    const listItem=document.createElement('li');
    listItem.innerHTML=`
          <div class="taskItem">

          <div class="task">
           <input type="checkbox" class="checkbox">
           <p>Finish</p>
          </div>

           <div class="icons">
            <img src="img/edit.png">
            <img src="img/bin.png">
           </div>

       </div>`
  })
}

document.getElementById("newTask").addEventListener('click', function (e) {
    e.preventDefault();
    addTask();
})