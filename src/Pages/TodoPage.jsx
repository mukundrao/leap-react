import TodoList from "../Components/TodoList"
import { useSelector,useDispatch } from "react-redux";
import { addApiTodos, addTodos,addTodosFromApi } from "../app/features/todoSlice";
import { useState,useRef,useEffect } from "react";
export function TodoPage(props){
    const [todoInput,updateTodoInput] = useState("")
    const todoTasks = useSelector((state)=>state.todoTasks);
    const loading = useSelector((state)=>state.loading);
    const dispatch = useDispatch();
    const ref = useRef(null);
    const apiURL = 'https://dummyjson.com/todos?limit=5'
    const addTodo = ()=>{
        dispatch(addTodos(todoInput));
        dispatch(addApiTodos(todoInput));
      }
    ref?.current?.focus();
    console.log("ref",ref.current)
    
    const fetchTodosFromApi = async (apiURL,loadingValue)=>{
    const res = await fetch(apiURL);
    const data = await res.json();
    console.log(data);
    const todosFromApi = data.todos.map((val)=>val.todo)
    console.log("todos from API", todosFromApi)
    console.log("API called")
    dispatch(addTodosFromApi({val:todosFromApi,load:loadingValue}));
    //dispatch(updateLoading(loadingValue))
    //dispatch({type:UPDATE_LOADING,payload:loadingValue});
    }

    useEffect(()=>{
    fetchTodosFromApi(apiURL,false);
    },[])
    return(
        <>
        <h1>Todo App</h1>
      <div id="input-container">
        <input ref = {ref} type="text" onChange={(event)=>{updateTodoInput(event.target.value)}}/>
        <button onClick={addTodo}>Add</button>
      </div>
      <h3>My Todos</h3>
      <TodoList />
    
        </>
    )
}