const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  employerId: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true
  }
});


const Notification = mongoose.model('notifications', notificationSchema);
module.exports = Notification;