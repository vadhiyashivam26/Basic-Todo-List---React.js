import { useState } from "react";
import {v4 as uuidv4} from "uuid";
import "./Todo.css"

export default function TodoList(){
    let [todos, setTodos] = useState([{task:"Eat", id: uuidv4(), isDone: false}]);
    let [newTodo, setNewTodo] = useState("");

    let doneStyle = {
        textDecorationLine : "line-through",
    }

    let addTask = () => {
        setTodos((prevTodos) => {
            return [...prevTodos, {task: newTodo, id: uuidv4(), isDone: false}];
        });
        setNewTodo("");
    }
    
    let addTodoValue = (event) => {
        setNewTodo(event.target.value);
    }

    let deleteTodo = (id) => {
        setTodos(() =>(
            todos.filter((prevTodos) => prevTodos.id != id)
        ))
    }  
    
    let AllMarkAsDone = () => {
        setTodos((prevTodos) => (
            prevTodos.map((todo) => {
                return {
                    ...todo, isDone: true,
                };
            })  
        )) 
    }

    let singleMarkAsDone = (id) => {
        setTodos((prevTodos) => (
            prevTodos.map((changeTask) =>{
                if(changeTask.id === id){
                    return {...changeTask, isDone : true}
                } else {
                    return {...changeTask}
                }
            })
        ))
    }
    

    return (
        <>
            <h4>Todo List</h4>
            <input type="text" className="input" value={newTodo} onChange={addTodoValue} placeholder="Enter Tasks"/> &nbsp;&nbsp;&nbsp;
            <button onClick={addTask}>Add</button>
            <br /><br />
            <hr />
            <h4> All Tasks</h4>
            
        <div className="main-card" >    
            <ul className="card-body" >
                <button onClick={AllMarkAsDone} className="markAll" >Mark As Done All Tasks</button>
                {              
                    todos.map((todo) => (
                        <li className="card" key={todo.id}>
                        <div className="task-container" >
                            {
                                todo.isDone ? (
                                    <p style={{textDecorationLine : "line-through"}}>{todo.task}</p>
                                ) : (
                                    <span>{todo.task}</span>
                                )
                            }
                        </div>
                            <div className="btns">
                                <button onClick={()=> deleteTodo(todo.id)}>Delete</button>
                                <button onClick={()=> singleMarkAsDone(todo.id)} >Mark As Done</button>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
        </>
    )
}