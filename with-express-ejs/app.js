const express = require("express");
const app = express();
const port = 8080;
app.use(express.static("public"));
app.set("views", "./views");
app.set("view engine", "ejs");
app.listen(port);

// mongodb connection
const dburi =
	"mongodb+srv://<username>:<password>@cluster0.azc2l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.get("/", (req, res) => {
	const todoList = [
		// { priority: 1, due: "today", task: "Pet dog" },
		// { priority: 2, due: "today", task: "Submit taxes" },
		// { priority: 2, due: "today", task: "Complete ejs tutorial" },
	];
	//res.sendFile("index", { root: __dirname });
	res.render("index", { title: "Home", todoList });
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

app.use((req, res) => {
	//res.sendFile("./views/404.html", { root: __dirname });
	res.render("404");
});
