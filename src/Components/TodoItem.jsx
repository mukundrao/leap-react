import { useState } from "react";
import { useTodo } from "../hooks/useTodo";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodos,updateTodos } from "../app/features/todoSlice";
function TodoItem(props){
    const {todoName,index} = props;
    const [edit,updateEdit] = useState(false)
    const [newTodo,updatenewTodo] = useState(todoName)

    const dispatch = useDispatch();
    
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
        <button onClick={()=>{dispatch(deleteTodos(index))}}>Delete</button>
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

