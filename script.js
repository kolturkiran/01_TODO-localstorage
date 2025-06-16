document.addEventListener('DOMContentLoaded', function(){
    const addTaskButton = document.getElementById('add-task-btn');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
 
    let tasks = JSON.parse(localStorage.getItem('theTasks')) || [];

    tasks.forEach(t => {
        renderTask(t)
    });
 
    addTaskButton.addEventListener('click', ()=>{
         inputText = todoInput.value.trim();
         if(inputText === "") return;
         const newTask = {
             id: Date.now(),
             text: inputText,
             completed: false 
         };
         
         tasks.push(newTask);
         saveTasks();         
         renderTask(newTask);
         todoInput.value = "";

    })

    todoInput.addEventListener('keypress', (e)=>{
        if(e.key === "Enter") addTaskButton.click();        
    })
    
    function saveTasks() {
     localStorage.setItem('theTasks', JSON.stringify(tasks));    
    }
 
    function renderTask(task){
     const listItem = document.createElement('li');
     listItem.innerHTML = `
     <span data-id = ${task.id}>${task.text}</span>
     <button>delete</button>
     `;
     todoList.appendChild(listItem);
     
     listItem.addEventListener('click', (e)=>{
        if(e.target.tagName === "BUTTON") return;
        e.target.classList.toggle('completed');
        
     });

     listItem.querySelector('button').addEventListener('click', (e)=>{
        tasks = tasks.filter(t => t.id !== task.id);
        saveTasks();
        listItem.remove();
     });

    }
})