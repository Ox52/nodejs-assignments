// start creating server here

const express = require("express");

const app = express();
const Port = 3000;

app.use(express.json());

let todos = [];

let currentId = 1;

app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

//create a todo;
//

app.post("/create/todo", (req, res) => {
  const { title, description } = req.body;

  const newTodo = {
    id: currentId++,
    title,
    description,
  };

  todos.push(newTodo);

  res.status(201).json(todos);
});

//get all todos
app.get("/todos", (req, res) => {
  res.status(201).json(todos);
});

//get a single todo
//
//

app.get("/todo/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(404).json({ Error: "todo not found" });
  }

  const todo = todos.filter((t) => t.id === id);

  if (!todo) {
    res.status(404).json({ Error: "todo not found" });
  }

  res.status(201).json(todo);
});

app.put("/todo/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ Error: "todo not found" });
  }

  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    res.status(400).json({ Error: "todo not found" });
  }

  const { title, description } = req.body;

  if (title !== undefined) todo.title = title;
  if (description !== undefined) todo.description = description;

  res.status(201).json(todo);
});

app.delete("/todo/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(401).json({ Error: "todo not found" });
  }

  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    res.status(401).json({ Error: "todo not found" });
  }

  todos.splice(index, 1);

  res.status(201).json("deleted succesfully");
});
