'use strict';

var express = require('express');
var router = express.Router();
const users = require("./users.js");

router.use("/users", users);

module.exports = router;

// escriban sus rutas acá
// siéntanse libres de dividir entre archivos si lo necesitan
