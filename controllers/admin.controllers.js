const { User } = require("../models");

// Admin Create Get
const admin_get = async (req, res) => {
  try {
    const admins = await User.find({ isAdmin: true })
      .select("-password -id")
      .populate("exams");
    res.render("admin/index", { title: "Admins", admins });
  } catch (err) {
    res.json({ err });
  }
};

// Admin Create Post
const admin_post = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    phone_number,
    address,
    password,
  } = req.body;
  try {
    const admin = await User.create({
      firstname,
      lastname,
      email,
      phone_number,
      address,
      password,
      isAdmin: true,
    });
    res.json({ admin });
  } catch (err) {
    res.json({ err });
  }
};

// Admin Detail
const admin_detail = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await User.findOne({ _id: id })
      .select("-password -id")
      .populate("exams");
    res.render("admin/detail", {
      title: `${admin.firstname} ${admin.lastname}`,
      admin,
    });
  } catch (err) {
    res.json({ err });
  }
};

// Edit an admin
const admin_edit = async (req, res) => {
  const { firstname, lastname, email, phone_number, address } = req.body;
  const { id } = req.params;
  try {
    const admin = await User.findByIdAndUpdate(id, {
      firstname,
      lastname,
      email,
      phone_number,
      address,
    });
    res.json({ admin });
  } catch (err) {
    res.json({ err });
  }
};

// Delete an admin
const admin_delete = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await User.findByIdAndDelete(id);
    res.json({ admin });
  } catch (err) {
    res.json({ err });
  }
};

// Search for an admin
const admin_search = async (req, res) => {
  try {
    const admins = await User.find({
      $or: [
        {
          firstname: {
            $regex: req.query.adminName,
            $options: "i",
          },
        },
        {
          lastname: {
            $regex: req.query.adminName,
            $options: "i",
          },
        },
      ],
    })
      .populate("exams")
      .select("-password");
    res.render("admin/index", { title: `"${req.query.adminName}"`, admins });
  } catch (err) {
    res.json({ err });
  }
};

module.exports = {
  admin_get,
  admin_post,
  admin_detail,
  admin_edit,
  admin_delete,
  admin_search,
};
