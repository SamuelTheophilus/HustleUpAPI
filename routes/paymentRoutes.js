const router = require('express').Router();
const {constants} = require('../constants/constants')


router.get(constants.payments, (req, res)=>{
  res.send('This is the payment section')
})


module.exports =  router;