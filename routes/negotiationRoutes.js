const { Router } = require('express');
const router = Router();

const controllers = require('../controllers/negotiationController');
const constants = require('../constants/constants');

router.put(constants.employee + constants.accept + constants.ID, controllers.employeeAccepted)
router.put(constants.employee + constants.decline + constants.ID, controllers.employeeDeclined)
router.put(constants.employee + constants.completed + constants.ID, controllers.employeeCompleted)
router.put(constants.users + constants.completed + constants.ID, controllers.userAgreement)
// router.get('/testfalse/:id', controllers.falseSetting);


module.exports = router;


