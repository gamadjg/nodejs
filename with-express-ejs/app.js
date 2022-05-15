require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Tasks = require("./models/todo-schema");
// .env is ignored, contains port and dburi for mongodb.
const dburi = process.env.dbURI;
const port = process.env.PORT;

// Express app configurations.
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("views", "./views");
app.set("view engine", "ejs");

// Asynchronously connect to mongodb.
mongoose
	.connect(dburi)
	.then((result) => {
		// we are only listening for requests until after the conneciton to the db is established.
		app.listen(port);
	})
	.catch((err) => {
		console.log(err);
	});

// Middleware. console log method type and date for every request.
const myLogger = function (req, res, next) {
	console.log("Request Method: " + req.method);
	console.log("Request date: " + new Date());

	// NEED TO ADD next() to middleware that isn't returning any response.
	next();
};
// Calling the middleware
app.use(myLogger);

app.get("/", (req, res) => {
	// .render, sends specified views + partials to be displayed on the browers.
	res.render("index", { title: "Home" });
});

app.get("/about", (req, res) => {
	// SendFile method used for non-express routing.
	// res.sendFile("./views/about.html", { root: __dirname });
	res.render("about", { title: "About" });
});
// Redirect testing.
app.get("/about-me", (req, res) => {
	res.redirect("about");
});

app.get("/contact-me", (req, res) => {
	res.render("contact-me", { title: "Contact" });
});

/* Every time /tasks page is loaded, db is pinged to find/return its data. 
	This data is then passed into the rendering for the /tasks page to be parsed by ejs. 
*/
app.get("/tasks", (req, res) => {
	Tasks.find()
		.then((result) => {
			res.render("tasks", { title: "Tasks", todoList: result });
		})
		.catch((err) => {
			console.log(err);
		});
});

/* POST request, called from form action on /tasks.
	Each post request creates an object organized to fit the Tasks schema.
	The task is then pushed to the connected db, followed by a redirect to the tasks page.
	The redirect acts as a refresh for the /tasks page where the db results will be pulled again along with the new task.
*/
app.post("/tasks", (req, res) => {
	// Task created from schema.
	const task = new Tasks({
		title: req.body.description,
		due: req.body.dueDate,
		priority: req.body.priority,
	});
	// Push new task to db.
	task
		.save()
		.then((result) => {
			// Redirect (refresh) tasks page which will list the new db data.
			res.redirect("tasks");
			console.log("new task has been added to the db");
		})
		.catch((err) => {
			console.log(err);
		});
});

/* DELETE request, from /tasks page.  
	upon request, URI contains attribute witch is the passed id of the task to delete.
*/
app.delete("/tasks/:id", (req, res) => {
	const id = req.params.id;
	// mongoose method called to delete task in db, task specified by its id
	Tasks.findByIdAndDelete(id)
		.then(() => {
			// respond to requets with a json redirect to /tasks
			res.json({ redirect: "/tasks" });
		})
		.catch((error) => {
			console.log(error);
		});
});

// default 404 page
app.use((req, res) => {
	//res.sendFile("./views/404.html", { root: __dirname });
	res.render("404");
});
