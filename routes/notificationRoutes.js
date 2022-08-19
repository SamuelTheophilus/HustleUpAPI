const router = require('express').Router();
const constants = require('../constants/constants')
const controller = require('../controllers/notificationsControllers');
const { requireAuth } = require('../middleware/authMiddleware');


router.get(constants.notification + constants.ID, controller.getAllNotfications);
router.post(constants.notification, controller.postNotfications);
router.delete(constants.notification, controller.deleteNotfications);

module.exports = router;