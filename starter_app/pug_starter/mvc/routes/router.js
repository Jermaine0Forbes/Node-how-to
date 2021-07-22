var express = require('express');
var route = express.Router();
const home = require("../controllers/homeController");

route.get("/", home.index);
route.post("/store/user", home.storeUser);

module.exports = route;
