const router = require('express').Router();
const constants = require('../constants/constants')
const controller = require('../controllers/hubtelPaymentControllers');


router.post(constants.payments + constants.hubtel, controller.receivingMoney);
router.post(constants.payments + constants.employee + constants.hubtel, controller.sendingMoney)

module.exports = router;

