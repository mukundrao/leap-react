import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"

const addTodoApiURL = 'https://dummyjson.com/todos/add'
export const addApiTodos = createAsyncThunk("addApiTodos", async function(todo){
    const res = await axios.post(addTodoApiURL,{
            todo : todo,
            completed : false,
            userId: 5
        });
    return res.data;
})

export const updateApiTodos = createAsyncThunk("updateApiTodos", async function(newTodo, index){
    const data = await fetch(updateTodoApiUrl,{
        method:"PUT",
        headers : {'Content-Type':'application/json'},
        body:JSON.stringify({
            completed: true
        })
    });

    const jsonData = await data.json();
    return jsonData;
})

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
    },
    extraReducers:(builder)=>{
        builder.addCase(addApiTodos.fulfilled,function(state,action){
            console.log("fulfilled",state,action.payload);
            state.todoTasks.push(action.payload.todo);
        }).addCase(addApiTodos.rejected,function(state,action){
            console.log("rejected",state,action.payload);
        }).addCase(addApiTodos.pending,function(state,action){
            console.log("pending",state,action.payload);
        })
    }

})

export const {addTodos,addTodosFromApi,updateLoading,updateTodos,deleteTodos} = todoSlice.actions;
const todoReducers = todoSlice.reducer;
export default todoReducers;