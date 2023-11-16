'use strict';
import DataBase from "./services.js";

// Var decleration.
const form = document.getElementById('form');
const theAddButton = document.getElementById('theAddButton');
const errors = document.getElementById('errors');
const lineList = document.getElementById('lineList');
const saveChanges = document.getElementById('saveChanges');
const deleteAll = document.getElementById('deleteAll');
const todoDescription = document.getElementById('todoDescription');
const todoTime = document.getElementById('todoTime');
const textInput = document.getElementById('todoTitle');
const dateInput = document.getElementById('todoDate');
const myErrors = document.getElementById('myErrors');



class Validate {
    constructor() {
        // this.inputs = todo;
    }

    gatherInputs() {
        const todoname = textInput.value;
        const tododate = dateInput.value;
        const tododescr = todoDescription.value;
        const todotime = todoTime.value;
        const todo = {
            todoname,
            tododate,
            tododescr,
            todotime
        }
        return todo;
    }

    findEmptyInput() {
        const inputed = this.gatherInputs();
        if (inputed.todoname && inputed.tododate && inputed.tododescr && inputed.todotime) {
            const inputed = this.gatherInputs();
            myErrors.style.color = 'rgb(2, 165, 2)';
            myErrors.innerHTML = 'Added';
            const aList = {
                names: inputed.todoname,
                dates: inputed.tododate,
                descr: inputed.tododescr,
                times: inputed.todotime
            }
            const myDataBase = new DataBase(aList);

            textInput.value = '';
            todoTime.value = '';
            dateInput.value = '';
            todoDescription.value = '';
            myDataBase.storeTodo();
        }
        else {
            alert('Input all fields.');
        }
    }

    mappingLists() {
        const myDataBase = new DataBase();
        const localData = myDataBase.getTodo();
        if (localData) {
            lineList.innerHTML = localData.map((myObj, index) => {
                const element =
                    `<li data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-todo-list-index="${index}" 
                        data-aos-duration="800" id="myListedTodo"
                        class="myListedTodo d-flex align-items-center bg-secondary border rounded-pill border-secondary p-2 m-auto my-3">
                        <div class="listName bg-transparent border-0 w-50 p-2">${index+1}) ${myObj.names}</div>
                        <span class="seperator h4 d-none d-sm-block">|</span>
                        <span id="userTime" class="p-1 h6 fw-bold my-auto d-none d-md-block">${myObj.dates}</span>
                        <div class="m-auto"></div>
                        <a href="page.html?todoindex=${index}" page-todo-index="${index}" class="nextPage" target="_blank">
                        <button class="bg-secondary border-0 btn btn-sm me-1"><i class="bi bi-eye-fill fw-bold h3"></i></button></a>
                        <button title="Edit" class="edits edit-button bg-secondary border-0 btn btn-sm me-1" id="errors"
                        data-todo-date="${myObj.dates}" data-todo-list="${myObj.names}" data-todo-description="${myObj.descr}" 
                        data-todo-time="${myObj.times}"
                        data-todo-index="${index}" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">
                        <i class="bi bi-pen-fill fw-bold h3"></i>
                        </button>
                        <button title="Delete" id="deletes" data-todo-delete-index="${index}" class="deletes bg-secondary border-0 btn btn-sm me-1">
                        <i class="bi bi-trash-fill fw-bold h3"></i>
                        </button>
                    </li>`;
                return element;
            })
        }
        else {
            window.location.re
        }
        
    }

    editTodo() {
        const myDataBase = new DataBase();
        const myEdits = document.querySelectorAll('.edit-button');
        const localData = myDataBase.getTodo();
        if (localData) {
                
            myEdits.forEach((arrayItem, index)=>{
                arrayItem.addEventListener("click", function(){
                    const todoDataDate = arrayItem.getAttribute('data-todo-date')
                    const todoDataList = arrayItem.getAttribute('data-todo-list')
                    const todoDataDescription = arrayItem.getAttribute('data-todo-description')
                    const todoDataTime = arrayItem.getAttribute('data-todo-time')
                    const todoDataIndex = arrayItem.getAttribute('data-todo-index')
                    handleTodo({todoDataDate, todoDataList, todoDataDescription, todoDataTime, todoDataIndex});
                }) 
            });
            
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
                const names = document.getElementById('update-todo-title').value;
                const dates = document.getElementById('update-todo-date').value;
                const descr = document.getElementById('update-description').value;
                const times = document.getElementById('update-todo-time').value;
                const modalButton = document.getElementById('modal-button');
                myDataBase.updateTodo({descr,dates,names,times}, todoIndex);
                closeButton.click()
                window.location.reload();
            });
        }
    }


    deleteSingle() {
        // delte section 
        const myDataBase = new DataBase();
        const myListedTodo = document.querySelectorAll('.myListedTodo');
        const deletes = document.querySelectorAll('.deletes');
        deletes.forEach((myDeletes, index)=>{
            myDeletes.addEventListener('click', () => {
            const todoDataDeleteIndex = myDeletes.getAttribute('data-todo-delete-index');
            const notify = window.confirm('Are you sure you want to delete this todo?')
            if (notify) {
                myDataBase.deleteTodo(todoDataDeleteIndex);
                window.location.reload();
                window.location.reload();
            }
            })
        });
    }

    processingPage() {
        const myDataBase = new DataBase();
        const pageSection = document.querySelectorAll('.nextPage');
        pageSection.forEach((pageTodo, index)=>{
            pageTodo.addEventListener('click', () => {
                const pageTodoIndex = pageTodo.getAttribute('page-todo-index');
                myDataBase.getSingleTodo(pageTodoIndex)
                console.log(pageTodoIndex)
            })
        });
    }

    deleteAllTodo() {
        
        deleteAll.addEventListener('click', () => {
        const myDataBase = new DataBase();
            const confirmDeleteAll = confirm("Are you sure you want to delete all todo?");
            if (confirmDeleteAll) {
                alert("Deleted");
                localStorage.setItem("todoList", "[]");
                const localData = myDataBase.getTodo();
                console.log(localData)
                window.location.reload();
            }
        });
    }


    hideAndShow() {
        const myDataBase = new DataBase();
        const localData = myDataBase.getTodo();
        const end = document.getElementById('end');
        const scrollDown = document.getElementById('scroll-down');
        if ( localData === null || localData.length === 0) {
            deleteAll.style.display = 'none';
            scrollDown.style.display = 'none';
            end.style.display = 'none';
        }
        else {
            deleteAll.style.display = 'block';
        }
    }
    
}



form.addEventListener('submit', (e) => {
    e.preventDefault();
    const myValidation = new Validate();
    myValidation.findEmptyInput();
});

myFunctions();
function myFunctions() {
    const myValidation = new Validate();
    myValidation.mappingLists();
    myValidation.editTodo();
    myValidation.deleteSingle();
    myValidation.processingPage();
    myValidation.deleteAllTodo();
    myValidation.hideAndShow();
}
