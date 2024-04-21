const mongoose = require("mongoose");

const Column = require("./column");

const boardSchema = new mongoose.Schema({
  name: String,
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

boardSchema.pre("deleteOne", async function (next) {
  try {
    await Column.deleteMany({ boardId: this._conditions._id });
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Board", boardSchema);
