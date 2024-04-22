const Subtask = require("../../models/subtask");

module.exports = {
  async subtasks(parent, args, context, info) {
    return Subtask.find({ taskId: parent._id });
  },
};
