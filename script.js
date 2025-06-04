let tasks = []; //make an Array for data

document.addEventListener('DOMContentLoaded', () => { //when the page loaded
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) //save in localStorage

    if (storedTasks) { //if we have data in localStorage
        storedTasks.forEach((task) => tasks.push(task)); //add to array
        updateTasksList(); //update the taskList in demo
        updateStats();
    }
})

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks)); //
}


document.getElementById("newTask").addEventListener('click', function (e) { //add task button
    e.preventDefault(); // not refresh
    addTask();
    document.getElementById("taskInput").value = ''; //renew the input text
})

const addTask = () => {
    const taskInput = document.getElementById("taskInput"); //access to input
    const text = taskInput.value.trim(); //access to input value

    if (text) { // if you write sth
        tasks.push({ text: text, completed: false }); // the array must save it (the text and if it is completed or not status)
        updateTasksList(); //show the tasklist in demo
        updateStats(); 
        saveTasks();
    }
}

const updateTasksList = () => {
    const taskList = document.getElementById("task-list"); //access to ul of lists
    taskList.innerHTML = '';  //to not repeat
    tasks.forEach((task, index) => { //array for its task and index of that (each)
        const listItem = document.createElement('li'); //create list for each task
        listItem.innerHTML = ` 
          <div class="taskItem">

          <div class="task ${task.completed ? 'completed' : ''}">
           <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''}>
           <p>${task.text}</p>
          </div>

           <div class="icons">
            <img src="img/edit.png" onclick="editTask(${index})">
            <img src="img/bin.png" onclick="deleteTask(${index})">
           </div>

       </div>`;
        listItem.addEventListener('change', () => toggleTaskComplete(index)); //changes on list
        taskList.append(listItem); //ul get the lists
    })
}

const deleteTask = (index) => {
    tasks.splice(index, 1); //remove that task
    updateTasksList(); //update the taskList in demo
    updateStats();
    saveTasks();
}
const editTask = (index) => {
    const taskInput = document.getElementById('taskInput'); //access to input 
    taskInput.value = tasks[index].text; //show the task that has chosen in the input

    tasks.splice(index, 1); //remove that task
    updateTasksList(); //update the taskList in demo
    updateStats();
    saveTasks();
}

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed; //true<=>false
    updateTasksList(); //update the taskList in demo
    updateStats();
    saveTasks();
}

const updateStats = () => {
    const completeTasks = tasks.filter(task => task.completed).length; //length of true completed tasks
    const totalTasks = tasks.length; // length of all tasks
    const progress = (completeTasks / totalTasks) * 100 //percentage
    const progressBar = document.getElementById("progress"); //access to progress
    progressBar.style.width = `${progress}%` //show the percentage in progress

    document.getElementById("numbers").innerText = `${completeTasks} / ${totalTasks}`; //show in numbers

    if (tasks.length && completeTasks === totalTasks) {
        wow(); //wow you've done
    }
}


const wow = () => { //wow great
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
    });
}
