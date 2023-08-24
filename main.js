let addBtn = document.querySelector('.plusButton')
let dialog = document.querySelector('.dop')
let closeBtn = document.querySelector('.close-btn')
let todo = document.querySelector('.todo')
let radioBtns = document.getElementsByName('radio')
let createConfirmBtn = document.querySelector('.ui-btn span')

function createItem(object) {
    const item = document.createElement('div')
    item.classList.add('item')

    const tag = document.createElement('div')
    tag.classList.add('tag', 'tag-' + object.tag)
    const title = document.createElement('p')

    title.textContent = object.title
    const labelForSel = document.createElement('label')

    labelForSel.textContent = 'Progress '
    labelForSel.setAttribute('for', object.itemId)

    const selection = document.createElement('select')
    selection.setAttribute('id', object.itemId)
    selection.classList.add('progress')

    const optTodo = document.createElement('option')
    optTodo.value = 'todo'
    optTodo.textContent = 'to do'

    const optDoing = document.createElement('option')
    optDoing.value = 'doing'
    optDoing.textContent = 'doing'

    const optDone = document.createElement('option')
    optDone.value = 'done'
    optDone.textContent = 'done'
    
    const editBtn = document.createElement('button')
    editBtn.classList.add('edit-task')
    editBtn.textContent ='🖊'

    const delBtn = document.createElement('button')
    delBtn.classList.add('delete-task')
    delBtn.textContent ='×'

    selection.append(optTodo, optDoing, optDone)
    item.append(tag, title, labelForSel, selection, editBtn, delBtn)

    selection.onchange = function(){
        const column = document.querySelector('.' + selection.value)
        column.append(item)

    }

    editBtn.onclick = function() {
        dialog.classList.remove('hide')
        dialog.classList.add('show')
        dialog.setAttribute('data-id', object.itemId)
        text.value = title.textContent
        createConfirmBtn.textContent = 'Confirm'
        for (let radioBtn of radioBtns) {
            if (radioBtn.value == object.tag) {
                radioBtn.checked = true
            }
        }

    }

    delBtn.onclick = function() {
        item.remove()
    }

    return item
}


addBtn.onclick = function() {
    dialog.classList.remove('hide')
    dialog.classList.add('show')
    createConfirmBtn.textContent = 'Create'
}

closeBtn.onclick = function() {
    dialog.classList.remove('show')
    dialog.classList.add('hide')
    text.value = ""

}


newTask.onsubmit = function(evt) {
    evt.preventDefault()
    if (text.value.trim() == ''){
        text.value = ''
        return
    }
    
    if (createConfirmBtn.textContent == 'Create'){
        const df = {tag: '', title: '', itemId: 'id' + String(Date.now())}
        for (let radioBtn of radioBtns) {
            if (radioBtn.checked) {
                df.tag = radioBtn.value
            }
        }
        df.title = text.value
        todo.append(createItem(df))
    }
    else if (createConfirmBtn.textContent == 'Confirm'){
        const dataId = dialog.getAttribute('data-id')
        const selectEditor = document.getElementById(dataId)
        const itemEditor = selectEditor.parentElement

        const titleEditor = itemEditor.querySelector('p')
        titleEditor.textContent = text.value

        const tagEditor = itemEditor.querySelector('.tag')
        for (let radioBtn of radioBtns) {
            if (radioBtn.checked) {
                tagEditor.classList.add('tag-' + radioBtn.value)
            }
        }
        
    }
}
