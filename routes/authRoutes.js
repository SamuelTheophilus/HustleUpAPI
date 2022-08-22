const { Router } = require('express');
const router = Router();
const controllers = require('../controllers/authControllers')
const constants = require('../constants/constants')

// General User Controllers 
router.post(constants.login, controllers.login_post);
router.post(constants.signup, controllers.genUserSignup);
router.get(constants.logout, controllers.logout_get);
router.get(constants.verify + constants.ID, controllers.verify)
router.post(constants.users + constants.resetpassword, controllers.forgotPassword)
router.get(constants.verify + constants.password + constants.ID, controllers.passwordform);
router.post(constants.verify + constants.password, controllers.passwordVerify);


// Employee Controllers
router.post(constants.employee + constants.signup, controllers.employeesignup);




module.exports = router;