const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const app = express();
var todoList = [];

app.use(cors());
app.use(express.json());

app.get("/api/todo-app", (req, res) => {
  console.log("===todolist", todoList);
  res.json(todoList);
});

app.post("/api/todo-app", (req, res) => {
  console.log("==body", req.body);
  const { title } = req.body;
  todoList.push({
    id: uuidv4(),
    title: title,
    completed: false,
  });
  res.json(todoList);
});

app.put("/api/todo-app", (req, res) => {
  const { id, title } = req.body;

    if(!("title" in req.body)){
      return res.status(404).json({
        message:`${JSON.stringify(req.body)} :This attribute is not accepted, Required attributes is title`
      })
    }
  const editedTodo = todoList.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        title: title,
      };
    } else {
      return item;
    }
  });
  todoList = editedTodo;
  res.json(editedTodo);
});

app.delete("/api/todo-app", (req, res) => {
  console.log("deleteid==", req.body);
  const { id } = req.body;
 const deleteIndex=todoList.findIndex(item=>item.id===id);
  if(deleteIndex !== -1)
  {
    todoList.splice(deleteIndex,1);
  return res.json(todoList);
}
res.status(404).json({
  message:`This item with id- ${id}  doesn't not exist`
})

  // let filteredtask = todoList.filter((task) => task.id !== id);
  // console.log("deleted task==", filteredtask);
  // todoList = filteredtask;
  // res.json(todoList);
});



app.put("/api/todo-app/toggle", (req, res) => {
  console.log("===body toggle", req.body);
  const { id} = req.body;
  const isExist = todoList.find((item) => item.id === id);
  if (isExist) {
    todoList.forEach((item) => {
      if (item.id === id) {
        item.completed = !(item.completed);
      }
    });
    return res.json(todoList);
  }
  res.status(404).json({
    message: `item with ${id} dosen't exist`,
  });
});

const PORT = 3005;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
