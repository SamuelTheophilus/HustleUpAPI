const router = require('express').Router();
const {routeStrings} = require('../constants/constants')

router.get('/' + routeStrings.Notification, (req, res) => {
  res.send('This is the notification page')
});


module.exports =  router;