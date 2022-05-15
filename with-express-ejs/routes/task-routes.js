const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/task-controller");

router.get("/", (req, res) => {
	tasksController.tasks_index(req, res);
});

// POST request, called from form action on /tasks.
router.post("/", (req, res) => {
	tasksController.tasks_create_post(req, res);
});

// DELETE request, from /tasks page.
router.delete("/:id", (req, res) => {
	tasksController.tasks_delete(req, res);
});

module.exports = router;
