const { Router } = require('express');
const router = Router();
const controllers = require('../controllers/authControllers')
const constants  = require('../constants/constants')


router.get(constants.signup, controllers.signup_get)
router.post(constants.signup, controllers.signup_post)
router.get(constants.login, controllers.login_get)
router.post(constants.login, controllers.login_post)
router.get(constants.logout, controllers.logout_get)


module.exports = router;