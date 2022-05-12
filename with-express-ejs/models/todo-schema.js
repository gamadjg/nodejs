const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		due: {
			type: Date,
			required: false,
		},
		priority: {
			type: Number,
			required: false,
		},
	},
	{ timestampes: true }
);

const TaskModel = mongoose.model("task-collections", taskSchema);

module.exports = TaskModel;
