const router = require('express').Router();
const {routeStrings} = require('../constants/constants')


router.get('/' + routeStrings.Payments, (req, res)=>{
  res.send('This is the payment section')
})


module.exports =  router;