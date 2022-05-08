const express = require("express");

const app = express();

app.listen(8080);

app.get("/", (req, res) => {
	res.sendFile("./views/index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
	res.sendFile("./views/about.html", { root: __dirname });
});

app.get("/about-me", (req, res) => {
	res.redirect("/about.html");
});

app.get("/contact-me", (req, res) => {
	res.sendFile("./views/contact-me.html", { root: __dirname });
});

app.use((req, res) => {
	res.sendFile("./views/404.html", { root: __dirname });
});
