const router = require("express").Router();
const { adminControllers } = require("../controllers");

// Admin create form
router
  .route("/")
  .get(adminControllers.admin_get)
  .post(adminControllers.admin_post);

router.route("/search").get(adminControllers.admin_search);

router
  .route("/:id")
  .get(adminControllers.admin_detail)
  .put(adminControllers.admin_edit)
  .delete(adminControllers.admin_delete);

module.exports = router;
