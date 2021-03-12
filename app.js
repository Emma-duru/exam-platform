const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
require("dotenv").config;

const app = express();

// Import Modules
const {
  adminRoutes,
  authRoutes,
  examRoutes,
  studentRoutes,
} = require("./routes");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

// Middleware
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(cookieParser());

// Set up MongoDB connection
mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Home Route
app.use("*", checkUser);

app.use("/admin", adminRoutes);
app.use("/exam", examRoutes);
app.use("/student", studentRoutes);
app.use(authRoutes);

// Set server to listen at specified port
const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Server is running at port ${port}`);
});
