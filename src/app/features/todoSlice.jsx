import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

const apiURL = 'https://dummyjson.com/todos?limit=5'
export const addApiTodos = createAsyncThunk("addApiTodos", async function(todo){
    const data = fetch(apiURL,{
        method:"POST",
        body:JSON.stringify(todo)
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
            console.log("fulfilled",state);
        }).addCase(addApiTodos.rejected,function(state,action){
            console.log("rejected",state);
        }).addCase(addApiTodos.pending,function(state,action){
            console.log("pending",state);
        })
    }

})

export const {addTodos,addTodosFromApi,updateLoading,updateTodos,deleteTodos} = todoSlice.actions;
const todoReducers = todoSlice.reducer;
export default todoReducers;