const router = require('express').Router();
const constants = require('../constants/constants')
const controller = require('../controllers/hubtelPaymentControllers');


router.post(constants.payments + constants.hubtel, controller.receivingMoney);

module.exports = router;

