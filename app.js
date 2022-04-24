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

app.get("/", (req, res) => {
    console.log("que onda ");
    res.status(200).send(todos.listPeople());

});

app.get("/api/users", (req, res) => {
    console.log(req.url)

    res.status(200).send(todos.listPeople());
    
});


app.use(morgan("tiny"));
// el condicional es solo para evitar algun problema de tipo EADDRINUSE con mocha watch + supertest + npm test.
if (!module.parent) app.listen(3000, () => console.log("server levantado."));
