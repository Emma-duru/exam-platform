const { Exam } = require("../models");

const exam_get = async (req, res) => {
  try {
    const exams = await Exam.find()
      .populate("questions")
      .populate("author")
      .select("-password");
    const draftExams = exams.filter((exam) => exam.status == "Draft");
    const publishedExams = exams.filter((exam) => exam.status == "Published");
    res.render("exam/home", {
      title: "Exams",
      exams,
      publishedExams,
      draftExams,
    });
  } catch (err) {
    res.json({ err });
  }
};

const exam_create = async (req, res) => {
  const { name, status } = req.body;
  const { _id } = res.locals.user;

  try {
    const exam = await Exam.create({ name, status, author: _id });
    res.json({ exam });
  } catch (err) {
    res.json({ err });
  }
};

const exam_detail = async (req, res) => {
  const { id } = req.params;
  try {
    const exam = await Exam.findById(id)
      .populate("author")
      .populate("questions");
    res.render("exam/detail", { title: exam.name, exam });
  } catch (err) {
    res.json({ err });
  }
};

const exam_edit = async (req, res) => {
  const { id } = req.params;
  const { name, status } = req.body;
  try {
    const exam = await Exam.findByIdAndUpdate(id, { name, status });
    res.json({ exam });
  } catch (err) {
    res.json({ err });
  }
};

const exam_delete = async (req, res) => {
  const { id } = req.params;

  try {
    const exam = await Exam.findByIdAndDelete(id);
    res.json({ exam });
  } catch (err) {
    res.json({ err });
  }
};

const exam_search = async (req, res) => {
  try {
    const exams = await Exam.find({
      name: {
        $regex: req.query.examName,
        $options: "i",
      },
    })
      .populate("author")
      .populate("questions")
      .select("-password");
    const draftExams = exams.filter((exam) => exam.status == "Draft");
    const publishedExams = exams.filter((exam) => exam.status == "Published");
    res.render("exam/home", {
      title: `"${req.query.examName}"`,
      exams,
      publishedExams,
      draftExams,
    });
  } catch (err) {
    res.json({ err });
  }
};

module.exports = {
  exam_get,
  exam_create,
  exam_detail,
  exam_edit,
  exam_delete,
  exam_search,
};
