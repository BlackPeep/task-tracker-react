const TaskList = require("../models/TaskList");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  //Get all taskList
  try {
    const lists = await TaskList.find();
    if (!lists) return res.status(404).json({ error: "List not found" });

    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

router.post("/", async (req, res) => {
  // Add new tasklist
  try {
    const newList = new TaskList(req.body);
    const saved = await newList.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

router.post("/:listId/tasks", async (req, res) => {
  //Add new task to tasklist
  try {
    const list = await TaskList.findById(req.params.listId);
    if (!list) return res.status(404).json({ error: "List not found" });

    list.tasks.push(req.body);
    await list.save();
    res.status(201).json(list);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

router.put("/:listId/tasks/:taskId", async (req, res) => {
  //updating a task inside a tasklist
  try {
    const list = await TaskList.findById(req.params.listId);
    if (!list) return res.status(404).json({ error: "List not found" });

    const task = list.tasks.id(req.params.taskId);
    if (!task) return res.status(404).json({ error: "List not found" });

    if (req.body.completed !== undefined) task.completed = req.body.completed;

    await list.save();

    res.status(200).json({ message: "Task updated", updatedTask: task });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

router.delete("/:listId/tasks/:taskId", async (req, res) => {
  //Deleting task inside a tasklist
  try {
    const list = await TaskList.findById(req.params.listId);
    if (!list) return res.status(404).json({ error: "List not found" });

    const task = list.tasks.id(req.params.taskId);
    if (!task) return res.status(404).json({ error: "Task not found" });

    list.tasks.pull(task.id);
    await list.save();

    res.status(200).json({ message: "Task  deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

router.delete("/:listId", async (req, res) => {
  //Deleting tasklist
  try {
    const list = await TaskList.findById(req.params.listId);
    if (!list) return res.status(404).json({ error: "List not found" });

    await list.deleteOne();
    res.status(200).json({ message: "Task List deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = router;
