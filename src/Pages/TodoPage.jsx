import TodoList from "../Components/TodoList"
export function TodoPage(props){
    
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