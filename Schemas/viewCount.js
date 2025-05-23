const mongoose = require("mongoose");

const viewCount = new mongoose.Schema({
  id: { type: Number, required: true },
  ip: { type: String },
  description: { type: String },
  viewCount: { type: Number },
  totalCount: { type: Number },
  timestamp: { type: String },
  latestTimestamp: { type: String },
});

const view = mongoose.model("view", viewCount);
module.exports = view;
