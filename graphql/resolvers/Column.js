const Task = require("../../models/task");

module.exports = {
  async tasks(parent, args, context, info) {
    return Task.find({ columnId: parent._id });
  },
};
