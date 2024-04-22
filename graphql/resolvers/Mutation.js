const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");
const Board = require("../../models/board");
const Column = require("../../models/column");
const Task = require("../../models/task");
const Subtask = require("../../models/subtask");

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
  async editBoard(parent, args, context, info) {
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
      const updateOperations = args.modifiedColumns.map(
        ({ id, ...fields }) => ({
          updateOne: {
            filter: { _id: id, boardId: board._id, userId: currentUser._id },
            update: {
              $set: Object.fromEntries(
                Object.entries(fields).filter(
                  ([_, value]) => value !== null || value !== undefined,
                ),
              ),
            },
          },
        }),
      );

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
  async createTask(parent, args, context, info) {
    const { currentUser } = context;
    if (!currentUser) {
      throw new Error("Unauthorized");
    }

    const column = await Column.findOne({
      _id: args.columnId,
      userId: currentUser._id,
    });
    if (!column) {
      throw new Error("Column not found");
    }

    const task = new Task({
      title: args.title,
      description: args.description,
      columnId: column._id,
      userId: currentUser._id,
    });

    await Subtask.insertMany(
      args.subtasks.map((title) => ({
        title,
        isCompleted: false,
        taskId: task._id,
        userId: currentUser._id,
      })),
    );

    return task.save();
  },
  async deleteTask(parent, args, context, info) {
    const { currentUser } = context;
    if (!currentUser) {
      throw new Error("Unauthorized");
    }

    const result = await Task.deleteOne({
      _id: args.id,
      userId: currentUser._id,
    });

    return result.deletedCount > 0;
  },
  async editTask(parent, args, context, info) {
    const { currentUser } = context;
    if (!currentUser) {
      throw new Error("Unauthorized");
    }

    const task = await Task.findOne({ _id: args.id, userId: currentUser._id });
    if (!task) {
      throw new Error("Task not found");
    }

    const column = await Column.findOne({
      _id: args.columnId,
      userId: currentUser._id,
    });
    if (!column) {
      throw new Error("Column not found");
    }

    if (args.columnId) task.columnId = args.columnId;

    if (args.title) task.title = args.title;

    if (args.description) task.description = args.description;

    if (args.deletedSubtaskIds) {
      await Subtask.deleteMany({
        _id: { $in: args.deletedSubtaskIds },
        taskId: task._id,
        userId: currentUser._id,
      });
    }

    if (args.modifiedSubtasks) {
      const updateOperations = args.modifiedSubtasks.map(
        ({ id, ...fields }) => ({
          updateOne: {
            filter: { _id: id, taskId: task._id, userId: currentUser._id },
            update: {
              $set: Object.fromEntries(
                Object.entries(fields).filter(
                  ([_, value]) => value !== null || value !== undefined,
                ),
              ),
            },
          },
        }),
      );

      await Subtask.bulkWrite(updateOperations);
    }

    if (args.newSubtasks) {
      await Subtask.insertMany(
        args.newSubtasks.map((title) => ({
          title,
          isCompleted: false,
          taskId: task._id,
          userId: currentUser._id,
        })),
      );
    }

    return task.save();
  },
};
