const { createSlice } = require("@reduxjs/toolkit");


let initialState = {
    listOfTodo : [],
}

let todos = createSlice({
    name:"todos",
    initialState,

    reducers:{

        addTodo:(state, action)=>{
            state.listOfTodo.push(action.payload)
            
        },

        deleteTodo :(state, action)=>{
            let filtered = state.listOfTodo.filter((e)=> e.id !== action.payload) 
            if (filtered) {             
                return {...state ,listOfTodo:filtered}
            }else{
                console.log("no")
            }
        },

        editTodo : (state, action)=>{
           let find = state.listOfTodo.find((e)=>e.id==action.payload.id)
           if (find) {
                find.title = action.payload.title
                find.description = action.payload.description
           }else{
            console.log("no");
           }      
        }
    }
})

export const {addTodo} = todos.actions
export const {deleteTodo} = todos.actions
export const {editTodo} = todos.actions
export const todoReducer = todos.reducer
export const todoSelector = (state)=>state.todoReducer.listOfTodo