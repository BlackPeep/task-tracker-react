const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const taskRoutes = require("./routes/tasks");
const authRoutes = require("./routes/auth");

const protectRoute = require("./middleware/protectRoute");

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "https://blackpeep.github.io"], // update as needed
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

//Routes
app.use("/api/taskLists", protectRoute, taskRoutes);
app.use("/api/auth", authRoutes);

//MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MONGODB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));
