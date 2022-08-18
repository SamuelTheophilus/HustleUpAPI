const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  categoryId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
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