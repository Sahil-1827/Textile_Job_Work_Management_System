const mongoose = require("mongoose");

const jobWorkEntrySchema = new mongoose.Schema({
  traderName: {
    type: String,
    required: true,
    trim: true,
  },
  jobWorkType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobWorkType",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0.01,
  },
  rateAtTime: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Processing", "Completed"],
    default: "Pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("JobWorkEntry", jobWorkEntrySchema);
