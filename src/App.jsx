import { useState,useEffect } from 'react'
import './App.css'
import { TodoList } from './Components/TodoList'
function App() {
  const [todoInput,updateTodoInput] = useState("")
  const [todoTasks,updateTodoTasks] = useState([])
  const [loading,updateLoading] = useState(true)

  const apiURL = 'https://dummyjson.com/todos?limit=5'
  console.log("todoInput", todoInput);
  console.log("todoTasks",todoTasks);

  const addTodoInputOnAdd = ()=>{
    updateTodoTasks([...todoTasks,todoInput]);
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

  useEffect(()=>{
    fetchTodosFromApi(apiURL);
  },[])
  
 
  if(loading==true){
    return(
      <>
      <h3>Loading Todos...</h3>
      </>
    )
  }
  else{
    if(todoTasks.length>0){
    return (
    <>
      <h1>Todo App</h1>
      <div id="input-container">
        <input type="text" onChange={(event)=>{updateTodoInput(event.target.value)}}/>
        <button onClick={addTodoInputOnAdd}>Add</button>
      </div>
      <h3>My Todos</h3>
      <TodoList todoTasks={todoTasks} deleteFunction={deleteTodoOnClick} saveEditFunction={saveEditTodo}/>
      
    </>
  )
  }
  else{
    return (
    <>
      <h1>Todo App</h1>
      <div id="input-container">
        <input type="text" onChange={(event)=>{updateTodoInput(event.target.value)}}/>
        <button onClick={addTodoInputOnAdd}>Add</button>
      </div>
      <h3>Add Some Tasks</h3>     
    </>
  )
  }
  }
  
  
}

export default App
