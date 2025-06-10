import { useState } from "react";
import { useTodo } from "../hooks/useTodo";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodos,updateTodos } from "../app/features/todoSlice";
import { useNavigate } from "react-router";
function TodoItem(props){
    const {index} = props;
    console.log("index",index);
    const todoTasks = useSelector((state)=>state.todoTasks);
    const todoName = todoTasks[index];
    const [edit,updateEdit] = useState(false)
    const [newTodo,updatenewTodo] = useState(todoName)

    

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    //const {deleteTodoOnClick,saveEditTodo} = useTodo();


    const editTodo = ()=>{
        dispatch(updateTodos({val:newTodo,index:index}))
        updateEdit(false);
    }
    if(edit==false){
        return (
        <div>
        <p className="todo-name">{todoName}</p>
        <button onClick={()=>{updateEdit(true)}}>Edit</button>
        <button onClick={()=>{
            dispatch(deleteTodos(index));
            navigate(-1);
            }}>Delete</button>
        <button onClick={()=>{navigate(-1)}}>Go back to Home</button>
        </div>
    )
    }
    else{
        return (
        <div>
        <input type="text" defaultValue={todoName} onChange={(event)=>{updatenewTodo(event.target.value)}}/>
        <button onClick={editTodo}>Save</button>
        </div> 
        )
    }
    
}

export default React.memo(TodoItem);

