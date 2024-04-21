const Board = require("../../models/board");

module.exports = {
  async boards(parent, args, context, info) {
    const { currentUser } = context;
    if (!currentUser) {
      throw new Error("Unauthorized");
    }

    return Board.find({ userId: currentUser._id });
  },
  async board(parent, args, context, info) {
    const { currentUser } = context;
    if (!currentUser) {
      throw new Error("Unauthorized");
    }

    return Board.findOne({ _id: args.id, userId: currentUser._id });
  },
};
