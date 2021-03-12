const { Question } = require("../models");

const question_post = async (req, res) => {
  const { name, A, B, C, D, correctAnswer } = req.body;
  const { id } = req.params;

  try {
    const question = await Question.create({
      name,
      options: {
        A,
        B,
        C,
        D,
      },
      correctAnswer,
      exam: id,
    });
    res.json({ question });
  } catch (err) {
    res.json({ err });
  }
};

const question_edit = async (req, res) => {
  const { name, A, B, C, D, correctAnswer } = req.body;
  const { questionId, id } = req.params;
  console.log(questionId);

  try {
    const question = await Question.findByIdAndUpdate(questionId, {
      name,
      options: {
        A,
        B,
        C,
        D,
      },
      correctAnswer,
      exam: id,
    });
    res.json({ question });
  } catch (err) {
    res.json({ err });
  }
};

const question_delete = async (req, res) => {
  const { questionId } = req.params;
  try {
    const question = await Question.findByIdAndDelete(questionId);
    res.json({ question });
  } catch (err) {
    req.json({ err });
  }
};

module.exports = {
  question_post,
  question_edit,
  question_delete,
};
