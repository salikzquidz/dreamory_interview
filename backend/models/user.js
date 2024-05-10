const mongoose = require("mongoose");
const validator = require("validator");
const { isEmail } = validator;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: true,
    minLength: [7, "Minimum password length is 7"],
  },
  role: {
    type: String,
    enum: ["admin", "customer"],
    default: "customer",
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
