var express = require("express");
var router = express.Router();

// const messages = [
// 	{
// 		text: "Hi there!",
// 		user: "David",
// 		added: new Date().toLocaleDateString("en-us", {
// 			month: "numeric",
// 			day: "numeric",
// 			year: "numeric",
// 		}),
// 	},
// 	{
// 		text: "Hello, world!",
// 		user: "Aaron",
// 		added: new Date().toLocaleDateString("en-us", {
// 			month: "numeric",
// 			day: "numeric",
// 			year: "numeric",
// 		}),
// 	},
// ];

/* GET home page. */
router.get("/", (req, res) => {
	res.render("index", { title: "Mini Message Board", messages: messages });
});

router.get("/new", (req, res) => {
	res.render();
});

module.exports = router;
