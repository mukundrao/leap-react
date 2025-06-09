import TodoItem from "./TodoItem";
import { useTodo } from "../hooks/useTodo";
import React from "react";
function TodoList(props){
    const {todoTasks} = useTodo();
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