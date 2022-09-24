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
    type: Boolean,
    required: true
  },
  senderPhoneNumber: {
    type: Number,
    required: false
  },
  employeePhoneNumber: {
    type: Number,
    required: false
  },
  paystackRef: {
    type: String,
    required: false
  },
  paystackUrl: {
    type: String,
    required: false
  },
  paid: {
    type: Boolean,
    required: false
  }
});

const Orders = mongoose.model('orders', ordersModelSchema);
module.exports = Orders;