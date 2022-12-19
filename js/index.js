document.getElementById('create-task-id').addEventListener('click', () => {
    const txt=getInputText()
    insertTaskIntoPage(txt)
    emptyInputText()
})
const getInputText = function name(params){ 
   return document.getElementById('task-text').value
}
const insertTaskIntoPage = (text) => {
    document.getElementById('tasks-section').insertAdjacentHTML('beforeend',`<h3>${text}</h3>`)
}
const emptyInputText = () =>{
    document.getElementById('task-text').value=''
}