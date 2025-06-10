import TodoItem from "./TodoItem";
import { useTodo } from "../hooks/useTodo";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
function TodoList(props){
    //const {todoTasks} = useTodo();
    const todoTasks = useSelector((state)=>state.todoTasks);
    const navigate = useNavigate();
    console.log("todo tasks in list", todoTasks)
    return(
        <ul>
            {
                todoTasks.map((todo,index)=>{
                    return <div><h3 onClick={()=>{navigate(`/todos/${index}`)}} todoName={todo} key={todo} index={index}>{todo}</h3></div>
                })
            }
        </ul>
    )

}

export default React.memo(TodoList);