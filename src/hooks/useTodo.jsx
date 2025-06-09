import { createContext, useContext, useState } from "react";

const TodoContext = createContext(null);

export const useTodo = () =>{
    if(TodoContext){
        return useContext(TodoContext);
    }
    else{
        return new Error("Context is null");
    }
}
const TodoProvider = ({children}) => {
    const [todoInput,updateTodoInput] = useState("")
    const [todoTasks, updateTodoTasks] = useState([]);
    const [loading,updateLoading] = useState(true);

    const addTodoInputOnAdd = ()=>{
    updateTodoTasks([...todoTasks,todoInput]);
    updateTodoInput("");
  }

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

  const fetchTodosFromApi = async (apiURL)=>{
    const res = await fetch(apiURL);
    const data = await res.json();
    console.log(data);
    const todosFromApi = data.todos.map((val)=>val.todo)
    console.log("todos from API", todosFromApi)
    updateTodoTasks(todosFromApi);
    updateLoading(false)
  }

  const exports = {
    todoInput,
    todoTasks,
    loading,
    addTodoInputOnAdd,
    updateTodoInput,
    deleteTodoOnClick,
    saveEditTodo,
    fetchTodosFromApi
  }

  return (
    <TodoContext.Provider value={exports}>{children}</TodoContext.Provider>
  )
}

export default TodoProvider;