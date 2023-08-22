let addBtn = document.querySelector('.plusButton')
let dialog = document.querySelector('.dop')
let closeBtn = document.querySelector('.close-btn')
let todo = document.querySelector('.todo')
let radioBtns = document.getElementsByName('radio')

function createItem(object) {
    const item = document.createElement('div')
    item.classList.add('item')
    const tag = document.createElement('div')
    tag.classList.add('tag')
    tag.textContent = object.tag
    const title = document.createElement('p')
    title.textContent = object.title
    item.append(tag, title)
    return item
}


addBtn.onclick = function() {
    dialog.classList.remove('hide')
    dialog.classList.add('show')
}

closeBtn.onclick = function() {
    dialog.classList.remove('show')
    dialog.classList.add('hide')
}


newTask.onsubmit = function(evt) {
    evt.preventDefault()
    const df = {tag: '', title: ''}
    for (let radioBtn of radioBtns) {
        if (radioBtn.checked) {
            df.tag = radioBtn.value
        }
    }
    df.title = text.value
    
    todo.append(createItem(df))
}