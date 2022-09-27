const router = require('express').Router();
const constants = require('../constants/constants')
const controller = require('../controllers/paymentControllers')


// Sending the money
router.post(constants.payments, controller.userPayment)

//Getting the Money
router.post(constants.payments + constants.employee, controller.employeePaymentController)

//actually for updating stuff
router.post('/update', controller.getPaylink);

// Hubtel callback Routes
/** User Payment Callbacks*/
router.post(constants.payments + constants.success + '/:reference', controller.success)
router.get(constants.payments + constants.failure, controller.failureNotice)


//Employee Payment Callbacks
router.post('/payments/employee/success', async (req, res) => {
  console.log('Successful Transaction')
  res.send('Payment Done');
})

router.post('/payments/employee/Failure', async (req, res) => {
  console.log('Failed Transaction')
  res.send('Payment Not Completed');
})


module.exports = router;