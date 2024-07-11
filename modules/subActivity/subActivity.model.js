const { Schema, model } = require("mongoose");

const subActivitySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    isCompleted: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);
module.exports = new model("subActivity", subActivitySchema);
