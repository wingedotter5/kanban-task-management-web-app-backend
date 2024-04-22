const mongoose = require("mongoose");

const Subtask = require("./subtask");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  subtasks: {
    type: mongoose.Types.ObjectId,
    ref: "Subtask",
  },
  columnId: {
    type: mongoose.Types.ObjectId,
    ref: "Column",
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

taskSchema.pre(
  "deleteOne",
  { document: false, query: true },
  async function (next) {
    try {
      const doc = await this.model.findOne(this.getFilter());
      await Subtask.deleteMany({ taskId: doc._id });
    } catch (error) {
      next(error);
    }
  },
);

taskSchema.pre(
  "deleteMany",
  { document: false, query: true },
  async function (next) {
    try {
      const docs = await this.model.find(this.getFilter());
      const taskIds = docs.map((doc) => doc._id);
      await Subtask.deleteMany({ taskId: { $in: taskIds } });
    } catch (error) {
      next(error);
    }
  },
);

module.exports = mongoose.model("Task", taskSchema);
