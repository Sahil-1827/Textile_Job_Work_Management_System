const express = require('express');
const router = express.Router();
const JobWorkType = require('../models/JobWorkType');
const { protect } = require('../middleware/authMiddleware');

// Get all job types
router.get('/types', protect, async (req, res) => {
  try {
    const types = await JobWorkType.find().sort({ processName: 1 });
    res.json(types);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Add new job type (Admin only)
router.post('/types', protect, async (req, res) => {
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
router.put('/types/:id', protect, async (req, res) => {
  try {
    const updated = await JobWorkType.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Update failed" });
  }
});

module.exports = router;