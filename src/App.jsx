import { useState,useEffect, useRef } from 'react'
import './App.css'
import TodoList from './Components/TodoList'
import { useTodo } from './hooks/useTodo'

import { useSelector,useDispatch } from 'react-redux'

import {addTodos,addTodosFromApi,updateLoading,updateTodos,deleteTodos} from './app/features/todoSlice'
import WelcomeCard from './Components/WelcomeCard'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { HomePage } from './Pages/Home'
import { TodoPage } from './Pages/TodoPage'
import { NotFoundPage } from './Pages/NotFoundPage'
import { TodoIndividualPage } from './Pages/TodoIndividualPage'
function App() {
  const [todoInput,updateTodoInput] = useState("")
  // const [todoTasks,updateTodoTasks] = useState([])
  // const [loading,updateLoading] = useState(true)

  //const {todoInput} = useTodo();
  const todoTasks = useSelector((state)=>state.todoTasks);
  const loading = useSelector((state)=>state.loading);
  // const {addTodoInputOnAdd,updateTodoInput,fetchTodosFromApi} = useSelector();
  // const {todoInput,todoTasks,loading,addTodoInputOnAdd,updateTodoInput,fetchTodosFromApi} = useSelector();
  //const {todoInput,todoTasks,loading,addTodoInputOnAdd,updateTodoInput,fetchTodosFromApi} = useTodo();

  const dispatch = useDispatch();
  
  const apiURL = 'https://dummyjson.com/todos?limit=5'

  const ref = useRef(null);

  //console.log("todoInput", todoInput);
  console.log("todoTasks",todoTasks);

  // const addTodoInputOnAdd = ()=>{
  //   addTodo(todoInput);
  //   updateTodoInput("");
  // }

  const addTodo = ()=>{
    dispatch(addTodos(todoInput));
  }

  const fetchTodosFromApi = async (apiURL,loadingValue)=>{
    const res = await fetch(apiURL);
    const data = await res.json();
    console.log(data);
    const todosFromApi = data.todos.map((val)=>val.todo)
    console.log("todos from API", todosFromApi)
    dispatch(addTodosFromApi({val:todosFromApi,load:loadingValue}));
    //dispatch(updateLoading(loadingValue))
    //dispatch({type:UPDATE_LOADING,payload:loadingValue});
  }

  useEffect(()=>{
    fetchTodosFromApi(apiURL,false);
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
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/todos" element={<TodoPage/>}/>
        <Route path="/todos/:id" element={<TodoIndividualPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/> 
      </Routes>
      
    </Router>
      
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
