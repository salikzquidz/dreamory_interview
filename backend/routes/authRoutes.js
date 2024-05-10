const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

// json web token
const jwtTokenAge = 60 * 60 * 12; // seconds (12 hours)
const generateJwtToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: jwtTokenAge });
};

router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    // await User.create({ name, email, hashedPassword, role: "admin" });
    await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    res.status(201).send({ message: "User Created" });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
        const token = generateJwtToken(user._id);
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: jwtTokenAge * 1000,
        });
        res.json({
          userInfo: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        });
      } else {
        res.status(401).send({ message: "Invalid email or password" });
      }
    } else {
      res.status(401).send({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
});

router.post("/signout", (req, res) => {
  try {
    res.clearCookie("jwt");
    console.log("cookie jwt cleared");
    res.send({});
  } catch (error) {
    res.status(401).send(error);
  }
});

router.post("/checkisadmin", async (req, res) => {
  const token = req.cookies.jwt;

  if (token) {
    const payload = jwt.verify(req.cookies?.jwt, process.env.JWT_SECRET);
    let user = await User.findById(payload.id);
    if (user.role === "admin") {
      console.log("admin");
      res.status(200).send({ message: "Authorized" });
    } else {
      res.status(401).send({ message: "Not authorized access" });
    }
  } else {
    res.status(401).send({ message: "Not authorized access" });
  }
});

module.exports = router;
