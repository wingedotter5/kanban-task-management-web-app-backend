const Column = require("../../models/column");

module.exports = {
  async columns(parent, args, context, info) {
    return Column.find({ boardId: parent._id });
  },
};
