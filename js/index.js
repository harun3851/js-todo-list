document.getElementById('create-task-id').addEventListener('click', () => {
  const txt = getInputText()
  saveTask(txt)
  emptyInputText()
})

const getInputText = () => {
  return document.getElementById('task-text').value
}

const insertTaskIntoPage = (task) => {
  document.getElementById('tasks-section').insertAdjacentHTML(
    'beforeend',
    `
    <div class="card rounded-pill mt-2 text-left ${
      task.isFinished ? 'shadow-lg bg-dark text-white' : ''
    }">
        <div class="card-body" data-task-object='${JSON.stringify(task)}'>
            <h5 class="card-title">${task.txt}</h5>
            <button type="button" class="btn btn-success rounded-pill success">
                <span class="material-icons">
                    done_outline
                </span>
            </button>
            <button type="button" class="btn btn-danger rounded-pill delete">
                <span class="material-icons">
                    delete_forever
                </span>
            </button>
        </div>
    </div>
    `
  )
}

const emptyInputText = () => {
  document.getElementById('task-text').value = ''
}

const saveTask = (txt) => {
  const tasks = JSON.parse(localStorage.getItem('tasks'))
  if (tasks) {
    tasks.push({ txt, id: shortid.generate() })
    localStorage.setItem('tasks', JSON.stringify(tasks))
  } else {
    const id = shortid.generate()
    localStorage.setItem('tasks', JSON.stringify([{ txt, id }]))
  }
  renderData()
}

const renderData = () => {
  document.getElementById('tasks-section').innerHTML = ''
  const tasks = JSON.parse(localStorage.getItem('tasks'))

  if (tasks) {
    tasks.forEach((task) => {
      insertTaskIntoPage(task)
    })
  }
  document.querySelectorAll('.success').forEach((node) => {
    node.addEventListener('click', handleDeleteAndUpdate())
  })

  document.querySelectorAll('.delete').forEach((node) => {
    node.addEventListener('click', handleDeleteAndUpdate('filter'))
  })
}

const handleDeleteAndUpdate = function (type) {
  return function () {
    const data = JSON.parse(this.parentElement.dataset['taskObject'])
    const tasks = JSON.parse(localStorage.getItem('tasks'))
    const newData =
      type === 'filter'
        ? tasks.filter((el) => {
            return data.id !== el.id
          })
        : tasks.map((el) => {
            if (data.id === el.id) {
              el.isFinished = true
            }
            return el
          })
    localStorage.setItem('tasks', JSON.stringify(newData))
    renderData()
  }
}

renderData()
