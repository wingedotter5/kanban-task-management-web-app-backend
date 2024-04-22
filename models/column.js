const mongoose = require("mongoose");

const Task = require("./task");

const columnSchema = new mongoose.Schema({
  name: String,
  boardId: {
    type: mongoose.Types.ObjectId,
    ref: "Board",
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

columnSchema.pre(
  "deleteMany",
  { document: false, query: true },
  async function (next) {
    try {
      const docs = await this.model.find(this.getFilter());
      const columnIds = docs.map((doc) => doc._id);
      await Task.deleteMany({ columnId: { $in: columnIds } });
    } catch (error) {
      next(error);
    }
  },
);

module.exports = mongoose.model("Column", columnSchema);
