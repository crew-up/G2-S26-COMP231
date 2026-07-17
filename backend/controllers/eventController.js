const Event = require("../models/Events");
const asyncHandler = require("../utils/asynchHandler");

const createEvent = asyncHandler(async (req, res) => {
  const { title, location, startTime, endTime, description } = req.body;

  if (!title || !location || !startTime) {
    return res.status(400).json({ error: "title, location, and startTime are required." });
  }
  const start = new Date(startTime);
  if (Number.isNaN(start.getTime())) {
    return res.status(400).json({ error: "startTime must be a valid date/time." });
  }
  if (start.getTime() < Date.now()) {
    return res.status(400).json({ error: "Event date cannot be in the past." });
  }
  let end;
  if (endTime) {
    end = new Date(endTime);
    if (Number.isNaN(end.getTime()) || end.getTime() < start.getTime()) {
      return res.status(400).json({ error: "endTime must be a valid date/time on or after startTime." });
    }
  }

  const event = await Event.create({
    groupId: req.groupId,
    title: title.trim(),
    location: location.trim(),
    startTime: start,
    endTime: end,
    description: description || "",
    createdBy: req.userId,
  });

  res.status(201).json({ event });
});

module.exports = { createEvent };
