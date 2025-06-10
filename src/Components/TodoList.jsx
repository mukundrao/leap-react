import TodoItem from "./TodoItem";
import { useTodo } from "../hooks/useTodo";
import React from "react";
import { useSelector } from "react-redux";
function TodoList(props){
    //const {todoTasks} = useTodo();
    const todoTasks = useSelector((state)=>state.todoTasks);
    console.log("todo tasks in list", todoTasks)
    return(
        <ul>
            {
                todoTasks.map((todo,index)=>{
                    return <TodoItem todoName={todo} key={todo} index={index}/>
                })
            }
        </ul>
    )

}

export default React.memo(TodoList);