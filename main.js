let addBtn = document.querySelector('.plusButton')
let dialog = document.querySelector('.dop')
let closeBtn = document.querySelector('.close-btn')
let todo = document.querySelector('.todo')
let radioBtns = document.getElementsByName('radio')
let createConfirmBtn = document.querySelector('.ui-btn span')
let doing = document.querySelector('.doing')
let done = document.querySelector('.done')
let clearAllBtn = document.querySelector('.clear-all')


// all todo stuff
let baseData = JSON.parse(localStorage.getItem('yourList')) || []

const popupHideShow = (toRemove, toShow) => {
        dialog.classList.remove(toRemove)
        dialog.classList.add(toShow)
}

const filterUpdate = (data, column) => {
    const existItem = createItem(data)
    if (filter.value == 'all' && search.value.trim().length == 0) {
        existItem.style.filter = 'grayscale(0) blur(0)'
    }
    else if (filter.value == 'all' && search.value.trim().length != 0 && data.title.includes(search.value)){
        existItem.style.filter = 'grayscale(0) blur(0)'
    }
    else if (data.tag == filter.value && search.value.trim().length != 0 && data.title.includes(search.value)){
        existItem.style.filter = 'grayscale(0) blur(0)'
    }
    else if (data.tag == filter.value && search.value.trim().length == 0 && data.title.includes(search.value)){
        existItem.style.filter = 'grayscale(0) blur(0)'
    }
    else {
        existItem.style.filter = 'grayscale(60%) blur(2px)'
    }
    column.append(existItem)
}

const updateItems = () => {
    todo.innerText = ''
    doing.innerText = ''
    done.innerText = ''
    baseData.forEach(df => {
        if (df.status == 'todo') {
            filterUpdate(df, todo)
        }
        else if (df.status == 'doing') {
            filterUpdate(df, doing)
        }
        else if (df.status == 'done') {
            filterUpdate(df, done)
        }
        
    });
}
// setting local storage
const toLocalStorage = (dataSet) => {
    localStorage.setItem('yourList', JSON.stringify(dataSet))
}
 if (baseData.length) {
        updateItems()
 }



// func for creating new task 

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

    selection.value = object.status

// changing tasks progress
    selection.onchange = function(){
        // const column = document.querySelector('.' + selection.value)
        object.status = selection.value
        updateItems()
        toLocalStorage(baseData)
        // column.append(item)

    }

// edit btn (picture of the pen on the task)

    editBtn.onclick = function() {
        popupHideShow('hide', 'show')
        // dialog.classList.remove()
        // dialog.classList.add()
        dialog.setAttribute('data-id', object.itemId)
        text.value = title.textContent
        createConfirmBtn.textContent = 'Confirm'
        for (let radioBtn of radioBtns) {
            if (radioBtn.value == object.tag) {
                radioBtn.checked = true
            }
        }

    }

// delet the task (picture of the cross on the task)

    delBtn.onclick = function() {
        baseData = baseData.filter(df => {
            return df.itemId != object.itemId
        })
        updateItems()
        toLocalStorage(baseData)
    }

    return item
}

// button to open the panel for adding and editing a task

addBtn.onclick = function() {
    popupHideShow('hide', 'show')
    createConfirmBtn.textContent = 'Create'
}


// button to close the panel for adding and editing a task

closeBtn.onclick = function() {
    popupHideShow('show', 'hide')
    // dialog.classList.remove()
    // dialog.classList.add()
    text.value = ""

}

filter.onchange = () => {
    updateItems()
}

// create and confirm btns

newTask.onsubmit = function(evt) {
    evt.preventDefault()
    if (text.value.trim() == ''){
        text.value = ''
        return
    }
    
// add button on panel

    if (createConfirmBtn.textContent == 'Create'){
        const df = {tag: '', title: '', status: 'todo', itemId: 'id' + String(Date.now())}
        for (let radioBtn of radioBtns) {
            if (radioBtn.checked) {
                df.tag = radioBtn.value
            }
        }
        df.title = text.value
        baseData.push(df)
        const filteredData = baseData.filter(df => {
            return df.status == 'todo'
        })
        todo.innerText = ''
        filteredData.forEach(df => {
            filterUpdate(df, todo)
        });
        toLocalStorage(baseData)
    }
    
    else if (createConfirmBtn.textContent == 'Confirm'){
        const dataId = dialog.getAttribute('data-id')
        console.log(dataId)
        const itemIndex = baseData.findIndex(df => {return df.itemId == dataId})
        console.log(itemIndex)
       
        // const selectEditor = document.getElementById(dataId)
        // const itemEditor = selectEditor.parentElement

        // const titleEditor = itemEditor.querySelector('p')
        // titleEditor.textContent = text.value
        // const tagEditor = itemEditor.querySelector('.tag')

        // tagEditor.classList.remove('tag-easy', 'tag-medium', 'tag-hard')
        
        baseData[itemIndex].title = text.value

        for (let radioBtn of radioBtns) {
            if (radioBtn.checked) {
                baseData[itemIndex].tag = radioBtn.value
                // tagEditor.classList.add('tag-' + radioBtn.value)
            }
        }
        updateItems()
        toLocalStorage(baseData)
    }   
}

// clear all tasks

clearAllBtn.onclick = () => {
    baseData = []
    toLocalStorage(baseData)
    updateItems()
}

search.oninput = () => {
    if (search.value.trim() == ''){
        text.value = ''
    }
    updateItems()
}
