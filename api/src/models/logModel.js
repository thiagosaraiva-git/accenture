const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  ipAddress: String,
  date: Date,
  time: String,
  serverName: String,
  version: String,
  requestId: String,
  message: String,
});

const Log = mongoose.model("Log", logSchema);

module.exports = Log;
