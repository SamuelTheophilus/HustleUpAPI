const router = require('express').Router();
const constants  = require('../constants/constants')
const controller = require('../controllers/userController');
const { requireAuth } = require('../middleware/authMiddleware');




router.delete(constants.users + constants.ID, controller.deleteUser);
router.put(constants.users,  controller.updateUser);
router.get(constants.users + constants.ID,controller.getSingleUser);


module.exports = router;