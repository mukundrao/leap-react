import { TodoItem } from "./TodoItem";
export function TodoList(props){
    const {todoTasks, deleteFunction, saveEditFunction} = props;
    return(
        <ul>
            {
                todoTasks.map((todo,index)=>{
                    return <TodoItem todoName={todo} key={todo} index={index} deleteFunction={deleteFunction} saveEditFunction={saveEditFunction}/>
                })
            }
        </ul>
    )

}