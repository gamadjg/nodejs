const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messages-controller");

/* GET home page. */
router.get("/", (req, res) => {
	messageController.index_messages(req, res);
});

router.post("/new", (req, res) => {
	messageController.create_new_message(req, res);
});

module.exports = router;
