import  DataBase  from "./services.js";
const myDataBase = new DataBase();

const myKeyValues = window.location.search;
console.log('myKeyValues', myKeyValues);
const urlParams = new URLSearchParams(myKeyValues);

const param1 = urlParams.get('todoindex')


const localData = myDataBase.getTodo();
const getDataFromDB = localData[param1];
console.log(getDataFromDB)

const text = document.getElementById('text');
const describe = document.getElementById('describe');
const date = document.getElementById('date');
const time = document.getElementById('time');
text.value = getDataFromDB.names
describe.value = getDataFromDB.descr
date.value = getDataFromDB.dates
time.value = getDataFromDB.times