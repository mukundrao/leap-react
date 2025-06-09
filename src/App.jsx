import { useState,useEffect, useRef } from 'react'
import './App.css'
import TodoList from './Components/TodoList'
import { useTodo } from './hooks/useTodo'
function App() {
  //const [todoInput,updateTodoInput] = useState("")
  // const [todoTasks,updateTodoTasks] = useState([])
  // const [loading,updateLoading] = useState(true)

  const {todoInput,todoTasks,loading,addTodoInputOnAdd,updateTodoInput,fetchTodosFromApi} = useTodo(); 
  const apiURL = 'https://dummyjson.com/todos?limit=5'

  const ref = useRef(null);

  console.log("todoInput", todoInput);
  console.log("todoTasks",todoTasks);

  // const addTodoInputOnAdd = ()=>{
  //   addTodo(todoInput);
  //   updateTodoInput("");
  // }

  useEffect(()=>{
    fetchTodosFromApi(apiURL);
  },[])

  ref?.current?.focus();
  console.log("ref",ref.current)
  
 
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
        <input ref = {ref} type="text" onChange={(event)=>{updateTodoInput(event.target.value)}}/>
        <button onClick={addTodoInputOnAdd}>Add</button>
      </div>
      <h3>My Todos</h3>
      <TodoList />
      
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
