const { Router } = require('express');
const router = Router();
const authControllers = require('../controllers/authControllers')
const constants  = require('../constants/constants')


router.get(constants.signup, authControllers.signup_get)
router.post(constants.signup, authControllers.signup_post)
router.get(constants.login, authControllers.login_get)
router.post(constants.login, authControllers.login_post)
router.get(constants.logout, authControllers.logout_get)


module.exports = router;