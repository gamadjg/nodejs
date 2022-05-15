require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const taskRoutes = require("./routes/task-routes");
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

//
app.use("/tasks", taskRoutes);

// default 404 page
app.use((req, res) => {
	//res.sendFile("./views/404.html", { root: __dirname });
	res.render("404");
});
