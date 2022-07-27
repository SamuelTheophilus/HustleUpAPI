const router = require('express').Router();
const {routeStrings} = require('../constants/constants')

router.get('/' + routeStrings.Hompage, (req, res) => {
  res.send('This is the home page')
})



module.exports =  router;