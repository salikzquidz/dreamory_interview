const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("../routes/authRoutes");
const eventRoutes = require("../routes/eventRoutes");
require("dotenv").config();

module.exports = function (app) {
  // To parse JSON payloads
  app.use(express.json());
  app.use(cookieParser());
  // CORS middleware
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  // Configure response header
  app.use(function (req, res, next) {
    res.header("Content-Type", "application/json;charset=UTF-8");
    // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  // Set the routes with appropriate prefix
  app.use("/auth", authRoutes); // For authenticate admin
  app.use("/event", eventRoutes); // For event endpoints // CRUD
  app.use("/images/events/", express.static("images/events"));
  return app;
};
