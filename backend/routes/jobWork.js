const express = require("express");
const router = express.Router();
const JobWorkType = require("../models/JobWorkType");
const { protect } = require("../middleware/authMiddleware");
const JobWorkEntry = require("../models/JobWorkEntry");

// Get all job types
router.get("/types", protect, async (req, res) => {
  try {
    const types = await JobWorkType.find().sort({ processName: 1 });
    res.json(types);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Add new job type (Admin only)
router.post("/types", protect, async (req, res) => {
  try {
    const { processName, rate, unit, description } = req.body;
    const newType = new JobWorkType({ processName, rate, unit, description });
    await newType.save();
    res.status(201).json(newType);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update rate
router.put("/types/:id", protect, async (req, res) => {
  try {
    const updated = await JobWorkType.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Update failed" });
  }
});

// Get all entries
router.get("/entries", protect, async (req, res) => {
  try {
    const entries = await JobWorkEntry.find()
      .populate("jobWorkType")
      .sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Create new entry
router.post("/entries", protect, async (req, res) => {
  try {
    const { traderName, jobWorkTypeId, quantity } = req.body;

    // Fetch the rate from the JobWorkType model
    const workType = await JobWorkType.findById(jobWorkTypeId);
    if (!workType)
      return res.status(404).json({ message: "Job type not found" });

    const totalAmount = quantity * workType.rate;

    const newEntry = new JobWorkEntry({
      traderName,
      jobWorkType: jobWorkTypeId,
      quantity,
      rateAtTime: workType.rate,
      totalAmount,
    });

    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update entry status (Only Users/Operators can change status, Admin cannot)
router.patch("/entries/:id/status", protect, async (req, res) => {
  try {
    // Check if the requester is an admin
    if (req.user.role === "admin") {
      return res
        .status(403)
        .json({ message: "Admin is not allowed to change the status." });
    }

    const { status } = req.body;

    // Only allow valid status transitions if necessary
    const updatedEntry = await JobWorkEntry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.json(updatedEntry);
  } catch (err) {
    res.status(400).json({ message: "Status update failed" });
  }
});

router.get("/entries/pending", protect, async (req, res) => {
  try {
    const { traderName, startDate, endDate } = req.query;

    let query = { status: { $ne: "Completed" } };

    if (traderName) {
      query.traderName = { $regex: traderName, $options: "i" };
    }

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const entries = await JobWorkEntry.find(query)
      .populate("jobWorkType")
      .sort({ date: -1 });

    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;