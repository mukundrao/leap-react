import { act, createContext, useContext, useReducer, useState } from "react";

const TodoContext = createContext(null);

const ADD_TODOS = "ADD_TODOS";
const ADD_TODOS_FROM_API = "ADD_TODOS_FROM_API";
const UPDATE_LOADING = "UPDATE_LOADING";
const UPDATE_TODOS = "UPDATE_TODOS";
const DELETE_TODOS = "DELETE_TODOS";

export const useTodo = () =>{
    if(TodoContext){
        return useContext(TodoContext);
    }
    else{
        return new Error("Context is null");
    }
}

const initialTodosState ={
    todoTasks : [],
    loading : true
}

const todosReducer = (state = initialTodosState, action) =>{
    switch(action.type){
        case ADD_TODOS:
            return{
                ...state,
                todoTasks : [...state.todoTasks,action.payload]
            }
        case ADD_TODOS_FROM_API:
            return{
                ...state,
                todoTasks : [...action.payload.todos],
                loading : action.payload.load

            }
        case UPDATE_LOADING:
            return{
                ...state,
                loading : action.payload
            }
        case UPDATE_TODOS:{
            const todoTasksCopy = [...state.todoTasks];
            todoTasksCopy[action.payload.index] = action.payload.val;
            return{
                ...state,
                todoTasks : todoTasksCopy
            }
        }
        case DELETE_TODOS:{
            const filteredTodos = state.todoTasks.filter((val,i)=>{
                return i!=action.payload;
            })
            return{
                ...state,
                todoTasks : filteredTodos
            }
        }
    }
}


const TodoProvider = ({children}) => {
    const [todoInput,updateTodoInput] = useState("")
    // const [todoTasks, updateTodoTasks] = useState([]);
    // const [loading,updateLoading] = useState(true);

    const [state,dispatch] = useReducer(todosReducer, initialTodosState)

    const addTodoInputOnAdd = (todo)=>{
    dispatch({type:ADD_TODOS,payload:todo});
  }

    const deleteTodoOnClick = (index)=>{
    dispatch({type:DELETE_TODOS,payload:index});
  }

  const saveEditTodo = (val,index)=>{
    dispatch({type:UPDATE_TODOS,payload:{index:index,val:val}})
  }

  const fetchTodosFromApi = async (apiURL,loadingValue)=>{
    const res = await fetch(apiURL);
    const data = await res.json();
    console.log(data);
    const todosFromApi = data.todos.map((val)=>val.todo)
    console.log("todos from API", todosFromApi)
    dispatch({type:ADD_TODOS_FROM_API,payload:{todos:todosFromApi,load:false}});
    //dispatch({type:UPDATE_LOADING,payload:loadingValue});
  }


  const exports = {
    todoInput,
    todoTasks : state.todoTasks,
    loading : state.loading,
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