const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const examSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Please enter the exam name",
    },
    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

examSchema.virtual("date_created").get(function () {
  return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATE_MED);
});

// Get all questions created
examSchema.virtual("questions", {
  ref: "Question",
  localField: "_id",
  foreignField: "exam",
});

examSchema.set("toObject", { virtuals: true });
examSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Exam", examSchema);
