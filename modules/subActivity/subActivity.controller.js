const Model = require("./subActivity.model");
const activityModel = require("../activity/activity.model");
const create = async (payload) => {
  const { activity } = payload;
  const activityData = await activityModel.findOne({ _id: activity });
  if (!activityData) throw new Error("Activity not found!");
  return await Model.create(payload);
};
const list = async () => {
  return await Model.find();
};
const getById = async (id) => {
  return await Model.findOne({ _id: id });
};

const updateById = async (id, payload) => {
  try {
    // Update the subactivity
    const subactivity = await Model.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });

    if (!subactivity) {
      throw new Error("Subactivity not found");
    }

    // Get the parent activity
    const activityId = subactivity.activity;
    const subactivities = await Model.find({ activity: activityId });

    // Check the completion status of all subactivities
    const allCompleted = subactivities.every((sub) => sub.isCompleted);
    const activityStatus = allCompleted;

    // Update the parent activity's completion status
    await activityModel.findOneAndUpdate(
      { _id: activityId },
      { isCompleted: activityStatus }
    );

    return subactivity;
  } catch (error) {
    throw new Error(`Error updating subactivity by ID: ${error.message}`);
  }
};
const removeById = async (id) => {
  return await Model.deleteOne({ _id: id });
};
module.exports = { create, list, getById, updateById, removeById };
