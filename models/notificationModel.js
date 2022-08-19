const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true
  },
  matchedEmployees: {
    type: Array,
    required: false
  }
});


const Notification = mongoose.model('notifications', notificationSchema);
module.exports = Notification;