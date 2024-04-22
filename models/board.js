const mongoose = require("mongoose");

const Column = require("./column");

const boardSchema = new mongoose.Schema({
  name: String,
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

boardSchema.pre(
  "deleteOne",
  { document: false, query: true },
  async function (next) {
    try {
      const doc = await this.model.findOne(this.getFilter());
      await Column.deleteMany({ boardId: doc._id });
    } catch (error) {
      next(error);
    }
  },
);

module.exports = mongoose.model("Board", boardSchema);
