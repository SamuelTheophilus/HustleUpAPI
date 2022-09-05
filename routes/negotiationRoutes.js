const { Router } = require('express');
const router = Router();

const controllers = require('../controllers/negotiationController');
const constants = require('../constants/constants');

router.get(constants.employee + constants.accept + constants.ID, controllers.employeeAccepted)
router.get(constants.employee + constants.decline + constants.ID, controllers.employeeDeclined)
router.get(constants.employee + constants.completed + constants.ID, controllers.employeeCompleted)
router.get(constants.users + constants.completed + constants.ID, controllers.userAgreement)
// router.get('/testfalse/:id', controllers.falseSetting);


module.exports = router;


