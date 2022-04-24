'use strict';

var express = require('express');
var morgan = require("morgan");
var bodyParser = require('body-parser');
var app = express();
const todos = require("./models/todos.js");
const routes = require("./routes/index.js");
module.exports = app; // esto es solo para testear mas facil

// acuerdense de agregar su router o cualquier middleware que necesiten aca

app.use(express.json())
app.use(bodyParser.json());
// app.use("/api", routes)

app.get("/users", (req, res) => {
    res.body = todos.listPeople();
    res.status(200).send(res.body);
});

app.get("/users/:name/tasks", (req, res) => {
    const name = req.params.name;
    res.status(200).send(todos.list(name))
});

app.get("/users/:name/tasks?status=complete",
(req, res) => {
    const name = req.params.name;
    const tasks = todos.list(name);
    tasks = tasks.filter(task => task.complete);
    res.status(200).send(tasks);

});

app.post("/users/:name/tasks", (req, res) => {
    const name = req.params.name;
    const task = req.body;
    todos.add(name, task)
    res.status(201).send(task);
});


app.use(morgan("tiny"));
// el condicional es solo para evitar algun problema de tipo EADDRINUSE con mocha watch + supertest + npm test.
if (!module.parent) app.listen(3000, () => {
    
    console.log("server UP.")
});
