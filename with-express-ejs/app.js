const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Tasks = require("./models/todo-schema");
require("dotenv").config();

const dburi = process.env.dbURI;
const port = process.env.PORT;
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("views", "./views");
app.set("view engine", "ejs");

// Asynchronously connect to mongodb
mongoose
	.connect(dburi)
	.then((result) => {
		// We are only listening for requests until after the conneciton to the db is established.
		app.listen(port);
	})
	.catch((err) => {
		console.log(err);
	});

// Middleware function that is intended to run every time a request is made
const myLogger = function (req, res, next) {
	console.log("Request Method: " + req.method);
	console.log("Request date: " + new Date());

	// NEED TO ADD next() to middleware that isn't returning any response.
	next();
};
// Calling the middleware
app.use(myLogger);

app.get("/", (req, res) => {
	// .render, sends specified views + partials to be displayed on the browers
	res.render("index", { title: "Home" });
});

app.get("/about", (req, res) => {
	//res.sendFile("./views/about.html", { root: __dirname });
	res.render("about", { title: "About" });
});

app.get("/about-me", (req, res) => {
	//res.redirect("/about.html");
	res.redirect("about");
});

app.get("/contact-me", (req, res) => {
	//res.sendFile("./views/contact-me.html", { root: __dirname });
	res.render("contact-me", { title: "Contact" });
});

app.get("/create-task", (req, res) => {
	res.render("create-task", { title: "Create Task" });
});

app.get("/tasks", (req, res) => {
	Tasks.find()
		.then((result) => {
			res.render("tasks", { title: "Tasks", todoList: result });
		})
		.catch((err) => {
			console.log(err);
		});
});

app.post("/tasks", (req, res) => {
	const task = new Tasks({
		title: req.body.description,
		due: req.body.dueDate,
		priority: req.body.priority,
	});
	task
		.save()
		.then((result) => {
			res.redirect("tasks");
			console.log("new task has been added to the db");
		})
		.catch((err) => {
			console.log(err);
		});
});

app.delete("/tasks/:id", (req, res) => {
	const id = req.params.id;

	Tasks.findByIdAndDelete(id)
		.then(() => {
			res.json({ redirect: "/tasks" });
		})
		.catch((error) => {
			console.log(error);
		});
});

app.use((req, res) => {
	//res.sendFile("./views/404.html", { root: __dirname });
	res.render("404");
});
