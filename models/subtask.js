const mongoose = require("mongoose");

const subtaskSchema = new mongoose.Schema({
  title: String,
  isCompleted: Boolean,
  taskId: {
    type: mongoose.Types.ObjectId,
    ref: "Task",
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Subtask", subtaskSchema);
