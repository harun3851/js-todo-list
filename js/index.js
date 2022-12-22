
document.getElementById('create-task-id').addEventListener('click', () => {
    const txt=getInputText()
    insertTaskIntoPage(txt)
    saveTask(txt)
    emptyInputText()
})
const getInputText = ()=>{ 
   return document.getElementById('task-text').value
}
const insertTaskIntoPage = (text) => {
    document
    .getElementById('tasks-section')
    .insertAdjacentHTML('beforeend',`
    <div class="card rounded-pill mt-2 text-left">
        <div class="card-body"> 
            <p class="card-text">${text}</p>
            <button type="button" class="btn btn-success rounded-pill">
                <span class="material-symbols-outlined">
                    done
                </span>
            </button>
            <button type="button" class="btn btn-danger rounded-pill">
                <span class="material-symbols-outlined">
                    delete
                </span>
            </button> 
        </div>
    </div>
`)
}
const tasks = JSON.parse(localStorage.getItem('tasks'))
if(tasks){
    tasks.array.forEach(task => {
        insertTaskIntoPage(task)
        
    });
}
const emptyInputText = () =>{
    document.getElementById('task-text').value=''
}
 
const saveTask = (txt) =>{
    const tasks = JSON.parse(localStorage.getItem('tasks'))
    if(tasks){
        tasks.push(txt)
        localStorage.setItem('tasks',JSON.stringify([tasks])) 
    }   else{
        localStorage.setItem('tasks', JSON.stringify(txt))
    }
    
}