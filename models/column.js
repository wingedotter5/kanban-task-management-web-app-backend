const mongoose = require("mongoose");

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

module.exports = mongoose.model("Column", columnSchema);
