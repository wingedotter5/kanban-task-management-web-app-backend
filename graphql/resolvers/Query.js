const Board = require("../../models/board");

module.exports = {
  async getBoards(parent, args, context, info) {
    const { currentUser } = context;
    if (!currentUser) {
      throw new Error("Unauthorized");
    }

    return Board.find({ userId: currentUser._id });
  },
  async getBoard(parent, args, context, info) {
    const { currentUser } = context;
    if (!currentUser) {
      throw new Error("Unauthorized");
    }

    return Board.findOne({ _id: args.id, userId: currentUser._id });
  },
};
