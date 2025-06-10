import {configureStore} from "@reduxjs/toolkit"
import todoReducers from "./features/todoSlice"

const store = configureStore({
    reducer:todoReducers
})

export default store;