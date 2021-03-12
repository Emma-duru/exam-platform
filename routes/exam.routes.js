const router = require("express").Router({ mergeParams: true });
const { examControllers } = require("../controllers");
const questionRoutes = require("./question.routes");

router
  .route("/")
  .get(examControllers.exam_get)
  .post(examControllers.exam_create);

router.route("/search").get(examControllers.exam_search);

router.use("/:id/question", questionRoutes);

router
  .route("/:id")
  .get(examControllers.exam_detail)
  .put(examControllers.exam_edit)
  .delete(examControllers.exam_delete);

module.exports = router;
