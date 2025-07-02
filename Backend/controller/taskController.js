const TaskList = require("../models/TaskList");

exports.showLists = async (req, res) => {
  //Get all taskList
  try {
    const lists = await TaskList.find({ userId: req.user.id });
    if (!lists) return res.status(404).json({ error: "List not found" });

    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

exports.addTaskList = async (req, res) => {
  // Add new tasklist
  try {
    const newList = new TaskList({ ...req.body, userId: req.user.id });
    const saved = await newList.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

exports.addTask = async (req, res) => {
  //Add new task to tasklist
  try {
    const list = await TaskList.findById(req.params.listId);
    if (!list) return res.status(404).json({ error: "List not found" });

    const newTask = req.body;
    list.tasks.push(newTask);
    await list.save();

    const addedTask = list.tasks[list.tasks.length - 1];
    res.status(201).json(addedTask);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

exports.updateTask = async (req, res) => {
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
};

exports.deleteTask = async (req, res) => {
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
};

exports.deleteList = async (req, res) => {
  //Deleting tasklist
  try {
    const list = await TaskList.findById(req.params.listId);
    if (!list) return res.status(404).json({ error: "List not found" });

    await list.deleteOne();
    res.status(200).json({ message: "Task List deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};
