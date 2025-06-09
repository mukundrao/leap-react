import { useState } from "react";
export function TodoItem(props){
    const {todoName,index, deleteFunction, saveEditFunction} = props;
    const [edit,updateEdit] = useState(false)
    const [newTodo,updatenewTodo] = useState(todoName)

    const editTodo = ()=>{
        saveEditFunction(newTodo,index);
        updateEdit(false);
    }
    if(edit==false){
        return (
        <div>
        <p className="todo-name">{todoName}</p>
        <button onClick={()=>{updateEdit(true)}}>Edit</button>
        <button onClick={()=>{deleteFunction(index)}}>Delete</button>
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

