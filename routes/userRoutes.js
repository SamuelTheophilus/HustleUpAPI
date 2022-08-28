const router = require('express').Router();
const constants = require('../constants/constants')
const controller = require('../controllers/userController');
const { requireAuth } = require('../middleware/authMiddleware');




router.delete(constants.users + constants.ID, controller.deleteUser);
router.put(constants.users, controller.updateUser);
router.get(constants.users + constants.ID, controller.getSingleUser);




// Employee Controllers
router.get(constants.employee + constants.ID, controller.getSingleEmployee);
router.put(constants.employee, controller.updateEmployee);
router.post(constants.employee + constants.review + constants.ID, controller.employeeReview);
router.post(constants.employee + constants.subcategories + constants.ID, controller.employeeAddSubcategories);

//new routes for new controllers in usercontrollers
router.post(constants.employee + constants.bio + constants.ID, controller.employeeUpdateBio);
router.post(constants.employee + constants.skills + constants.ID, controller.employeeUpdateSkills);
router.post(constants.employee + constants.rating + constants.ID, controller.userAddRating);


module.exports = router;