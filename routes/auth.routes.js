const router = require("express").Router();
const { authControllers } = require("../controllers");

router.route("/").get(authControllers.home_get);

router
  .route("/register")
  .get(authControllers.register_get)
  .post(authControllers.register_post);

router
  .route("/login")
  .get(authControllers.login_get)
  .post(authControllers.login_post);

router.route("/logout").get(authControllers.logout);

module.exports = router;
