const Tasks = require("../models/todo-schema");

/* Every time /tasks page is loaded, db is pinged to find/return its data. 
	This data is then passed into the rendering for the /tasks page to be parsed by ejs. 
*/
const tasks_index = (req, res) => {
	Tasks.find()
		.then((result) => {
			res.render("tasks", { title: "Tasks", todoList: result });
		})
		.catch((err) => {
			console.log(err);
		});
};

/* 
	Each post request creates an object organized to fit the Tasks schema.
	The task is then pushed to the connected db, followed by a redirect to the tasks page.
	The redirect acts as a refresh for the /tasks page where the db results will be pulled again along with the new task.
*/
const tasks_create_post = (req, res) => {
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
};

// upon request, URI contains attribute witch is the passed id of the task to delete.
const tasks_delete = (req, res) => {
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
};

module.exports = {
	tasks_index,
	tasks_create_post,
	tasks_delete,
};
