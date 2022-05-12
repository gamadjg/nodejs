const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Tasks = require("./models/todo-schema");
require("dotenv").config();

const dburi = process.env.dbURI;
const port = process.env.PORT;

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

app.get("/add-task", (req, res) => {
	console.log("New task has been submitted.");
	const task = new Tasks({
		title: "new task",
		due: "05/12/22",
		priority: "1",
	});

	task
		.save()
		.then((result) => {
			// .send used to send a body of text (can also be html text) to be displayed on the browser, does NOT SUPPORT views
			res.send(result);
			console.log("new task has been added to the db");
		})
		.catch((err) => {
			console.log(err);
		});
});

app.get("/all-tasks", (req, res) => {
	Tasks.find()
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			console.log(err);
		});
});

app.get("/", (req, res) => {
	// .render, sends specified views + partials to be displayed on the browers
	res.render("index", { title: "Home" });
	console.log("req made to enter home page.");
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

app.use((req, res) => {
	//res.sendFile("./views/404.html", { root: __dirname });
	res.render("404");
});
