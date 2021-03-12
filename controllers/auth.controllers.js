require("dotenv").config();
const { User, Exam, Question } = require("../models");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

const home_get = async (req, res) => {
  if (res.locals.user) {
    const admins = await User.find({ isAdmin: true }).select("-password");
    const students = await User.find({ isAdmin: false }).select("-password");
    const exams = await Exam.find();
    const questions = await Question.find();
    res.render("admin/home", {
      title: "Home",
      admins,
      exams,
      questions,
      students,
    });
  } else {
    res.render("home", { title: "Home" });
  }
};

const register_get = async (req, res) => {
  res.render("auth/register", { title: "Register" });
};

const register_post = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    phone_number,
    address,
    password,
  } = req.body;
  try {
    const student = await User.create({
      firstname,
      lastname,
      email,
      phone_number,
      address,
      password,
      isAdmin: false,
    });
    const token = createToken(student._id);
    res.cookie("exam_auth", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.json({ student });
  } catch (err) {
    res.json({ err });
  }
};

const login_get = (req, res) => {
  res.render("auth/login", { title: "Login" });
};

const login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("exam_auth", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.json({ user });
  } catch (err) {
    res.json({ err });
  }
};

const logout = async (req, res) => {
  res.cookie("exam_auth", "", {
    maxAge: 1,
  });
  res.redirect("/");
};

module.exports = {
  login_get,
  login_post,
  logout,
  home_get,
  register_get,
  register_post,
};
