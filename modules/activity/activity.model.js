const { Schema, model, Types } = require("mongoose");
const { ObjectId } = Types;

const activitySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    isCompleted: { type: Boolean, required: true, default: false },
    subactivities: { type: ObjectId, ref: "subActivity" },
  },
  {
    timestamps: true,
  }
);
module.exports = new model("Activity", activitySchema);
