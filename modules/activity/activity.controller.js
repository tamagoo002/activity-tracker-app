const Model = require("./activity.model");
const SubActivityModel = require("../subActivity/subActivity.model");
const mongoose = require("mongoose");
const create = async (payload) => {
  return await Model.create(payload);
};

const list = async () => {
  return await Model.find();
};

const getAll = async (payload) => {
  const { status } = payload;
  const query = [];
  if (status) {
    query.push({
      $match: {
        isCompleted:
          status === "pending" ? false : status === "completed" ? true : null,
      },
    });
  }
  query.push({
    $lookup: {
      from: "subactivities",
      localField: "_id",
      foreignField: "activity",
      as: "subactivities",
    },
  });

  return await Model.aggregate(query);
};
const getById = async (id) => {
  return await Model.findOne({ _id: id });
};

// const updateById = async (id, payload) => {
//   return await Model.findOneAndUpdate({ _id: id }, payload, { new: true });
// };

// Update activity by ID
const updateById = async (id, payload) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID format");
    }

    // Fetch the activity and its subactivities
    const activity = await Model.findById(id).populate("subactivities");

    if (!activity) {
      throw new Error("Activity not found");
    }

    // If marking activity as completed, mark all subactivities as completed
    if (payload.isCompleted) {
      await SubActivityModel.updateMany(
        { activity: id },
        { isCompleted: true }
      );
    } else {
      // Ensure the activity is not marked as completed if any subactivity is incomplete
      if (activity.subactivities && activity.subactivities.length > 0) {
        const incompleteSubactivities = activity.subactivities.filter(
          (sub) => !sub.isCompleted
        );
        if (incompleteSubactivities.length > 0) {
          throw new Error(
            "Cannot mark activity as completed. Some subactivities are not completed."
          );
        }
      }
    }

    // Update the activity
    return await Model.findOneAndUpdate({ _id: id }, payload, { new: true });
  } catch (error) {
    throw new Error(`Error updating activity by ID: ${error.message}`);
  }
};

const removeById = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID format");
    }
    // Remove associated subactivities first
    await SubActivityModel.deleteMany({ activity: id });
    return await Model.deleteOne({ _id: id });
  } catch (error) {
    throw new Error(`Error removing activity by ID: ${error.message}`);
  }
};
module.exports = { getAll, create, list, getById, updateById, removeById };
