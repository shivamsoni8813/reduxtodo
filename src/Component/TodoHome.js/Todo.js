import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, deleteTodo, editTodo, todoSelector } from '../../Store/Reducer/TodoReducer'
import './Todo.css'

const Todo = () => {
  let [change, setChange] = useState({
   
    title: "",
    description: ""
  })
  
 
  let [editState, setEditState] = useState(false)
  let [alert, setAlert] = useState(false)

  let dispatch = useDispatch()
  let deleteDispatch = useDispatch()

  let editfunc = useSelector(editTodo)
  let selectTodo = useSelector(todoSelector)


  let ids = Math.floor(Math.random()*100);
  
  let addingNote = () => {
    
    if (change.title.length <=0 && change.description.length<=0) {
        setAlert(true)
    }else{
      setAlert(false)
      dispatch(addTodo({...change, id:ids} ))
      setChange({ title: "", description: "" })
    }
   
  }
  
  let editNote = ()=>{
    dispatch(editTodo(change))
    setEditState(false)
    setChange({title:"",description:""})
  }

  let deleteTask = (id) => {
    deleteDispatch(deleteTodo(id))
  }

  let editTask = (todo)=>{
   let find = selectTodo.find((todos)=>todos.id==todo)
   setChange(find)
   setEditState(true)
  }

  return (
    <div className='todo'>
      <div className="container-fluid">
        {
          alert && <div className="alert alert-primary" role="alert">
         Enter a valid value
        </div>
        }
          <h1 className='text-center py-4'>To Do App With Redux</h1>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" value={change.title} onChange={(e) => setChange({ ...change, title: e.target.value })} id="floatingInput" placeholder="Enter Title" />
          <label htmlFor="floatingInput">Title</label>
        </div>
        <div className="form-floating">
          <input type="text" className="form-control" id="floatingText" value={change.description} onChange={(e) => setChange({ ...change, description: e.target.value })} placeholder="enter Details" />
          <label htmlFor="floatingPassword">Description</label>
        </div>
        <div className="btn btn-success text-center my-3" onClick={() => {editState ? editNote(): addingNote()}}>{editState? "EditNote":"Add Note"}</div>

      </div>
      <div className="list mx-3">
        <div className="row">
       
        {
          selectTodo.map((todo, i) => {
            return (

              <div className="card text-bg-light col-mb-3 mx-2" key={todo.id} style={{ maxWidth: "18rem" }}>
                <div className="card-header">{todo.title}</div>
                <div className="card-body">
                  <p className="card-text">{todo.description}</p>
                  <i className="fa-solid fa-trash" onClick={() => deleteTask(todo.id)} style={{ color: "#000000" }}></i>
                  <i className="fa-solid fa-edit mx-5" onClick={() => editTask(todo.id)} style={{ color: "#000000" }}></i>
                </div>
              </div>
            )
          })
        }
      </div>
            </div>
    </div>
  )
}

export default Todo
