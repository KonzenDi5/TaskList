let clock = () =>{
    let date = new Date()
    let hrs = date.getHours()
    let mins = date.getMinutes()
    let period = "am"
    if(hrs == 0){
        hrs = 12
    } else if (hrs >= 12){
        hrs = hrs - 12
        period = "am"
    }
    hrs = hrs < 10 ? "0" + hrs : hrs
    mins = mins < 10 ? "0" + mins : mins
    

    let time = `${hrs}:${mins}    ${period}`
    document.getElementById("clock").innerText = time
    setTimeout(clock, 1000)
}
clock()

const inputElement = document.querySelector(".new-task-input")
const addTaskButton = document.querySelector('.new-task-button')
const tasksContainer = document.querySelector(".tasks-container")

const validateInput = () => inputElement.value.trim().length > 0

const handleAddTask = () => {
    const inputIsValid = validateInput()

    if (!inputIsValid){
       return inputElement.classList.add("error")
    }

    const taskItemContainer = document.createElement("div")
    taskItemContainer.classList.add("task-item")

    const taskContent = document.createElement("p")
    taskContent.innerText = inputElement.value;

    taskContent.addEventListener('click', () => handleClick(taskContent))

    const deleteItem = document.createElement("i")
    deleteItem.classList.add("fa-solid")
    deleteItem.classList.add("fa-trash-can")

    deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContent))

    taskItemContainer.appendChild(taskContent)
    taskItemContainer.appendChild(deleteItem)

    

    tasksContainer.appendChild(taskItemContainer, taskContent)

    inputElement.value = ''

    updateLocalStorage()

}

const handleClick = (taskContent) => {
    const tasks = tasksContainer.childNodes

    for (const task of tasks){
        const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent)
        if(currentTaskIsBeingClicked){
            task.firstChild.classList.toggle('completed')
        }
    }
    updateLocalStorage()
    
}
const handleDeleteClick = (taskItemContainer, taskContent) => {
    const tasks = tasksContainer.childNodes

    for (const task of tasks){
        const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent)
        if (currentTaskIsBeingClicked){
            taskItemContainer.remove()
        }
    }
    updateLocalStorage()
}

const handleInputChange = () => {
    const inputIsValid = validateInput()

    if (inputIsValid) {
        return inputElement.classList.remove("error")
    }
}
const updateLocalStorage = () =>{
    const tasks= tasksContainer.childNodes


    const localStorageTasks = [...tasks].map(task => {
       const content = task.firstChild
       const isCompleted = content.classList.contains('completed') 

       return {description: content.innerText, isCompleted}
       
    })

    localStorage.setItem('tasks', JSON.stringify(localStorageTasks))
}
const refreshTasksUsaingLocalStorage = () => {
    const taskFromLocalStorage = JSON.parse(localStorage.getItem('tasks'))

    if(!taskFromLocalStorage) return

    for (task of taskFromLocalStorage){
        const taskItemContainer = document.createElement("div")
    taskItemContainer.classList.add("task-item")

    const taskContent = document.createElement("p")
    taskContent.innerText = task.description
    if(task.isCompleted){
        taskContent.classList.add('completed')
    }

    taskContent.addEventListener('click', () => handleClick(taskContent))

    const deleteItem = document.createElement("i")
    deleteItem.classList.add("fa-solid")
    deleteItem.classList.add("fa-trash-can")

    deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContent))

    taskItemContainer.appendChild(taskContent)
    taskItemContainer.appendChild(deleteItem)

    

    tasksContainer.appendChild(taskItemContainer)
    }
}
refreshTasksUsaingLocalStorage()

addTaskButton.addEventListener("click", () => handleAddTask())

inputElement.addEventListener('change', () => handleInputChange())