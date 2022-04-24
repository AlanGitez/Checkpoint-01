var express = require('express');
var router = express.Router();
const todos = require("../models/todos.js");


router.get("/", (req, res) => {
    console.log(req.url)
    res.status(200).send(res.body);
    
});


module.exports = router;