const mongoose = require('mongoose');

const ordersModelSchema = new mongoose.Schema({
  price: {
    type: String,
    required: false,
  },
  employeeName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  employeeSkill: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  senderName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  userStatus:{
    type: String,
    required: false
  }
});

const Orders = mongoose.model('orders', ordersModelSchema);
module.exports = Orders;