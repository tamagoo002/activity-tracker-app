const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;
const subActivitySchema = new Schema(
  {
    name: { type: String, required: true },
    isCompleted: { type: Boolean, required: true, default: false },
    activity: { type: ObjectId, ref: "Activity", required: true },
  },
  {
    timestamps: true,
  }
);
module.exports = new model("subActivity", subActivitySchema);
