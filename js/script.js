'use strict';
import DataBase from "./services.js";

// Var decleration.
const form = document.getElementById('form');
const textInput = document.getElementById('todoTitle');
const dateInput = document.getElementById('todoDate');
const theAddButton = document.getElementById('theAddButton');
const myErrors = document.getElementById('myErrors');
const errors = document.getElementById('errors');
const lineList = document.getElementById('lineList');
const saveChanges = document.getElementById('saveChanges');
const todoDescription = document.getElementById('todoDescription');
const todoTime = document.getElementById('todoTime');
const deleteAll = document.getElementById('deleteAll');





const myDB = new DataBase();
console.log();

HideIfNull();

function HideIfNull() {
    const localData = myDB.getTodo();
    const end = document.getElementById('end');
    const scrollDown = document.getElementById('scroll-down');
    if (localData.length === 0) {
        deleteAll.style.display = 'none';
        scrollDown.style.display = 'none';
        end.style.display = 'none';
    }
    else {
        deleteAll.style.display = 'block';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    HideIfNull();

    function HideIfNull() {
        const localData = myDB.getTodo()
        const end = document.getElementById('end');
        const scrollDown = document.getElementById('scroll-down');
        console.log(localData)
        if (localData.length === 0) {
            deleteAll.style.display = 'none';
            scrollDown.style.display = 'none';
            end.style.display = 'none';
        }
        else {
            deleteAll.style.display = 'block';
        }
        window.location.reload();
    }


    if (textInput.value && dateInput.value && todoDescription && todoTime) {
        myErrors.style.color = 'rgb(2, 165, 2)'
        myErrors.innerHTML = 'Added';
        const todo = {
            todoDescription: todoDescription.value,
            todoDate: todoDate.value,
            todoTitle: todoTitle.value,
            todoTime: todoTime.value
        }
        myDB.storeTodo(todo);
        textInput.value = '';
        dateInput.value = '';
        todoDescription.value = '';
        todoTime.value = '';
    toElem();
    }
    else {
        alert('Complete your input lists.')
    }
    const localData = myDB.getTodo();
});
toElem();
// const localData = myDB.getTodo();
function toElem() {
    const localData = myDB.getTodo();
    lineList.innerHTML = localData.map((myObj, index)=> {
        console.log(myObj)
        const element =
            `<li data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-todo-list-index="${index}" data-aos-duration="800" id="myListedTodo"
                class="myListedTodo d-flex align-items-center bg-secondary border rounded-pill border-secondary p-2 m-auto my-3">
                <div class="listName bg-transparent border-0 w-50 p-2">${index+1}) ${myObj.todoTitle}</div>
                <span class="seperator h4 d-none d-sm-block">|</span>
                <span id="userTime" class="p-1 h6 fw-bold my-auto d-none d-md-block">${myObj.todoDate}</span>
                <div class="m-auto"></div>
                <a href="page.html?todoindex=${index}" page-todo-index="${index}" class="nextPage" target="_blank"><button class="bg-secondary border-0 btn btn-sm me-1"><i class="bi bi-eye-fill fw-bold h3"></i></button></a>
                <button title="Edit" class="edits edit-button bg-secondary border-0 btn btn-sm me-1" id="errors"
                 data-todo-date="${myObj.todoDate}" data-todo-list="${myObj.todoTitle}" data-todo-description="${myObj.todoDescription}" data-todo-time="${myObj.todoTime}"
                 data-todo-index="${index}" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">
                <i class="bi bi-pen-fill fw-bold h3"></i>
                </button>
                <button title="Delete" id="deletes" data-todo-delete-index="${index}" class="deletes bg-secondary border-0 btn btn-sm me-1">
                <i class="bi bi-trash-fill fw-bold h3"></i>
                </button>
            </li>`;
    return element;
 }); 
}
    const myEdits = document.querySelectorAll('.edit-button');
    myEdits.forEach((arrayItem, index)=>{
        arrayItem.addEventListener("click", function(){
            const todoDataDate = arrayItem.getAttribute('data-todo-date')
            const todoDataList = arrayItem.getAttribute('data-todo-list')
            const todoDataDescription = arrayItem.getAttribute('data-todo-description')
            const todoDataTime = arrayItem.getAttribute('data-todo-time')
            const todoDataIndex = arrayItem.getAttribute('data-todo-index')
            handleTodo({todoDataDate, todoDataList, todoDataDescription, todoDataTime, todoDataIndex});
        }) 
    })
    let todoIndex;
    const closeButton = document.getElementById('closeButton');
    const updateTodoTitle = document.getElementById('update-todo-title');
    const updateTodoDate = document.getElementById('update-todo-date');
    const updateDescription = document.getElementById('update-description');
    const updateTodoTime = document.getElementById('update-todo-time');
    function handleTodo(myObj) {
        updateTodoTitle.value = myObj.todoDataList;
        updateTodoDate.value = myObj.todoDataDate;
        updateDescription.value = myObj.todoDataDescription;
        updateTodoTime.value = myObj.todoDataTime
        todoIndex = myObj.todoDataIndex
    }
    const todoForm = document.getElementById('update-todo-form');
    todoForm.addEventListener('submit', (e) => { 
        e.preventDefault();
        const todoTitle = document.getElementById('update-todo-title').value;
        const todoDate = document.getElementById('update-todo-date').value;
        const todoDescription = document.getElementById('update-description').value;
        const todoTime = document.getElementById('update-todo-time').value;
        const modalButton = document.getElementById('modal-button');
        myDB.updateTodo({todoDescription,todoDate,todoTitle,todoTime}, todoIndex)
        console.log(myDB.updateTodo({todoDescription,todoDate,todoTitle,todoTime}, todoIndex))
        closeButton.click()
        window.location.reload();
    });
    // delte section 
    const myListedTodo = document.querySelectorAll('.myListedTodo');
    const deletes = document.querySelectorAll('.deletes');
    deletes.forEach((myDeletes, index)=>{
        myDeletes.addEventListener('click', () => {
        const todoDataDeleteIndex = myDeletes.getAttribute('data-todo-delete-index');
        const notify = window.confirm('Are you sure you want to delete this todo?')
        if (notify) {
            myDB.deleteTodo(todoDataDeleteIndex);
            window.location.reload();
            window.location.reload();
        }
        })
    });


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const pageSection = document.querySelectorAll('.nextPage');
    pageSection.forEach((pageTodo, index)=>{
        pageTodo.addEventListener('click', () => {
            const pageTodoIndex = pageTodo.getAttribute('page-todo-index');
            myDB.getSingleTodo(pageTodoIndex)
            console.log(pageTodoIndex)
        })
    });
    deleteAll.addEventListener('click', async () => {
       const confirmDeleteAll = confirm("Are you sure you want to delete all todo?");
       if (confirmDeleteAll) {
            alert("Deleted");
            localStorage.setItem("todoList", "[]");
            const localData = myDB.getTodo();
            console.log(localData)
            window.location.reload();
       }
    });


console.log(myDB)














 
  
// testing bosses code example
// testing();
function testing() {
    const init = new DataBase(10, 8);
    
    const addition = init.add();
    const substract = init.subt();

    console.log("addition", addition)
    console.log("substract", substract)
}








