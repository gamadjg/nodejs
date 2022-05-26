const get_users = (req, res) => {
	res.render("users", { title: "Users" });
};

module.exports = get_users;
