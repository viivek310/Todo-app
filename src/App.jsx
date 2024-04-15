import { useState,useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import Todo from './components/Todo'
import { v4 as uuidv4 } from 'uuid';
import { todoContext } from './context/context';



function App() {
 const [todo, settodo] = useState("")
 const [todos, settodos] = useState([])
 const [finished, setfinished] = useState(true)
 const todosContainer = useRef(null)



 
useEffect(() => {
  setTimeout(() => {
    todosContainer.current?.scrollIntoView({ behavior: 'auto', block: 'end', inline: 'nearest' });
  }, 0);
}, [todos]);

 let handelChange = (e)=>{
  settodo(e.target.value)
 }

 let handelClick = (e=>{
  settodos([...todos,{id:uuidv4(), todo, isCompleted: false}])
  settodo("")
 })

 let Completed = (e)=>{
  let id = e.target.name;
  let index = todos.findIndex(item=>{
    return item.id===id
  })
  let newTodos = [...todos]
  newTodos[index].isCompleted=!newTodos[index].isCompleted
  settodos(newTodos)
 }

 let delTodo = (id)=>{

 let newTodos = todos.filter(item=>{
    return item.id!==id
  })
  settodos(newTodos);
 }

 let editTodo = (id)=>{
  settodo(todos.filter(item=>{
    return item.id===id;
  })[0].todo)
  delTodo(id)
  }

  let toggle = ()=>{
    setfinished(!finished)
  }
  return (
    <>
     
          <Navbar />
      <main>
        <div className="container w-3/4 mx-auto my-5 px-10 py-5 bg-purple-400 h-[80vh] rounded-lg">
          <h2 className='text-xl font-bold text-center'>Manage you todo list</h2>
          <div className="upper my-5">
            <div className="addtodo flex  gap-4 items-center">
              <label htmlFor="todoinp">Add todo</label>
              <input className='w-2/3' type="text" name="todoinp" id="todoinp" value={todo} onChange={handelChange}/>
              <button className='button' disabled={todo.length<=1} onClick={handelClick}>Save</button>
            </div>
          </div>

          <div className="showCompleted flex items-center">
            <label className='mx-5' htmlFor="showcomp" >Show completed</label>
            <input type="checkbox" name="" id="showcomp" onChange={toggle} checked={finished}/>
          </div>

          <div className="todos my-5 space-y-3 text-lg h-4/5 overflow-x-auto" ref={todosContainer}>
            {/* {todos.length<1 && <div>No todos to show</div>} */}
            {(todos.length<1||(finished===false && (todos.filter(item=>{return item.isCompleted===false}).length<1))) && <div>No todos to show</div>}
            {todos.map(items=>{
              return (finished || !items.isCompleted) && <Todo todo={items} key={items.id} value={items.isCompleted} func={Completed} delTodo={()=>delTodo(items.id)} editTodo={()=>editTodo(items.id)}/>
            })}
            
          </div>

        </div>


      </main>
    </>
  )
}

export default App
