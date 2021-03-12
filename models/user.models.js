const mongoose = require("mongoose");
const { isEmail } = require("validator");
const { DateTime } = require("luxon");
const bcrypt = require("bcrypt");
const mongoose_fuzzy_searching = require("mongoose-fuzzy-searching");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: "Please enter a Firstname",
    },
    lastname: {
      type: String,
      required: "Please enter a Lastname",
    },
    email: {
      type: String,
      required: "Please enter an Email",
      validate: [isEmail, "Please enter a valid Email Address"],
      unique: true,
    },
    phone_number: {
      type: String,
      required: "Please enter a Phone Number",
    },
    address: {
      type: String,
    },
    password: {
      type: String,
      required: "Please enter a Password",
    },
    isAdmin: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

// Function to search
userSchema.plugin(mongoose_fuzzy_searching, {
  fields: ["firstname", "lastname"],
});

// Create full name virtual
userSchema.virtual("full_name").get(function () {
  return `${this.firstname} ${this.lastname}`;
});

// Create date_joined virtual
userSchema.virtual("date_joined").get(function () {
  return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATE_MED);
});

// Hash the password
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

// Login function
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw new Error("Incorrect password");
  }
  throw new Error("Incorrect email");
};

// Get all exams created
userSchema.virtual("exams", {
  ref: "Exam",
  localField: "_id",
  foreignField: "author",
});

userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("User", userSchema);
