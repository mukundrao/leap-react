import { createContext, useContext, useState } from "react";

const TodoContext = createContext(null);

const useTodo = () =>{
    if(TodoContext){
        return useContext(TodoContext);
    }
    else{
        return new Error("Context is null");
    }
}
const TodoProvider = ({children}) => {
    const [todoTasks, updateTodoTasks] = useState([]);

    const deleteTodoOnClick = (index)=>{
    const filteredTodos = todoTasks.filter((val,i)=>{
      return i!=index;
    })
    updateTodoTasks(filteredTodos);
  }

  const saveEditTodo = (val,index)=>{
    const todoTasksCopy = [...todoTasks];
    todoTasksCopy[index] = val;
    updateTodoTasks([...todoTasksCopy]);
  }

  const exports = {
    todoTasks,
    deleteTodoOnClick,
    saveEditTodo
  }

  return (
    <TodoContext.Provider value={exports}>{children}</TodoContext.Provider>
  )
}

export default TodoProvider;