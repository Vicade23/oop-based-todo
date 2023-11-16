class DataBase {

    constructor(save) {
        this.save = save;
    }

    getTodo() {
        const localData = JSON.parse(localStorage.getItem('todoList'));
        return localData;
    }

    storeTodo() {
        const localData = this.getTodo();
        console.log(this.save);
        window.location.reload()
        if (localData) {
            const allTodo = [...localData, this.save];
            const strTodo = JSON.stringify(allTodo);
            localStorage.setItem('todoList', strTodo);
            window.location.reload();

        }
        else {
            const allTodo = [this.save];
            const strTodo = JSON.stringify(allTodo);
            localStorage.setItem('todoList', strTodo);
        }

    }

    
    updateTodo(data, index) {
        const localData = this.getTodo();
        localData[index] = data;
        const stringValue = JSON.stringify(localData);
        localStorage.setItem('todoList', stringValue); 
        console.log(localData)
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

}

// class UpdateTodo extends DataBase {
//     constructor(save, data, index) {
//         this.data = data;
//         this.index = index;
//     };

//     UpdateTodo() {
//         const localData = this.getTodo();
//         localData[this.index] = this.data;
//         const stringValue = JSON.stringify(localData);
//         localStorage.setItem('todoList', stringValue); 
//     }
// }

    export default DataBase;