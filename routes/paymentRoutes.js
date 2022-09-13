const router = require('express').Router();
const constants = require('../constants/constants')
const controller = require('../controllers/paymentControllers')


// Sending the money
router.post(constants.payments, controller.userPayment)

//Getting the Money
router.post(constants.payments + constants.employee, controller.employeePaymentController)

// Hubtel callback Routes
router.get(constants.payments + constants.success, controller.successNotice)
router.get(constants.payments + constants.failure, controller.failureNotice)


module.exports = router;