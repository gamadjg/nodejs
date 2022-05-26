const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const messageRoutes = require("./routes/message-routes");
const userRoutes = require("./routes/user-routes");
const app = express();
const port = 8080;

// view engine setup
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

app.use("/", messageRoutes);
// app.use("/users", usersRouter);

app.listen(port);

app.get("/new", (req, res) => {
	res.render("form", { title: "Create Message Form" });
});

app.use("/users", userRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
