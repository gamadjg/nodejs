let messages = [
	{
		text: "Hi there!",
		user: "David",
		added: new Date().toLocaleDateString("en-us", {
			month: "numeric",
			day: "numeric",
			year: "numeric",
		}),
	},
	{
		text: "Hello, world!",
		user: "Aaron",
		added: new Date().toLocaleDateString("en-us", {
			month: "numeric",
			day: "numeric",
			year: "numeric",
		}),
	},
];

const index_messages = (req, res) => {
	res.render("index", { title: "Mini Message Board", messages: messages });
};

const create_new_message = (req, res) => {
	messages.push({
		text: req.body.messageText,
		user: req.body.userDisplayName,
		added: new Date().toLocaleDateString("en-us", {
			month: "numeric",
			day: "numeric",
			year: "numeric",
		}),
	});

	res.redirect("/");
};

module.exports = {
	index_messages,
	create_new_message,
};
