const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  amount:{
    type: Number,
    required: true
  }

})

const Payments = mongoose.model('payments', paymentSchema);
module.exports = Payments;