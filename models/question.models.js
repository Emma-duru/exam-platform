const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const questionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Please enter a question name",
    },
    options: {
      A: {
        type: String,
        required: "Please enter the Option A",
      },
      B: {
        type: String,
        required: "Please enter the Option B",
      },
      C: {
        type: String,
        required: "Please enter the Option C",
      },
      D: {
        type: String,
        required: "Please enter the Option D",
      },
    },
    correctAnswer: {
      type: String,
      enum: ["A", "B", "C", "D"],
    },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
    },
  },
  {
    timestamps: true,
  }
);

questionSchema.virtual("date_created").get(function () {
  return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATE_MED);
});

questionSchema.set("toObject", { virtuals: true });
questionSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Question", questionSchema);
