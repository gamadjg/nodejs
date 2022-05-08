const http = require("http");
const fs = require("fs");
const hostname = "127.0.0.1";

//const dotenv = require("dotenv");
//dotenv.config();
//const port = process.env.PORT;

const server = http.createServer((req, res) => {
	res.setHeader("Content-Type", "text/html");

	let path = "./views/";
	switch (req.url) {
		case "/":
			path += "index.html";
			res.statusCode = 200;
			break;
		case "/about":
			path += "about.html";
			res.statusCode = 200;
			break;
		case "/about-me":
			res.statusCode = 301;
			res.setHeader("Location", "/about");
			res.end();
			break;
		case "/contact-me":
			path += "contact-me.html";
			res.statusCode = 200;
			break;
		default:
			path += "404.html";
			res.statusCode = 404;
			break;
	}

	fs.readFile(path, (err, data) => {
		if (err) {
			console.log(err);
			res.end();
		}
		res.write(data);
		res.end();
	});
});

server.listen(8080, "localhost", () => {
	console.log("server running on port 8080");
});
