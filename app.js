'use strict';

var express = require('express');
var morgan = require("morgan");
var bodyParser = require('body-parser');
var app = express();
const todos = require("./models/todos.js");
const routes = require("./routes/index.js");
const { send } = require('express/lib/response');
module.exports = app; // esto es solo para testear mas facil

// acuerdense de agregar su router o cualquier middleware que necesiten aca

app.use(express.json())
app.use(bodyParser.json());


app.get("/users", (req, res) => {
    const people = todos.listPeople();
    res.status(200).send(people);
});

app.get("/users/:name/tasks", (req, res) => {
    const name = req.params.name;
    let tasks = todos.list(name);

    if(!todos.listPeople().find(n => n == name))
        return res.status(404).end();

    if(!req.query) res.status(200).send(tasks);
        
    if(req.query.status == "complete") tasks = tasks.filter(task => task.complete);

    if(req.query.status == "active") tasks = tasks.filter(task => !task.complete);

    res.status(200).send(tasks);
});

app.post("/users/:name/tasks", (req, res) => {
    const name = req.params.name;
    const task = req.body;
    
    for (const key in task) {
        console.log(key)
        if(key.toString() != "content" && key.toString() != "complete"){
            return res.status(400).send(task)
        } 
    }
    todos.add(name, task);
    res.status(201).send(task);
});

app.put("/users/:name/tasks/:index", (req, res) => {
    const {name, index} = req.params;
    todos.complete(name, index);
    res.status(200).end();
});

app.delete("/users/:name/tasks/:index", (req, res) => {
    const {name, index} = req.params;
    const removed = todos.remove(name, index);
    res.status(204).end();
});

app.use(morgan("tiny"));
// el condicional es solo para evitar algun problema de tipo EADDRINUSE con mocha watch + supertest + npm test.
if (!module.parent) app.listen(3000, () => {
  
    console.log("server UP.")
});
