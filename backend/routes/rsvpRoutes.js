const express = require("express");
const requireMembership = require("../middleware/requireMembership");
const { submitRsvp } = require("../controllers/rsvpController");

const router = express.Router({ mergeParams: true });

router.use(requireMembership);
router.post("/", submitRsvp);

module.exports = router;
