const express = require("express");
const router = express.Router();
const taskController = require("../controller/taskController");

router.get("/", taskController.showLists);

router.post("/", taskController.addTaskList);

router.post("/:listId/tasks", taskController.addTask);

router.put("/:listId/tasks/:taskId", taskController.updateTask);

router.delete("/:listId/tasks/:taskId", taskController.deleteTask);

router.delete("/:listId", taskController.deleteList);

module.exports = router;
