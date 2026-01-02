const mongoose = require("mongoose");

const jobWorkTypeSchema = new mongoose.Schema({
  processName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  rate: {
    type: Number,
    required: true,
    min: 0,
  },
  unit: {
    type: String,
    enum: ["meter", "piece"],
    default: "meter",
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("JobWorkType", jobWorkTypeSchema);
