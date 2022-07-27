const router = require('express').Router();
const {routeStrings} = require('../constants/constants')

router.get('/' + routeStrings.Profile, (req, res) => {
  res.send('This is the profile page')
})


module.exports =  router;
