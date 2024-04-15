import React from 'react'
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
const Todo = ({todo,delTodo,editTodo,func,value}) => {
    const handeldelete = () => {
        delTodo(todo.id)
    }
    // 
      const handleEdit = () => {
        editTodo(todo.id)
      };
   

 
    return (
        <div className="todo flex gap-5 items-center">
            <input type="checkbox" name={todo.id} id="" checked={value} onChange={func}/>
            <div className={`task w-2/3 ${todo.isCompleted?'line-through':''} break-words`}>
                {todo.todo}
            </div>
            <div className="buttons space-x-2">
                <button className='button text-2xl' onClick={handleEdit}><CiEdit /></button>
                <button className='button text-2xl' onClick={handeldelete}><MdDelete /></button>
            </div>
        </div>
    )
}

export default Todo
