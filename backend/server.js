import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose"

let conn = mongoose.connect("mongodb://localhost:27017/todo")

let sch = new mongoose.Schema({
    id: { type: String, unique: true},
    todo: String,
    isCompleted: Boolean
})

let myTodo = new mongoose.model("myTodo",sch)

const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())

app.post('/', (req, res) => {
    let fetchdata = async()=>{
        if(req.body!==undefined){           
            Array.from(req.body).forEach(async(todo)=>{
                const existing = await myTodo.findOne({ id: todo.id });
                if (!existing) {
                    const newTodo = new myTodo(todo);
                    await newTodo.save();
                }else{
                    await myTodo.updateOne({id:todo.id},{isCompleted: todo.isCompleted})
                }
            })
        }
    }
   fetchdata();
  res.send('Hello  World!')
})

app.get("/fetchdb",(req,res)=>{
    let fetchdb = async()=>{
        let data = await myTodo.find({})
        res.json(data)
    }
    fetchdb()
})

app.delete("/delete",(req,res)=>{
    let deldb = async()=>{
        console.log(req.body)
        await myTodo.deleteOne({id: req.body.id})
    }
    deldb()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})