const router = require("express").Router();
const Controller = require("./activity.controller");
router.get("/", async (req, res, next) => {
  try {
    const data = await Controller.list();
    res.json({ data, msg: "list of all activities" });
  } catch (e) {
    next(e);
  }
});
router.get("/get-all", async (req, res, next) => {
  try {
    const data = await Controller.getAll(req.query);
    res.json({ data, msg: "list of all activities" });
  } catch (e) {
    next(e);
  }
});
router.get("/:id", async (req, res, next) => {
  const data = await Controller.getById(req.params.id);
  res.json({ data, msg: "getting one id" });
});
router.post("/", async (req, res, next) => {
  const data = await Controller.create(req.body);
  res.json({ data, msg: "added neew activity" });
});

router.patch("/:id", async (req, res, next) => {
  try {
    const data = await Controller.updateById(req.params.id, req.body);
    res.json({ data, msg: "Updating data" });
  } catch (e) {
    next(e);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const data = await Controller.removeById(req.params.id);
    res.json({ data, msg: "deleted activity" });
  } catch (e) {
    next(e);
  }
});
module.exports = router;
