const router = require("express").Router();
const { studentControllers } = require("../controllers");

router.route("/").get(studentControllers.student_get);

module.exports = router;
