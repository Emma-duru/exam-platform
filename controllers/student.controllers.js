const { User } = require("../models");

const student_get = async (req, res) => {
  try {
    const students = await User.find({ isAdmin: false });
    res.render("student/home", { title: "Students", students });
  } catch (err) {
    res.json({ err });
  }
};

module.exports = {
  student_get,
};
