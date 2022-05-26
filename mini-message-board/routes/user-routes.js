const express = require("express");
const users = express.Router();
const userController = require("../controllers/user-controller");

/* GET users listing. */
users.get("/users", (req, res) => {
	userController.get_users(req, res);
});

module.exports = users;
