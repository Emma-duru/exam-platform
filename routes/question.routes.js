const router = require("express").Router({ mergeParams: true });
const { questionControllers } = require("../controllers");

router.route("/").post(questionControllers.question_post);

router
  .route("/:questionId")
  .put(questionControllers.question_edit)
  .delete(questionControllers.question_delete);

module.exports = router;
