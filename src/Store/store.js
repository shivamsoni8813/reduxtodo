import { configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "./Reducer/TodoReducer";
export let store = configureStore({
    reducer:{
        todoReducer
        
    }
})