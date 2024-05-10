const express = require("express");
const requireAuth = require("../middlewares/requireAuth");
const Event = require("../models/event");
const uploadEventImages = require("../middlewares/uploadEventImages");
const router = express.Router();
const fs = require("fs");

// Get all events
router.get("/", async (req, res) => {
  const filterStatus = req.query.filterstatus;

  const page = parseInt(req.query.page) || null;
  const limit = parseInt(req.query.limit) || null;
  const skip = (page - 1) * limit;

  try {
    let events;
    if (filterStatus) {
      events = await Event.find({ status: filterStatus })
        .skip(skip)
        .limit(limit);
    } else {
      events = await Event.find({}).skip(skip).limit(limit);
    }
    res.status(200).send(events);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Create an event
router.post(
  "/",
  requireAuth,
  uploadEventImages.single("image"),
  async (req, res) => {
    console.log(req.body.tags);
    const {
      name,
      startDate,
      endDate,
      status,
      location,
      organizer,
      numberOfParticipants,
      tags,
      fee,
      description,
    } = req.body;
    try {
      await Event.create({
        name,
        startDate,
        endDate,
        status,
        location,
        organizer,
        image: req.file.path,
        numberOfParticipants,
        tags: tags.split(",").forEach((x) => x.toLowerCase()),
        fee,
        description,
      });
      res.status(201).send({ message: "Event created" });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
);

// Update an event
router.put(
  "/:id",
  requireAuth,
  uploadEventImages.single("image"),
  async (req, res) => {
    console.log(req.body.tags);
    const { id } = req.params;
    const {
      name,
      startDate,
      endDate,
      status,
      location,
      organizer,
      numberOfParticipants,
      tags,
      fee,
      description,
    } = req.body;
    try {
      await Event.findByIdAndUpdate(id, {
        name,
        startDate,
        endDate,
        status,
        location,
        organizer,
        numberOfParticipants,
        tags,
        fee,
        description,
        image: req.file?.path,
      });
      res.status(200).send({ message: "Event updated" });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
);

// Delete an event
router.delete("/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const document = await Event.findById(id);
    fs.unlink(document.image, (err) => {
      if (err && err.code !== "ENOENT") {
        // Handle error
        console.error("Error deleting file:", err);
      }
      console.log("Delete File successfully.");
    });
    await Event.findByIdAndDelete(id);
    res.status(200).send("Deleted an event");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
