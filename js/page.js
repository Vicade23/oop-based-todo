import  DataBase  from "./services.js";
const myDB = new DataBase();

const myKeyValues = window.location.search;
console.log('myKeyValues', myKeyValues);
const urlParams = new URLSearchParams(myKeyValues);

const param1 = urlParams.get('todoindex')


const localData = myDB.getTodo();
const getDataFromDB = localData[param1];
console.log(getDataFromDB)

const text = document.getElementById('text');
const describe = document.getElementById('describe');
const date = document.getElementById('date');
const time = document.getElementById('time');
text.value = getDataFromDB.todoTitle
describe.value = getDataFromDB.todoDescription
date.value = getDataFromDB.todoDate
time.value = getDataFromDB.todoTime