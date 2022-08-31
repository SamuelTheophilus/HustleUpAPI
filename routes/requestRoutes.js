const { Router } = require('express');
const controller = require('../controllers/requestControllers');
const constants = require('../constants/constants');
const { requireAuth } = require('../middleware/authMiddleware');

router = Router();

router.get(constants.request + constants.ID , controller.userOrders);
router.post(constants.request, controller.postRequestEmployee);
router.put(constants.request + constants.ID, controller.updateRequest);
router.delete(constants.request + constants.ID, controller.deleteRequest);


module.exports = router;