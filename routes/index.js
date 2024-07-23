
const router = require("express").Router();
const activityRouter = require("../modules/activity/activity.route");
const subActivityRouter = require("../modules/subActivity/subActivity.route")
router.use("/api/v1/activities",activityRouter);
router.use("/api/v1/sub-activities",subActivityRouter);

module.exports = router;
