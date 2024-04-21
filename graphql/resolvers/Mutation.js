const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");
const Board = require("../../models/board");
const Column = require("../../models/column");

module.exports = {
  async signup(parent, args, context, info) {
    const password = await bcrypt.hash(args.password, 10);

    const user = new User({
      username: args.username,
      password,
    });
    await user.save();

    const token = jwt.sign(
      {
        userId: user._id.toString(),
      },
      "SECRET",
    );

    return {
      token,
      user,
    };
  },
  async login(parent, args, context, info) {
    const user = await User.findOne({
      username: args.username,
    });
    if (!user) {
      throw new Error("No such user found");
    }

    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ userId: user._id.toString() }, "SECRET");

    return {
      token,
      user,
    };
  },
  async createBoard(parent, args, context, info) {
    const { currentUser } = context;
    if (!currentUser) {
      throw new Error("Unauthorized");
    }

    const board = new Board({
      name: args.name,
      userId: currentUser._id,
    });

    await Column.insertMany(
      args.columns.map((name) => ({
        name,
        boardId: board._id,
        userId: currentUser._id,
      })),
    );

    return await board.save();
  },
  async deleteBoard(parent, args, context, info) {
    const { currentUser } = context;
    if (!currentUser) {
      throw new Error("Unauthorized");
    }

    const result = await Board.deleteOne({
      _id: args.id,
      userId: currentUser._id,
    });

    return result.deletedCount > 0;
  },
  async updateBoard(parent, args, context, info) {
    const { currentUser } = context;
    if (!currentUser) {
      throw new Error("Unauthorized");
    }

    const board = await Board.findOne({
      _id: args.id,
      userId: currentUser._id,
    });
    if (!board) {
      throw new Error("Board not found");
    }

    if (args.name) board.name = args.name;

    if (args.deletedColumnIds) {
      await Column.deleteMany({
        _id: { $in: args.deletedColumnIds },
        boardId: board._id,
        userId: currentUser._id,
      });
    }

    if (args.modifiedColumns) {
      const updateOperations = args.modifiedColumns.map(({ id, name }) => ({
        updateOne: {
          filter: { _id: id, boardId: board._id, userId: currentUser._id },
          update: { $set: { name } },
        },
      }));

      await Column.bulkWrite(updateOperations);
    }

    if (args.newColumns) {
      await Column.insertMany(
        args.newColumns.map((name) => ({
          name,
          boardId: board._id,
          userId: currentUser._id,
        })),
      );
    }

    return await board.save();
  },
};
