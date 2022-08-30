const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  userId:{
    type: String,
    required: true
  },
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
    type: String,
    required: true,
  }
});

const Request = mongoose.model('requests', requestSchema);
module.exports = Request;