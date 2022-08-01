const router = require('express').Router();
const {routeStrings} = require('../constants/constants');
const {requireAuth} = require('../middleware/authMiddleware');


router.get('/' + routeStrings.Hompage, requireAuth , (req, res) => {
  res.send('This is the home page')
})



module.exports =  router;