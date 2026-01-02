const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.get('/stats', protect, async (req, res) => {
  try {
    const stats = {
      totalTraders: 0,
      totalInvoices: 0,
      pendingPayments: 0,
      todayEntries: 0
    };
    
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;