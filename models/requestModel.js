const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  }
});

const Request = mongoose.model('requests', requestSchema);
module.exports = Request;