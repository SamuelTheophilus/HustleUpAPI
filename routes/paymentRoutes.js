const router = require('express').Router();
const constants = require('../constants/constants')
const controller = require('../controllers/paymentControllers')


// Sending the money
router.post(constants.payments, controller.userPayment)

// //Getting the Money
// router.get(constants.payments, ()=>{

// })

// //Route after a successful transaction
// router.get(constants.success, ()=>{

// })

module.exports = router;