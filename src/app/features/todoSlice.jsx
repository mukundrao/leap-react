import {createSlice} from "@reduxjs/toolkit"

const todoSlice = createSlice({
    name : "todos",
    initialState:{
        todoTasks : [],
        loading : true
    },
    reducers:{
        addTodos: function(state,action){
            state.todoTasks.push(action.payload);
        },
        addTodosFromApi: function(state,action){
            state.todoTasks = action.payload.val;
            state.loading = action.payload.load;
        },
        updateLoading: function(state,action){
            state.loading = action.payload;
        },
        updateTodos : function(state,action){
            const todosCopy = [...state.todoTasks]
            todosCopy[action.payload.index] = action.payload.val;
            state.todoTasks = todosCopy;
        },
        deleteTodos : function(state,action){
            const deletedTodos = state.todoTasks.filter((val,i)=>{
                return i!=action.payload
            })
            state.todoTasks = deletedTodos;
        }
    }
})

export const {addTodos,addTodosFromApi,updateLoading,updateTodos,deleteTodos} = todoSlice.actions;
const todoReducers = todoSlice.reducer;
export default todoReducers;