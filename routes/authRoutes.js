const { Router } = require('express');
const router = Router();
const authControllers = require('../controllers/authControllers')
const { routeStrings } = require('../constants/constants')


router.get('/' + routeStrings.SignUp, authControllers.signup_get)
router.post('/' + routeStrings.SignUp, authControllers.signup_post)
router.get('/' + routeStrings.LogIn, authControllers.login_get)
router.post('/' + routeStrings.LogIn, authControllers.login_post)
router.get('/' + routeStrings.LogOut , authControllers.logout_get)


module.exports = router;