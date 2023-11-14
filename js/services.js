class DataBase {
    constructor(todo, index){
        this.todo = todo;
        this.index = index;
       }

       getTodo() {
            const todoList = JSON.parse(localStorage.getItem('todoList'));
            return todoList;
        }

       storeTodo(myData) {
            const todoList = this.getTodo();
            console.log(todoList)
            if (todoList) {
                const allTodo = [...todoList, myData];
                const strAllTodo = JSON.stringify(allTodo);
                localStorage.setItem('todoList', strAllTodo)
                const myLenght = allTodo.length;
                return myLenght;
            }
            else {
                const allTodo = [myData];
                const strAllTodo = JSON.stringify(allTodo)
                localStorage.setItem('todoList', strAllTodo)
                console.log(allTodo.length);
                const myLenght = allTodo.length;
                return myLenght;
            }
       }

        updateTodo(data, index){
            const todoList = this.getTodo();
            todoList[index] = data;
            const stringValue = JSON.stringify(todoList);
            localStorage.setItem('todoList', stringValue); 
        }

        deleteTodo(index) {
            const todoList = this.getTodo();
            console.log(index);
            console.log("length before delete", todoList.length)
            const deleteStrg = todoList.splice(index, 1); 
            console.log("length after delete", todoList.length)
            const stringValue = JSON.stringify(todoList);
           localStorage.setItem('todoList', stringValue);
        }

        getSingleTodo(index){
            const todoList = this.getTodo();
            console.log(index)
            return todoList.find((todo, todoIndex)=>todo.length===index);
        }
}
    export default DataBase;